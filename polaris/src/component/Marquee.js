import React from 'react';
import styled, { keyframes } from 'styled-components';

const textLoop = keyframes`
	0% {
		transform: translate3d(40%, 0, 0);
	}
	100% {
		transform: translate3d(-130%, 0, 0);
	}
`;

const FlowContainer = styled.div`
	width: 175px;
	margin-left: 25px;
	overflow: hidden;
`;

const FlowWrap = styled.div`
width: 175px;
	animation: ${textLoop} 6.5s linear infinite;
	line-height: 1.5;
	font-size: 24px;
	color: #4659A9;
	font-weight: 700;
	font-family: "KOTRA_GOTHIC";
	&:hover {
		animation-play-state: paused;
		cursor: pointer;
	}
`;

const FlowText = styled.div`
	display: flex;
	flex: 0 0 auto;
	white-space: nowrap;
	/* overflow: hidden; */
`;

const Marquee = ({title}) => {
	return (
		<FlowContainer>
			<FlowText>
				<FlowWrap>{ title }</FlowWrap>
			</FlowText>
		</FlowContainer>
	);
};

export default Marquee;
