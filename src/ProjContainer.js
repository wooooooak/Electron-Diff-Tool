import React from 'react';
import App from './App';
import Dropzone from 'react-dropzone';
const { ipcRenderer } = window.require('electron');

class ProjContainer extends React.Component {
	state = {
		path1: null,
		path2: null,
		nextStep: false,
		folderId: null,
		loading: false
	};

	componentDidMount = () => {
		this.setState({ folderId: 'hseisie' });
		ipcRenderer.on('compare_response', (event, arg) => {
			console.log(arg); // "pong" 출력
			this.setState({ loading: false, nextStep: true });
		});
	};

	onDrop1 = (files) => {
		console.log(files[0].path);
		this.setState({ path1: files[0].path });
	};

	onDrop2 = (files) => {
		console.log(files[0].path);
		this.setState({ path2: files[0].path });
	};

	compare = () => {
		const { path1, path2, folderId } = this.state;
		if (path1 && path2) {
			console.log('main에서 java 프로그램 실행하자');
			this.setState({
				loading: true
			});
			ipcRenderer.send('compare', [ path1, path2, folderId ]);
		}
	};

	render() {
		const { nextStep, loading, folderId } = this.state;
		if (nextStep) {
			return <App folderId={folderId} />;
		} else {
			return loading ? (
				<div>로딩중입니다.......!!!</div>
			) : (
				<div>
					<Dropzone onDrop={this.onDrop1}>
						{({ getRootProps, getInputProps }) => (
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<p style={{ color: 'white' }}>
									Drop files here, or click to select files
								</p>
							</div>
						)}
					</Dropzone>
					<div>
						<Dropzone onDrop={this.onDrop2}>
							{({ getRootProps, getInputProps }) => (
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									<p>
										Drop files here, or click to select
										files
									</p>
								</div>
							)}
						</Dropzone>
					</div>
					<button onClick={this.compare}>비교 시작!</button>
				</div>
			);
		}
	}
}

export default ProjContainer;
