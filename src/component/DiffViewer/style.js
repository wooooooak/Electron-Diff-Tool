import styled, { css } from 'styled-components';

const boxTemplate = css`
	flex: 5.5;
	width: 10px;
	border-radius: 10px;
	align-items: center;
	background: #f4f5f9;
	margin-bottom: 10px;
`;

export const Pre = styled.pre`
	height: 87vh;
	overflow: scroll;
	${boxTemplate} ::-webkit-scrollbar {
		width: 10px;
		background: transparent;
	}
	::-webkit-scrollbar-thumb {
		background: #e53a40;
	}

	::-webkit-scrollbar-corner {
		background: transparent;
	}

	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3);
	}
`;

export const EmptyPre = styled.div`
	font-family: "Nanum Gothic", sans-serif;
	${boxTemplate} display: flex;
	justify-content: center;
	font-size: 3.5em;

	@media (max-width: 1300px) {
		font-size: 2em;
	}
`;

export const LineContainer = styled.div`
	display: flex;
	&:hover {
		span {
			background: #f0e5de !important;
		}
	}
`;

const UndragableSpan = styled.span`
	-ms-user-select: none;
	-moz-user-select: -moz-none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	user-select: none;
`;

export const LineCounter = styled(UndragableSpan)`
  background-color: ${(props) => props.backgroundColor};
  padding-right: 3px;
  color: #566270;
`;

export const Symbol = styled(UndragableSpan)`
  background-color: ${(props) => props.backgroundColor};
  padding: 0 5px;
  color: #566270;
`;

export const StringContent = styled.span`
	background-color: ${(props) => props.backgroundColor};
	width: 100%;
`;
