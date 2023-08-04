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
                <InputContainer>
                    <FlotingLabelContainer className="has-float-label">
                        <FlotingLabelInput type="text" placeholder=""/>
                        <FlotingLabelTitle>아이디</FlotingLabelTitle>
                    </FlotingLabelContainer>
                    <DuplicateCheckBtn>중복확인</DuplicateCheckBtn>
                </InputContainer>
                <InputContainer>
                    <FlotingLabelContainer className="has-float-label">
                        <FlotingLabelInput type="password" placeholder=""/>
                        <FlotingLabelTitle>비밀번호</FlotingLabelTitle>
                    </FlotingLabelContainer>
                </InputContainer>
                <InputContainer>
                    <FlotingLabelContainer className="has-float-label">
                        <FlotingLabelInput type="password" placeholder=""/>
                        <FlotingLabelTitle>비밀번호 확인</FlotingLabelTitle>
                    </FlotingLabelContainer>
                </InputContainer>
                <InputContainer>
                    <FlotingLabelContainer className="has-float-label">
                        <FlotingLabelInput type="text" placeholder=""/>
                        <FlotingLabelTitle>닉네임</FlotingLabelTitle>
                    </FlotingLabelContainer>
                    <DuplicateCheckBtn>중복확인</DuplicateCheckBtn>
                </InputContainer>
                <FlotingLabelContainer className="has-float-label">
                    <FlotingLabelInput type="email" placeholder="polaris-book@gmail.com"/>
                    <FlotingLabelTitle>이메일</FlotingLabelTitle>
                </FlotingLabelContainer>
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
    padding: 60px 80px;
    margin: 0 auto;
    @media (min-width: 978px) {
        width: 586px;
    }
`;

const TitleText = styled.h1`
    color: white;
    text-align: center;
    margin: 30px 0 50px 0;
    font-size: 40px;
    font-family: "KOTRA_BOLD";
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const FlotingLabelContainer = styled.label`
    margin: 10px 0;
    flex-grow: 14;
`;
const FlotingLabelInput = styled.input`
    background-color: transparent;
    width: 100%;
    color: white;
    &::placeholder{
        color: rgba(255, 255, 255, .5);
	}
`;

const FlotingLabelTitle = styled.span`
    color: white;
    font-family: "KOTRA_GOTHIC";
`;

const DuplicateCheckBtn = styled.button`
    background-color: transparent;
    color: white;
    flex-grow: 1;
    padding: 0;
    border-radius: 10px;
    border: 1.5px solid transparent;
    font-size: 15.5px;
    font-family: "KOTRA_GOTHIC";
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
    border: solid #ffffff;
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
