import styled from "styled-components";
import NavBar from "../../component/NavBar";
import FooterBar from "../../component/FooterBar";

const ForgotPasswordPage = () =>{
    return (
        <>
            <NavBar/>
            <Background>
                <LoginContainer >
                    <TitleText>비밀번호 찾기</TitleText>
                    <SubtextContainer>
                        <Sentence>아이디를 입력해주세요</Sentence>
                        <Sentence>가입하신 이메일로 비밀번호 재설정 링크를 보내드립니다</Sentence>
                    </SubtextContainer>
                    <InputContainer>
                    <FlotingLabelContainer className="has-float-label">
                        <FlotingLabelInput type="text" placeholder=""/>
                        <FlotingLabelTitle>아이디</FlotingLabelTitle>
                    </FlotingLabelContainer>
                </InputContainer>
                    <BtnContainer>
                        <LoginBtn>다음</LoginBtn>
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
    margin: 40px 0 15px 0;
    text-align: center;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
`;

const SubtextContainer = styled.div`
    color: white;
    font-family: "KOTRA_GOTHIC";
    text-align: center;
    margin: 10px;
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

const Sentence = styled.p`
    font-size: 15px;
    color: white;
    font-family: "KOTRA_GOTHIC";
    margin: 5px;
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

export default ForgotPasswordPage;