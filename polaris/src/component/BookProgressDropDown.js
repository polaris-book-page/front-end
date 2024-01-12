import styled, { css } from "styled-components";
import { useRef, useState } from "react";
import useDetectClose from "./hook/useDetectClose";
import UnitDropDown from "./UnitDropDown";
import Modal from 'react-modal';
import CustomDatePicker from "./CustomDatePicker";


const BookProgressDropDown = () => {
    const dropDownRef = useRef(null);
    const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
    const [isModal, setIsModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

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
                    <ModalContentBox>
                        <ProgressInput placeholder="페이지를 입력하세요." />
                        <UnitDropDown />
                    </ModalContentBox>
                    <div style={{height: 20}} />
                    <ModalSubTitleBox>
                        <ModalTitleText color={'#4659A9'}>독서 시작일</ModalTitleText>
                        <Line />
                    </ModalSubTitleBox>
                    <ModalContentBox>
                        <CustomDatePicker page="info" setDate={'2023-01-13'}/>
                    </ModalContentBox>
                    <div style={{height: 25}} />
                    <ModalButton onClick={() => setIsModal(false)}>확인</ModalButton>
                </ModalContentContainer>
            </Modal>
        </>
    );
};

const customStyle = {
    overlay: {
        backgroundColor: '#00000040',
    },
    content: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        width: '75%',
        height: 370,
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

// modal-container
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
    align-items: center;
    padding: 15px;
`

// modal-box
const ModalSubTitleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
`

const ModalContentBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

// modal-content
const Line = styled.div`
    width: 200px;
    height: 2px;
    background-color: #4659A9;
    margin-bottom: 15px;
`

const ModalButton = styled.button`
    width: 45%;
    font-family: "KOTRA_BOLD";
    color: white;
    background-color: #4659A9;
    border-style: none;
    font-size: 16px;
    padding: 7px 50px;
    margin: 10px;
    border-radius: 50px;
`;

const ProgressInput = styled.input`
    width: 120px;
    color: #404040;
    font-family: "KOTRA_BOLD";
    border-style: none;
    font-size: 12px;

	&::placeholder{
		color: #B7B5B5;
	}
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