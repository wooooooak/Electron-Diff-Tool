import React from 'react';
import App from './App';
import uniqid from 'uniqid';
import styled from 'styled-components';
import UploadPage from './page/UploadPage';
import DropZone from './component/DropZone';
import { ClimbingBoxLoader } from 'react-spinners';
const { ipcRenderer } = window.require('electron');

const PageBox = styled.div`
	border-radius: 3px;
	background: #02101b;
	box-shadow: 5px 5px 30px #274555;
	height: 80vh;
	width: 80vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Title = styled.p`
	@import url('https://fonts.googleapis.com/css?family=Lobster');
	width: 80%;
	font-size: 3em;
	color: #3fe4db;
	font-family: 'Lobster', cursive;
	margin: -1em auto 1em;
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

const Span = styled.span`color: ${(props) => props.color};`;

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
			return <App folderId={folderId} />;
		} else {
			return (
				<UploadPage>
					{loading ? (
						<PageBox>
							<ClimbingBoxLoader
								color="#3fe4db"
								size={40}
								sizeUnit={'px'}
							/>
						</PageBox>
					) : (
						<PageBox>
							<Title>
								{' '}
								SHOW <Span color="#fec9c9">D</Span>
								<Span color="#ee6e9f">I</Span>
								<Span color="#fffcf0">F</Span>
								<Span color="#6d9d88">F</Span>
								<Span color="#6a60a9">!</Span>
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
						</PageBox>
					)}
				</UploadPage>
			);
		}
	}
}

export default UploadContainer;
