import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
	display: flex;
	padding: 0 50px;
`;

const HomePage = ({ children }) => <PageWrapper>{children}</PageWrapper>;

export default HomePage;
