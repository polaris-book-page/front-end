import React, { useState } from "react";
import styled from "styled-components";
import LikeIcon from "./LikeIcon";
import Marquee from "./Marquee";
import Modal from 'react-modal';
import { HiMiniXMark } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from '@tanstack/react-query'

const GridBox = ({ item }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const initialData = queryClient.getQueryData(['check']);
    const { state } = useLocation();
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
        const somebodyIn = queryClient.getQueryData(['check']);
        console.log("is anyone in? after logout: ", somebodyIn);
        if (!somebodyIn.is_logined) {
            setModalIsOpen(true);
        } else {
            console.log("in gird: ", item.isbn13)
            // refetch
            queryClient.invalidateQueries(["book-review-list"])
            navigate('/book/info', {state : item.isbn13 });
            console.log(state)
            // navigate('/book/info'); 
        }
    };

    return (
        <div style={{ marginBottom: '15px'}}>
            <Imgdiv onClick={openModal}>
                <BookImg style={{ backgroundImage: `url(${item.cover})` }} />
            </Imgdiv>
            <BookInfo>
                <BookText onClick={openModal}>
                    <Marquee title={item.title} />
                    <BookAuthor>{author}</BookAuthor>
                    <BookPub>{item.publisher}</BookPub>
                </BookText>
                <LikeIcon item={item} onModalOpen={openModal} />
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
    width: 200px;
    height: 250px;
    margin-bottom: 3px;
    @media screen and (min-width: 991px) {
        width: 200px;
        height: 290px;
    }
    @media screen and (max-width: 990px) {
        width: 200px;
        height: 290px;
    }
    @media screen and (max-width: 515px) {
        width: 150px;
        height: 210px;
    }
    @media screen and (max-width: 380px) {
        width: 120px;
        height: 170px;
    }
`;

const BookImg = styled.img`
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size : cover;
`;

const BookInfo = styled.div`
    margin-right: 26px;
    @media screen and (min-width: 516px) {
        display: flex;
    }
`;

const BookText = styled.div`
    flex-grow: 1;
    height: 70px;
`;

const BookAuthor = styled.div`
    width: 138px;
    line-height: 1.5;
    font-size: 15px;
    color: #4659A9;
    font-family: "KOTRA_GOTHIC";
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

const BookPub = styled.div`
    width: 138px;
    line-height: 1.5;
    font-size: 15px;
    color: #4659A9;
    font-family: "KOTRA_GOTHIC";
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
