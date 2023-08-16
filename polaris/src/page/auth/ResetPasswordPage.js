import styled from "styled-components";
import NavBar from "../../component/NavBar";
import FooterBar from "../../component/FooterBar";

const ResetPasswordPage = () =>{
    return (
        <>
            <NavBar/>
            <Background>
                <LoginContainer >
                    <TitleText>비밀번호 재설정</TitleText>
                    <InputContainer>
                        <FlotingLabelContainer className="has-float-label">
                            <FlotingLabelInput type="password" placeholder=""/>
                            <FlotingLabelTitle>비밀번호</FlotingLabelTitle>
                            <ValidSentence>비밀번호는 영어, 숫자, 특수문자 중 2가지 조합으로 6글자 이상, 16글자 이하만 이용가능합니다.</ValidSentence>
                        </FlotingLabelContainer>
                    </InputContainer>
                    <InputContainer>
                        <FlotingLabelContainer className="has-float-label">
                            <FlotingLabelInput type="password" placeholder=""/>
                            <FlotingLabelTitle>비밀번호 확인</FlotingLabelTitle>
                        </FlotingLabelContainer>
                    </InputContainer>
                    <BtnContainer>
                        <LoginBtn>완료</LoginBtn>
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