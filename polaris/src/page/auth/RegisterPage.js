import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import React, { useState } from 'react';
import NavBar from "../../component/NavBar";
import FooterBar from "../../component/FooterBar";


const RegisterPage = () =>{
    const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState(false);

    const handleCheckboxChange = () => {
        setAgreePrivacyPolicy(!agreePrivacyPolicy);
    };
    return (
        <>
            <NavBar/>
            <Background>
                <RegisterContainer >
                    <TitleText>REGISTER</TitleText>
                <FloatingLabel controlId="floatingId" label="아이디" className="mb-4">
                    <Form.Control type="text" placeholder='아이디'/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="비밀번호" className="mb-4" >
                    <Form.Control type="password" placeholder='비밀번호'/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingCheckPassword" label="비밀번호 확인" className="mb-4" >
                    <Form.Control type="password" placeholder='비밀번호 확인'/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingNickname" label="닉네임" className="mb-4" >
                    <Form.Control type="text" placeholder='닉네임'/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingEmail"  label="이메일" className="mb-4" >
                    <Form.Control type="email" placeholder='abc@gmail.com'/>
                </FloatingLabel>
                <BtnContainer>
                    <CheckboxWrapper>
                        <input type="checkbox" checked={agreePrivacyPolicy} onChange={handleCheckboxChange} style={{ display: 'none' }} />
                        <CustomCheckbox checked={agreePrivacyPolicy} />
                        <CheckboxLabel>개인정보처리방침에 동의합니다.</CheckboxLabel>
                    </CheckboxWrapper>
                    <NextBtn> 다음 </NextBtn>
                </BtnContainer>
                </RegisterContainer>
            </Background>
            <FooterBar />
        </>
    )
}

const Background = styled.div`
    position: relative;
    background-size: cover;
    background-color: #4659a9;
    padding: 10% 20%;
`;

const RegisterContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    padding: 70px 85px;
    margin: 0 auto;
    @media (min-width: 978px) {
        width: 586px;
    }
`;

const TitleText = styled.h1`
    color: white;
    text-align: center;
    margin-bottom: 50px; 
    font-size: 40px;
    font-family: "KOTRA_BOLD";
`;

const BtnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CheckboxWrapper = styled.label`
    display: flex;
    align-items: center;
    width: 240px; 
    cursor: pointer;
`;

const CustomCheckbox = styled.span`
    position: relative;
    width: 20px;
    height: 20px;
    border: 2px solid #ffffff;
    &:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 5px;
    width: 6px;
    height: 10px;
    border: solid #ffffff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    }
`;

const CheckboxLabel = styled.span`
    margin-left: 8px;
    margin-bottom: 1px;
    color: white;
    font-size: 16px;
`;


const NextBtn = styled.button`
    width: 75%;
    height: 60px;
    background-color: #4659A9;
    border: none;
    border-radius: 50px;
    margin-top: 40px;
    color: white;
    font-size: 20px;
    font-family: "KOTRA_GOTHIC";
`;

export default RegisterPage;
