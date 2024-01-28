import React, { useState } from "react";
import styled from "styled-components";
import LikeIcon from "./LikeIcon";
import Marquee from "./Marquee";
import Modal from 'react-modal';
import { HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GridBox = ({ item }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
    var author = '';

    if (item.author.indexOf('(') !== -1) {
        author = item.author.substr(0, item.author.indexOf('('));
    } else {
        author = item.author;
    }

    const navigateLogin = () => {
        navigate('/auth/login');
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    return (
        <div>
            <Imgdiv onClick={openModal}>
                <BookImg style={{ backgroundImage: `url(${item.cover})` }} />
            </Imgdiv>
            <BookInfo>
                <BookText onClick={openModal}>
                    <Marquee title={item.title} />
                    <BookAuthor>{author}</BookAuthor>
                    <BookPub>{item.publisher}</BookPub>
                </BookText>
                <LikeIcon onModalOpen={openModal} />
            </BookInfo>
            <LoginModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
            >
                <Content>
                    <Text>
                        로그인하시면<br/>북극성의 더 많은 기능들을<br/>이용하실 수 있습니다.<br/><br/>로그인 하시겠습니까?
                    </Text>
                    <BtnContainer>
                        <Btn onClick={navigateLogin}>로그인 하러 가기</Btn>
                        <CloseBtn size="54" onClick={() => setModalIsOpen(false)}></CloseBtn>
                    </BtnContainer>
                </Content>
            </LoginModal>
        </div>
    );
};

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
    width: 175px;
    line-height: 1.5;
    font-size: 20px;
    color: #4659A9;
    font-family: "KOTRA_GOTHIC";
`;

const BookPub = styled.div`
    width: 175px;
    line-height: 1.5;
    font-size: 20px;
    color: #4659A9;
    font-family: "KOTRA_GOTHIC";
`;

const Content = styled.div`
    width: 825px;
    height: 479px;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    padding-top: 70px;
`;

const LoginModal = styled(Modal)`
`;

const Text = styled.p`
    font-size: 36px;
    font-family: "KOTRA_BOLD";
    color: #4659A9;
    text-align: center;
    position: relative;
`;

const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 35px;
`;

const Btn = styled.button`
    width: 327px;
    height: 59px;
    background-color: #4659A9;
    border: none;
    border-radius: 50px;
    color: white;
    justify-content: center;
    align-items: center;
    font-size: 27px;
    font-family: "KOTRA_GOTHIC";
`;

const CloseBtn = styled(HiMiniXMark)`
    fill: #D9D9D9;
    position: absolute;
    top: 20px;
    right: 20px;
`;

export default GridBox;
