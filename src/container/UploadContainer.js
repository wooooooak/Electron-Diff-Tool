import React from 'react';
import DiffContianer from './DiffContianer';
import uniqid from 'uniqid';
import styled from 'styled-components';
import UploadPage from '../page/UploadPage';
import DropZone from '../component/DropZone';
import Logo from '../component/Logo';
import { ClimbingBoxLoader } from 'react-spinners';
const { ipcRenderer } = window.require('electron');

const Title = styled.p`
	@import url('https://fonts.googleapis.com/css?family=Lobster');
	width: 80%;
	/* font-size: 3em; */
	color: #3fe4db;
	font-family: 'Lobster', cursive;
	margin: -3em auto 2em;
	text-align: center;
`;

const DropLine = styled.div`
	display: flex;
	padding: 0 3em;
	width: 90%;
	justify-content: space-around;
`;

const Button = styled.button`
	@import url('https://fonts.googleapis.com/css?family=Varela+Round');
	font-family: 'Varela Round', sans-serif;
	margin-top: 3em;
	background: #6842f0;
	font-size: 1em;
	outline: none;
	box-shadow: 2px 2px 10px #6842f0;
	color: white;
	height: 3em;
	width: 6em;
	border: none;
	cursor: pointer;
`;

class UploadContainer extends React.Component {
	state = {
		path1: null,
		path2: null,
		name1: '',
		name2: '',
		nextStep: false,
		folderId: '',
		loading: false
	};

	componentDidMount = () => {
		this.setState({ folderId: uniqid() });
		ipcRenderer.on('compare_response', (event, arg) => {
			this.setState({ loading: false, nextStep: true });
		});
	};

	onDrop1 = (files) => {
		this.setState({ path1: files[0].path, name1: files[0].name });
	};

	onDrop2 = (files) => {
		this.setState({ path2: files[0].path, name2: files[0].name });
	};

	compare = () => {
		const { path1, path2, folderId } = this.state;
		if (path1 && path2) {
			this.setState({
				loading: true
			});
			ipcRenderer.send('compare', [ path1, path2, folderId ]);
		}
	};

	render() {
		const {
			nextStep,
			loading,
			folderId,
			path1,
			path2,
			name1,
			name2
		} = this.state;
		if (nextStep) {
			return <DiffContianer folderId={folderId} />;
		} else {
			return (
				<UploadPage>
					{loading ? (
						<ClimbingBoxLoader
							color="#3fe4db"
							size={40}
							sizeUnit={'px'}
						/>
					) : (
						<React.Fragment>
							<Title>
								<Logo size="3em" />
							</Title>
							<DropLine>
								<DropZone
									onDrop={this.onDrop1}
									path={path1}
									name={name2}
								/>
								<DropZone
									onDrop={this.onDrop2}
									path={path2}
									name={name2}
								/>
							</DropLine>
							<Button onClick={this.compare}>START!</Button>
						</React.Fragment>
					)}
				</UploadPage>
			);
		}
	}
}

export default UploadContainer;
