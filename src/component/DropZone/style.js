import styled, { keyframes, css } from 'styled-components';
import { Folder } from 'styled-icons/boxicons-solid/Folder';
import { FolderOpen } from 'styled-icons/fa-solid/FolderOpen';

const acceptAnimation = keyframes`
	0% {
		background: transparent;
	}

	100% {
		background: white;
	}

`;

export const DropzoneTemplate = css`
	width: 250px;
	height: 250px;
	border-width: 2px;
	border-radius: 10px;
	/* box-shadow: 3px 3px 15px #272625; */
	padding: 10px;
	color: ${(props) =>
		props.isDragReject || props.isDragActive ? '#eee' : '#3fe4db'};
	border: 5px dotted #3fe4db;
`;

export const DropContainer = styled.div`
	width: 350px;
	height: 350px;
	border-width: 2px;
	border-radius: 10px;
	color: ${(props) =>
		props.isDragReject || props.isDragActive ? '#eee' : '#3fe4db'};
	box-shadow: 3px 3px 15px #272625;
	${(props) => (props.isDragAccept ? css`${acceptAnimation};` : null)};
`;

export const EmptyFolder = styled(FolderOpen)`
	${DropzoneTemplate}
    position: relative;
    /* z-index: -1; */
`;

export const FillFolder = styled(Folder)`
	${DropzoneTemplate}
    position: relative;
    /* z-index: -1; */
`;
