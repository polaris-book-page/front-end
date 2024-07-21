import styled from "styled-components";
import NavBar from "../../component/NavBar";
import FooterBar from "../../component/FooterBar";

const CompleteEmailSendPage = () =>{
    return (
        <>
            <NavBar />
            <Background>
                <LoginContainer >
                    <SubtextContainer>
                        <Sentence>메일이 전송되었습니다.</Sentence>
                        <Sentence>가입하실 때 작성하셨던 이메일의 메일함을 확인해주세요.</Sentence>
                    </SubtextContainer>
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

const SubtextContainer = styled.div`
    color: white;
    font-family: "KOTRA_GOTHIC";
    text-align: center;
    margin: 10px;
`;

const Sentence = styled.p`
    font-size: 15px;
    color: white;
    font-family: "KOTRA_GOTHIC";
    margin: 5px;
`;

export default CompleteEmailSendPage;