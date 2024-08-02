import styled from "styled-components";
import FooterBar from "../../component/FooterBar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from "react";
import NavBar from "../../component/NavBar";
import NightSkyBackground from '../../component/NightSkyBackground';

const LoginPage = () =>{
    const [_id, setUserId] = useState('')
	const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { state } = useLocation();
    const initialData = queryClient.getQueryData(['check']);
    
    const { mutate } = useMutation({
        mutationFn: async (userInfo) => {
            var referrer = document.referrer;
            const { data } = await axios.post(`/api/user/login`, userInfo, { withCredentials: true })
            console.log("data", data)
            console.log('state: ', state)
            return data;
        }, 
        onSuccess: (data) => {
            console.log("login success")
            queryClient.invalidateQueries(['check']);
            goBack()
        },
        onError: () => {
            console.log("login failure")
        }
    });

    let goBack = async() => {
        await queryClient.refetchQueries(["check"]);
        const UserAuthInfoCheck = await queryClient.getQueryData(["check"]);
        console.log('state in goback: ', state)
        if (state) {
            navigate(state, {state : UserAuthInfoCheck.userId });
        } else {
        navigate("/");
        }
    };

    const handleLogin = () => {
        mutate({ _id, password });
    }

    const navigateRegister = () => {
        navigate('/auth/register')
    }

    const navigatePasswordReset = () => {
        navigate('/auth/forget-password')
    }

    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            handleLogin(); 
        }
    };

    return (
        <>
            <NavBar />
            <NightSkyBackground height={'calc(100vh - 100px)'} />
            <Background>
                <LoginContainer >
                    <TitleText>LOGIN</TitleText>
                    <InputContainer>
                    <FlotingLabelContainer className="has-float-label">
                        <FlotingLabelInput type="text" placeholder="" onChange={(e) => {setUserId(e.target.value)}}/>
                        <FlotingLabelTitle>아이디</FlotingLabelTitle>
                    </FlotingLabelContainer>
                    </InputContainer>
                    <InputContainer>
                        <FlotingLabelContainer className="has-float-label">
                            <FlotingLabelInput type="password" placeholder="" onKeyDown={handleOnKeyPress} onChange={(e) => {setPassword(e.target.value)}} />
                            <FlotingLabelTitle>비밀번호</FlotingLabelTitle>
                        </FlotingLabelContainer>
                    </InputContainer>
                    <BtnContainer>
                        <FindPwdText onClick={navigatePasswordReset}>비밀번호를 잊어버리셨나요?</FindPwdText>
                        <RegisterText onClick={navigateRegister}>계정이 없으신가요?</RegisterText>
                        <LoginBtn onClick={handleLogin}> 로그인 </LoginBtn>
                    </BtnContainer>
                </LoginContainer>
            </Background>
            <FooterBar />
        </>
    )
}

const Background = styled.div`
    position: absolute;
    top: 150px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 0 5%;
`;

const LoginContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    padding: 60px 80px;
    margin: 0 auto;
    max-width: 530px;
`;

const TitleText = styled.h1`
    color: white;
    margin: 40px 0 60px 0;
    text-align: center;
    font-size: 40px;
    font-family: "KOTRA_BOLD";
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
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

const BtnContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FindPwdText = styled.p`
    font-size: 15px;
    color: white;
    font-family: "KOTRA_GOTHIC";
    margin-top: 2px;
    margin-bottom: 3px;
    &:hover {
        cursor: default;
    }
`;

const RegisterText = styled.p`
    font-size: 15px;
    color: white;
    font-family: "KOTRA_GOTHIC";
    margin-bottom: 0;
    &:hover {
        cursor: default;
    }
`;

const LoginBtn = styled.button`
    width: 75%;
    height: 60px;
    background-color: #4659A9;
    border: none;
    border-radius: 50px;
    margin-top: 20px;
    color: white;
    font-size: 20px;
    font-family: "KOTRA_GOTHIC";
`;

export default LoginPage;