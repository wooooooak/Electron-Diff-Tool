import styled from 'styled-components';

export const Span = styled.span`
	font-family: 'Lobster', cursive;
	color: ${(props) => props.color};
	font-size: ${(props) => (props.size ? props.size : '3em')};
`;
