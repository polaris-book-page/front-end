import React from "react";
import styled from "styled-components";
import LikeIcon from "./LikeIcon"; 

const GridBox = ({ item }) => {
	return (
		<div>
			<Imgdiv>
				<BookImg style={{ backgroundImage: `url(${item.cover})` }}/>
			</Imgdiv>
			<BookInfo>
				<BookText>
					<BookTitle>{item.title}</BookTitle>
					<BookAuthor>{item.author.substr(0, item.author.indexOf('('))}</BookAuthor>
					<BookPub>{item.publisher}</BookPub>
				</BookText>
				<LikeIcon/>
			</BookInfo>
		</div>
	)
}

const Imgdiv = styled.div`
    width: 228px;
    height: 299px;
    margin: 25px;
    margin-bottom: 3px;
`;

const BookImg = styled.img`
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size : cover;
`;

const BookInfo = styled.div`
    display: flex;
    margin-right: 26px;
`;

const BookText = styled.div`
    flex-grow: 1;
`;

const BookTitle = styled.div`
    margin-left: 25px;
    line-height: 1.5;
    font-size: 24px;
    color: #4659A9;
    font-weight: 700;
    font-family: "KOTRA_GOTHIC";
`;

const BookAuthor = styled.div`
    margin-left: 25px;
    line-height: 1.5;
    font-size: 20px;
    color: #4659A9;
    font-family: "KOTRA_GOTHIC";
`;

const BookPub = styled.div`
    margin-left: 25px;
    line-height: 1.5;
    font-size: 20px;
    color: #4659A9;
    font-family: "KOTRA_GOTHIC";
`;

export default GridBox;
