import React, { Component } from 'react';

import AppStyle from './AppStyle';
import DiffViewer from './component/DiffViewer';
import FolderList from './component/FolderList';
import HomePage from './page/HomePage';
import Summary from './component/Summary';
import History from './component/History';

import API from './API';

const { ipcRenderer } = window.require('electron');

class App extends Component {
	state = {
		initTree: {},
		diffContent: [],
		diffLoading: false,
		summary: {},
		mode: 'mod',
		tree: {
			cursor: {}
		},
		history: [],
		folderId: ''
	};

	onHistoryClearButton = () => {
		this.setState({
			history: []
		});
	};

	componentDidMount = async () => {
		console.log(this.props.folderId);
		// const { data } = await API.get(`file/summary`);
		const data = ipcRenderer.sendSync('file/summary', this.props.folderId);
		console.log(data);
		const newTree = ipcRenderer.sendSync('tree/mod', this.props.folderId);
		newTree.toggled = true;
		newTree.active = true;
		this.setState({
			summary: data,
			tree: newTree,
			initTree: newTree,
			folderId: this.props.folderId
		});
	};

	isClickCurrentFile = (cursor) => {
		if (
			this.state.history[0] &&
			cursor.path === this.state.history[0].path
		) {
			if (cursor.mode && this.state.mode !== cursor.mode) {
				return false;
			}
			return true;
		} else {
			return false;
		}
	};

	choiceFileCategory = (cursor) => {
		if (!cursor.mode) {
			return this.state.mode === 'mod' ? 'diff' : 'origin';
		} else {
			return cursor.mode === 'mod' ? 'diff' : 'origin';
		}
	};

	onClickLeafFile = async (cursor) => {
		if (!this.isClickCurrentFile(cursor)) {
			this.setState({
				diffLoading: true
			});
			const fileCategory = this.choiceFileCategory(cursor);
			const data = ipcRenderer.sendSync(
				`file/${fileCategory}`,
				cursor.path
			);
			const tempHistory = this.state.history;
			tempHistory.splice(0, 0, {
				name: cursor.name,
				path: cursor.path,
				mode: this.state.mode
			});
			this.setState({
				diffContent: data.content,
				diffLoading: false,
				tree: {
					...this.state.tree,
					cursor
				},
				history: tempHistory
			});
		}
	};

	onChangeMode = async (mode) => {
		const tree = ipcRenderer.sendSync(`tree/${mode}`, this.props.folderId);
		this.setState({
			mode,
			tree: tree,
			initTree: tree,
			diffContent: []
		});
	};

	onFilter = (filtered) => {
		this.setState({
			tree: filtered
		});
	};

	render() {
		const {
			diffContent,
			summary,
			diffLoading,
			mode,
			tree,
			initTree,
			history
		} = this.state;
		return (
			<div>
				<AppStyle />
				<Summary summary={summary} onChangeMode={this.onChangeMode} />

				<HomePage>
					<FolderList
						onClickFile={this.onClickLeafFile}
						onFilter={this.onFilter}
						mode={mode}
						tree={tree}
						initTree={initTree}
						cursor={tree.cursor}
					/>
					<DiffViewer content={diffContent} loading={diffLoading} />
					<History
						history={history}
						onClickHistoryCard={this.onClickLeafFile}
						clearHistory={this.onHistoryClearButton}
					/>
				</HomePage>
			</div>
		);
	}
}

export default App;
