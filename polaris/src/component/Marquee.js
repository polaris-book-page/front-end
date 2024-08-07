import React from 'react';
import styled, { keyframes } from 'styled-components';

const textLoop = keyframes`
	0% {
		transform: translate3d(0%, 0, 0);
	}
	100% {
		transform: translate3d(-130%, 0, 0);
	}
`;

const FlowContainer = styled.div`
	overflow: hidden;
	margin-right: 10px;
`;

const FlowWrap = styled.div`
	font-size: ${(props) => props.size || '19px'};
	color: ${(props) => props.color || '#4659A9' };
	font-weight: 700;
	font-family: ${(props) => props.font || "KOTRA_GOTHIC"};
	&:hover {
		animation: ${textLoop} 6.5s linear infinite;
	}
	@media screen and (min-width: 516px) {
        width: 152px;
    }
    @media screen and (max-width: 515px) {
        width: 150px;
    }
	@media screen and (max-width: 380px) {
        width: 90px;
    }
`;

const FlowText = styled.div`
	display: flex;
	flex: 0 0 auto;
	white-space: nowrap;
`;

const Marquee = ({title, color, size, font}) => {
	return (
		<FlowContainer>
			<FlowText>
				<FlowWrap color={color} size={size} font={font}>{ title }</FlowWrap>
			</FlowText>
		</FlowContainer>
	);
};

export default Marquee;
