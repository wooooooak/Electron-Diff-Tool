import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
	height: 100vh;
	/* background: url("https://images.unsplash.com/photo-1548191654-94ab77ed2493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1424&q=80"); */
	background: url("https://images.unsplash.com/photo-1485839536468-c221df2984a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80");
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const UploadPage = ({ children }) => {
	return <PageWrapper>{children}</PageWrapper>;
};

export default UploadPage;
