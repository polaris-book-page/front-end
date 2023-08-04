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
            <FloatingLabel controlId="floatingId" label="아이디" className="mb-3">
                <Form.Control type="text" placeholder='아이디'/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="비밀번호" className="mb-3" >
                <Form.Control type="password" placeholder='비밀번호'/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingCheckPassword" label="비밀번호 확인" className="mb-3" >
                <Form.Control type="password" placeholder='비밀번호 확인'/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingNickname" label="닉네임" className="mb-3" >
                <Form.Control type="text" placeholder='닉네임'/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingEmail"  label="이메일" className="mb-3" >
                <Form.Control type="email" placeholder='abc@gmail.com'/>
            </FloatingLabel>
            <BtnContainer>
            <CheckboxWrapper>
            <FormInput type="checkbox" checked={agreePrivacyPolicy} onChange={handleCheckboxChange} style={{ display: 'none' }} />
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
    width: 100%;
    height: 100%;
    background-size: cover;
    background-color: #4659a9;
    padding: 20%;
`;

const RegisterContainer = styled.div`
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    padding: 60px 80px;
    justify-content: center;
    margin: 0 auto;
    @media (min-width: 978px) {
        width: 586px;
    }
`

const TitleText = styled.h1`
    color: white;
    font-family: "KOTRA_BOLD";
    text-align: center;
    margin-bottom: 40px; 
    font-size: 40px;
`;

const FormInput = styled.input`
  /* 폼 입력에 대한 스타일을 여기에 추가하세요 */
`;

const CheckboxWrapper = styled.label`
    display: flex;
    align-items: center;
    width: 240px; 
    margin: 0 auto;
    cursor: pointer;
`;

const CustomCheckbox = styled.span`
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: 2px solid #ffffff;
    border-radius: 0px;
    
    &:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 6px;
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

const BtnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const NextBtn = styled.button`
    width: 75%;
    height: 60px;
    background-color: #4659A9;
    border: none;
    border-radius: 50px;
    margin: auto;
    margin-top: 40px;
    color: white;
    font-size: 20px;
    font-family: "KOTRA_GOTHIC";
`;

export default RegisterPage;
