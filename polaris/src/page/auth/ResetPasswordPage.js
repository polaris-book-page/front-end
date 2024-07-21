import styled from "styled-components";
import FooterBar from "../../component/FooterBar";
import axios from "axios";
import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () =>{
    const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMsg, setPasswordMsg] = useState(' ')
	const [confirmPasswordMsg, setConfirmPasswordMsg] = useState(' ')
    const [isPassword, setIsPassword] = useState(false);
	const [isConfirmPassword, setIsConfirmPassword] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate();
    const token = searchParams.get("token") 

    const { mutate } = useMutation({
        mutationFn: async (userInfo) => {
            const { data } = await axios.post(`/api/user/reset-password`, userInfo, { withCredentials: true })
            console.log("data", data)
            return data;
        }, 
        onSuccess: (data) => {
            console.log("reset password success")
            navigate('/auth/login')
        },
        onError: () => {
            console.log("reset password failure")
        }
    });

    const passwordReg = new RegExp('(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-])')
    const onChangePassword = (e) => {
        const currentPwd = e.target.value;
        setPassword(currentPwd);
        if (currentPwd.length < 6 || currentPwd.length > 16) {
            setPasswordMsg('비밀번호는 6글자 이상, 16글자이하로 가능합니다.')
            setIsPassword(false)
        } else if (!passwordReg.test(currentPwd)) {
            setPasswordMsg('비밀번호는 영어, 숫자, 특수문자 조합으로 구성되어야합니다.')
            setIsPassword(false)
        } else {
            setPasswordMsg('사용가능한 비밀번호입니다.')
            setIsPassword(true)
        }
    }
    const onChangeConfirmPassword = (e) => {
        const currentConfirmPwd = e.target.value;
        setConfirmPassword(currentConfirmPwd);
        if (currentConfirmPwd !== password) {
            setConfirmPasswordMsg('입력하신 비밀번호와 일치하지 않습니다.')
            setIsConfirmPassword(false)
        } else {
            setConfirmPasswordMsg('입력하신 비밀번호와 일치합니다.')
            setIsConfirmPassword(true)
        }
    }

    const handleReset = () => {
        console.log(isPassword, isConfirmPassword)
        if (isPassword && isConfirmPassword) {
            mutate({ password, token });
        }
    }

    return (
        <>
            <Background>
                <LoginContainer >
                    <TitleText>비밀번호 재설정</TitleText>
                    <InputContainer>
                        <FlotingLabelContainer className="has-float-label">
                            <FlotingLabelInput type="password" placeholder="" onChange={onChangePassword}/>
                            <FlotingLabelTitle>비밀번호</FlotingLabelTitle>
                            { isPassword ? 
                                '' :
                                <ValidSentence>비밀번호는 영어, 숫자, 특수문자 조합으로 6글자 이상, 16글자 이하만 이용가능합니다.</ValidSentence> 
                            }
                        </FlotingLabelContainer>
                    </InputContainer>
                    {password.length > 0 && <ValidCheckMsg className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMsg}</ValidCheckMsg>}
                    <InputContainer>
                        <FlotingLabelContainer className="has-float-label">
                            <FlotingLabelInput type="password" placeholder="" onChange={onChangeConfirmPassword}/>
                            <FlotingLabelTitle>비밀번호 확인</FlotingLabelTitle>
                        </FlotingLabelContainer>
                    </InputContainer>
                    {confirmPassword.length > 0 && <ValidCheckMsg className={`message ${isConfirmPassword ? 'success' : 'error'}`}>{confirmPasswordMsg}</ValidCheckMsg>}
                    <BtnContainer>
                        <LoginBtn onClick={handleReset}>완료</LoginBtn>
                    </BtnContainer>
                </LoginContainer>
            </Background>

            <FooterBar/>
        </>
    )
}

const Background = styled.div`
    position: relative;
    background-size: cover;
    background-color: #4659a9;
    padding: 10% 20%;
`;

const LoginContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    padding: 60px 80px;
    margin: 0 auto;
    @media (min-width: 978px) {
        width: 530px;
    }
`;

const TitleText = styled.h1`
    color: white;
    margin: 40px 0 50px 0;
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ValidCheckMsg = styled.p`
    &.message {
        color: white;
        font-family: "KOTRA_GOTHIC";
        font-size: 13px;
        margin: 0;
        &.success {
            color: white;
        }
        &.error {
            color: #ff2727;
        }
    }
`;

const FlotingLabelContainer = styled.label`
    margin: 10px 0;
    width: 100%;
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

const ValidSentence = styled.p`
    color: white;
    font-family: "KOTRA_GOTHIC";
    font-size: 13px;
    margin: 0;
`;

const BtnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoginBtn = styled.button`
    width: 75%;
    height: 60px;
    background-color: #4659A9;
    border: none;
    border-radius: 50px;
    margin-top: 30px;
    color: white;
    font-size: 20px;
    font-family: "KOTRA_GOTHIC";
`;

export default ResetPasswordPage;