import styled, { css } from "styled-components";
import { useRef, useState } from "react";
import useDetectClose from "./hook/useDetectClose";
import Modal from 'react-modal';


const BookProgressDropDown = () => {
    const dropDownRef = useRef(null);
    const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
    const [isModal, setIsModal] = useState(false);

    return (
        <>
            <Container>
                <Button ref={dropDownRef} onClick={() => setIsOpen(!isOpen)}>
                    탐험 진행도
                </Button>
                <Menu $isdropped={isOpen}>
                    <Li color={'#FACECBd4'} onClick={() => setIsModal(!isModal)}>
                        읽는 중이에요.
                    </Li>
                    <Li color={'#D5CFFBd4'}>
                        다 읽었어요!
                    </Li>
                </Menu>
            </Container>

            {/* modal */}
            <Modal
                style={customStyle}
                isOpen={isModal}
                onRequestClose={() => setIsModal(false)}
                shouldCloseOnOverlayClick={false}>
                <ModalTitleContainer>
                    <ModalTitleText color={'#ffffff'}>책을 얼마나 읽으셨나요?</ModalTitleText>
                </ModalTitleContainer>
                <ModalContentContainer>
                    <ModalSubTitleBox>
                        <ModalTitleText color={'#4659A9'}>진행도</ModalTitleText>
                        <Line />
                    </ModalSubTitleBox>
                    <ModalSubTitleBox>
                        <ModalTitleText color={'#4659A9'}>독서 시작일</ModalTitleText>
                        <Line />
                    </ModalSubTitleBox>
                    <ModalButton onClick={() => setIsModal(false)}>확인</ModalButton>
                </ModalContentContainer>
            </Modal>
        </>
    );
};

const customStyle = {
    overlay: {
        backgroundColor: '#00000040'
    },
    content: {
        top: '30%',
        height: 300,
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderStyle: 'none',
        borderRadius: '30px',
        outline: 'none',
        padding: 0,
        backgroundColor: 'white',
        boxShadow: '0px 2px 7px #00000040'
    }
};

// text
const ModalTitleText = styled.text`
    font-family: 'KOTRA_BOLD';
    color: ${(props) => props.color || 'gray'};
    font-size: 20px;
`;

// modal
const ModalTitleContainer = styled.div`
    height: 60px;
    display: flex;
    background-color: #4659A9;
    justify-content: center;
    align-items: center;
`

const ModalContentContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
`

const ModalSubTitleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
`

const Line = styled.div`
    width: 200px;
    height: 2px;
    background-color: #4659A9;
`

const ModalButton = styled.button`
    font-family: "KOTRA_BOLD";
    color: white;
    background-color: #4659A9;
    border-style: none;
    font-size: 16px;
    padding: 7px 50px;
    margin: 8px;
    border-radius: 50px;
`;

// container
const Container = styled.div`
    display: flex;
    position: relative;
`;

// dropdown
const Button = styled.button`
    font-family: "KOTRA_GOTHIC";
    color: white;
    border-style: none;
    font-size: 14px;
    padding: 3px 20px;
    margin: 8px;
    border-radius: 50px;
    background: linear-gradient(#facecb, #c4cef9);
`;

const Menu = styled.div`
    background: #ffffff22;
    border-radius: 8px;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 150px;
    top: 50px;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    padding: 10px;
    font-family: "KOTRA_GOTHIC";
    font-size: 14px;
    list-style: none;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;

    &:after {
        display: flex;
        position: absolute;
        top: -3px;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    ${({ $isdropped }) => 
    $isdropped &&
    css`
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    `};
`

const Li = styled.li`
    background-color: ${(props) => props.color}
`;


export default BookProgressDropDown;