import React from "react";
import styled from "styled-components";
import LikeIcon from "./LikeIcon"; 
import Marquee from "./Marquee";

const GridBox = ({ item }) => {
    var author = ''
    if (item.author.indexOf('(') !== -1) {
        author = item.author.substr(0, item.author.indexOf('('))
    } else {
        author = item.author
    }
	return (
		<div>
			<Imgdiv>
				<BookImg style={{ backgroundImage: `url(${item.cover})` }}/>
			</Imgdiv>
			<BookInfo>
				<BookText>
                    <Marquee title={item.title}/>
					<BookAuthor>{author}</BookAuthor>
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

const BookAuthor = styled.div`
    line-height: 1.5;
    font-size: 20px;
    color: #4659A9;
    font-family: "KOTRA_GOTHIC";
`;

const BookPub = styled.div`
    line-height: 1.5;
    font-size: 20px;
    color: #4659A9;
    font-family: "KOTRA_GOTHIC";
`;

export default GridBox;
