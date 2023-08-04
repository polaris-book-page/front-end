import styled from "styled-components";
import NavBar from "../../component/NavBar";
import FooterBar from "../../component/FooterBar";

const LoginPage = () =>{
    return (
        <>
            <NavBar/>
            <Background>
                <LoginContainer >
                    <TitleText>LOGIN</TitleText>
                    <InputContainer>
                    <FlotingLabelContainer className="has-float-label">
                        <FlotingLabelInput type="text" placeholder=""/>
                        <FlotingLabelTitle>아이디</FlotingLabelTitle>
                    </FlotingLabelContainer>
                </InputContainer>
                <InputContainer>
                    <FlotingLabelContainer className="has-float-label">
                        <FlotingLabelInput type="password" placeholder=""/>
                        <FlotingLabelTitle>비밀번호</FlotingLabelTitle>
                    </FlotingLabelContainer>
                </InputContainer>
                    <BtnContainer>
                        <FindPwdText>비밀번호를 잊어버리셨나요?</FindPwdText>
                        <LoginBtn> 로그인 </LoginBtn>
                    </BtnContainer>
                </LoginContainer>
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

export default LoginPage;