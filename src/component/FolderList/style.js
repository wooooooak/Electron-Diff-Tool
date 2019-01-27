import styled from 'styled-components';

export const ListContaineer = styled.div`
	border: 1px solid #d9e1e8;
	flex: 2;
	height: 90vh;
	padding-left: 1em;
	margin-right: 20px;
	margin-left: -10px;
	overflow: scroll;
	::-webkit-scrollbar {
		width: 0px; /* 세로 스크롤 삭제 */
		background: transparent; /* optional: just make scrollbar invisible */
	}
	/* optional: show position indicator in red */
	::-webkit-scrollbar-thumb {
		height: 5px;
		background: #ff0000;
	}
	background-color: #21252b;
`;
