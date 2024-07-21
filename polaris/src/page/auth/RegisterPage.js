import styled from "styled-components";
import React, { useState } from 'react';
import FooterBar from "../../component/FooterBar";
import Checkbox from "../../component/CheckBox";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from '@tanstack/react-query'
import NavBar from "../../component/NavBar";
import NightSkyBackground from "../../component/NightSkyBackground";

const RegisterPage = () =>{
    const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState(false);
    const [_id, setUserId] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    // set invalid message
    const [_idMsg, setUserIdMsg] = useState(' dkadsas')
	const [passwordMsg, setPasswordMsg] = useState(' ')
	const [confirmPasswordMsg, setConfirmPasswordMsg] = useState(' ')
	const [nicknameMsg, setNicknameMsg] = useState(' ')
    const [emailMsg, setEmailMsg] = useState(' ')
    // valid check
    const [is_id, setIsUserId] = useState(false);
	const [isPassword, setIsPassword] = useState(false);
	const [isConfirmPassword, setIsConfirmPassword] = useState(false);
	const [isNickname, setIsNickname] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const queryClient = useQueryClient()
    let navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: async (userInfo) => {
            const { data } = await axios.post(`/api/user/join`, userInfo, { withCredentials: true })
            return data;
        }, 
        onSuccess: () => {
            console.log("register success")
            goHome()
        },
        onError: () => {
            console.log("register failure")
        }
    });

    const fetchIdCheck = async () => {
        try {
            const response = await axios.get(`/api/user/join/id-check/${_id}`, { withCredentials: 'true'});
            const data = response.data;
            console.log(data.isAvailable)
            console.log("id-check success")
            if (data && data.isAvailable === true) {
                alert('사용 가능한 아이디입니다.')
            } else if (data && data.isAvailable === false) {
                alert('중복된 아이디입니다.')
            } 
            
            return data;
        } catch (err) {
            console.log(err)
        }
    }

    const fetchNicknameCheck = async () => {
        try {
            const response = await axios.get(`/api/user/join/nickname-check/${nickname}`, { withCredentials: 'true'});
            const data = response.data;
            console.log(data.isAvailable)
            console.log("nickname-check success")
            if (data && data.isAvailable === true) {
                alert('사용 가능한 닉네임입니다.')
            } else if (data && data.isAvailable === false) {
                alert('중복된 닉네임입니다.')
            } 
            
            return data;
        } catch (err) {
            console.log(err)
        }
    }
    
    const handleDuplicateCheckId = () => {
        console.log("chck in id")
        if (is_id){
            fetchIdCheck()
        }
    };

    const handleDuplicateCheckNickname = () => {
        console.log("chck in nick")
        if (isNickname){
            fetchNicknameCheck()
        }
    };

    let goHome = () => {
        navigate('/');
    };

    const handleRegister = () => {
        console.log(is_id, isPassword, isConfirmPassword, isNickname, isEmail, agreePrivacyPolicy)
        if (is_id && isPassword && isConfirmPassword && isNickname && isEmail && agreePrivacyPolicy) {
            mutate({ _id, password, nickname, email });
            navigate('/register/evaluate')
        }
    }
    
    const handleCheckboxChange = () => {
        setAgreePrivacyPolicy(!agreePrivacyPolicy);
    };

    const onChangeId = (e) => {
        const currentId = e.target.value;
        setUserId(currentId);
        console.log(currentId)
        if (currentId.length < 2 || currentId.length > 20) {
            setUserIdMsg('아이디는 2자리부터 20자리까지 가능합니다.')
            setIsUserId(false)
        } else {
            setUserIdMsg('')
            setIsUserId(true)
        }
    }
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
    const onChangeNickname = (e) => {
        const currentNickname = e.target.value;
        setNickname(currentNickname);
        if (currentNickname.length < 6 || currentNickname.length > 30) {
            setNicknameMsg('닉네임은 6자리부터 30자리까지 가능합니다.')
            setIsNickname(false)
        } else {
            setNicknameMsg('')
            setIsNickname(true)
        }
    }
    const emailReg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        if (!emailReg.test(currentEmail)) {
            setEmailMsg('올바른 이메일을 입력해주세요.')
            setIsEmail(false)
        } else {
            setEmailMsg('사용가능한 이메일입니다.')
            setIsEmail(true)
        }
    }

    return (
        <>
            <NavBar />
            <NightSkyBackground height={'100vh'} />
            <Background>
                <RegisterContainer >
                    <TitleText>REGISTER</TitleText>
                <InputContainer>
                    <FlotingLabelContainer className="has-float-label">
                        <FlotingLabelInput type="text" placeholder="" onChange={onChangeId}/>
                        <FlotingLabelTitle>아이디</FlotingLabelTitle>
                    </FlotingLabelContainer>
                    <DuplicateCheckBtn onClick={handleDuplicateCheckId}>중복확인</DuplicateCheckBtn>
                </InputContainer>
                {_id.length > 0 && <ValidCheckMsg className={`message ${is_id ? 'success' : 'error'}`}>{_idMsg}</ValidCheckMsg>}
                <InputContainer>
                    <FlotingLabelContainer className="has-float-label">
                        <FlotingLabelInput type="password" placeholder="" onChange={onChangePassword}/>
                        <FlotingLabelTitle>비밀번호</FlotingLabelTitle>
                        <ValidSentence>비밀번호는 영어, 숫자, 특수문자 조합으로 6글자 이상, 16글자 이하만 이용가능합니다.</ValidSentence>
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
                <InputContainer>
                    <FlotingLabelContainer className="has-float-label">
                        <FlotingLabelInput type="text" placeholder="" onChange={onChangeNickname}/>
                        <FlotingLabelTitle>닉네임</FlotingLabelTitle>
                    </FlotingLabelContainer>
                    <DuplicateCheckBtn onClick={handleDuplicateCheckNickname}>중복확인</DuplicateCheckBtn>
                </InputContainer>
                {nickname.length > 0 && <ValidCheckMsg className={`message ${isNickname ? 'success' : 'error'}`}>{nicknameMsg}</ValidCheckMsg>}
                <InputContainer>
                    <FlotingLabelContainer className="has-float-label">
                        <FlotingLabelInput type="email" placeholder="polaris-book@gmail.com" onChange={onChangeEmail}/>
                        <FlotingLabelTitle>이메일</FlotingLabelTitle>
                    </FlotingLabelContainer>
                </InputContainer>
                {email.length > 0 && <ValidCheckMsg className={`message ${isEmail ? 'success' : 'error'}`}>{emailMsg}</ValidCheckMsg>}
                <BtnContainer>
                    <Checkbox 
                        label={'개인정보처리방침에 동의합니다.'} 
                        selectedValue={agreePrivacyPolicy}
                        setSelectedValue={handleCheckboxChange}
                    />
                    <NextBtn onClick={handleRegister}> 다음 </NextBtn>
                </BtnContainer>
                </RegisterContainer>
            </Background>
            <FooterBar />
        </>
    )
}

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

const Background = styled.div`
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 5%;
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
    /* align-items: center; */
`;

const FlotingLabelContainer = styled.label`
    margin-top: 15px;
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

const ValidSentence = styled.p`
    color: white;
    font-family: "KOTRA_GOTHIC";
    font-size: 13px;
    margin: 0;
`;

const DuplicateCheckBtn = styled.button`
    background-color: transparent;
    color: white;
    flex-grow: 1;
    padding: 0;
    padding-top: 10px;
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

const NextBtn = styled.button`
    width: 75%;
    padding: 10px;
    background-color: #4659A9;
    border: none;
    border-radius: 50px;
    margin-top: 40px;
    color: white;
    font-size: 20px;
    font-family: "KOTRA_GOTHIC";
`;

export default RegisterPage;