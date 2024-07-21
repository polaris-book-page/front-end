import React from 'react';
import styled, { keyframes, css } from 'styled-components';

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
	margin-left: 10px;
	width: 540px;
	@media all and (max-width: 1100px){
        width: 440px;
    }
    @media all and (max-width: 900px){
        width: 200px;
    }
`;

const FlowText = styled.div`
	display: flex;
	flex: 0 0 auto;
	white-space: nowrap;
	align-items: center;
`;

const FlowWrap = styled.div`
	font-size: ${(props) => props.size || '19px'};
	color: ${(props) => props.color || '#4659A9' };
	font-weight: 400;
	font-family: ${(props) => props.font || "KOTRA_GOTHIC"};
	width: 240px;
	
	@media all and (min-width: 900px){
		${(props) =>
			props.title.length < 25 ?
				'' : 
			css`
				&:hover {
					animation: ${textLoop} 6.5s linear infinite;
				}`
		}
    }
	@media all and (max-width: 1100px){
		font-size: 26px;
    }
    @media all and (max-width: 900px){
		font-size: 23px;
		${(props) =>
			props.title.length < 9 ?
			css`
				text-align: center;
				display: flex;
				justify-content: center; ` : 
			css`
				&:hover {
					animation: ${textLoop} 6.5s linear infinite;
				}`
		}
    }
`;

const Marquee = ({title, color, size, font}) => {
	return (
		<FlowContainer>
			<FlowText>
				<FlowWrap color={color} size={size} font={font} title={title}>{title}</FlowWrap>
			</FlowText>
		</FlowContainer>
	);
};

export default Marquee;
