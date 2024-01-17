import styled from "styled-components";
import NavBar from "../../component/NavBar.js";
import FooterBar from "../../component/FooterBar";

const EditProfilePage = () =>{
    return(
        <>
            <NavBar />
            <Background>
                <CardContainer>
                    <div style={{margin: 40}} />
                    <CardBox>
                    <ProfileContainer>
                        <ProfileImage />  
                        <div style={{margin: 20}} />
                        <ProfileBox>
                            <ContentText color={'#4659A9'} size={'18px'}>아이디 : </ContentText>
                            <InputContent style={{marginLeft: 20}} readOnly/>
                        </ProfileBox>
                        <ProfileBox>
                            <ContentText color={'#4659A9'} size={'18px'}>닉네임 : </ContentText>
                            <InputContent style={{marginLeft: 20}}/>
                        </ProfileBox>
                        <ProfileBox>
                            <ContentText color={'#4659A9'} size={'18px'}>이메일 : </ContentText>
                            <InputContent style={{marginLeft: 20}}/>
                        </ProfileBox>
                        <div style={{margin: 25}} />
                        <InfoTextBox>
                            <ContentText color={'black'} size={'12px'}>본 티켓 소지인의 정보는 웹사이트의 서비스를 사용할 수 있도록 활용됩니다.</ContentText>
                            <ContentText color={'#97A4E8'} size={'12px'}>This ticket holder's information will be used to use the website's services.</ContentText>
                            <RegisteredBox>
                                <TitleText color={'#4659A9'} size={'15px'}>Registerd: </TitleText>
                                <TitleText color={'#4659A9'} size={'15px'}>가입 날짜 </TitleText>
                            </RegisteredBox>
                        </InfoTextBox>
                    </ProfileContainer>
                    <EditInfoBtnBox>
                        <div style={{flex: 1}} />
                        <EditInfoBtn>
                            <ContentText color={'#4659A9'} size={'12px'}>티켓 정보 수정하기 &gt;&gt;&gt;&gt;</ContentText>
                        </EditInfoBtn>
                    </EditInfoBtnBox>
                    </CardBox>
                </CardContainer>
            </Background>
            <FooterBar />
        </>
    );
}

// text
const TitleText = styled.text`
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_BOLD";
    font-size: ${(props) => props.size || '12px'};
    margin-bottom: 20px
`

const ContentText = styled.text`
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_GOTHIC";
    font-size: ${(props) => props.size || '12px'};
`

// container
const Background = styled.div`
    position: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background: linear-gradient(#c4cef9, #facecb);
    justify-content: center;
    align-items: center;
    padding-right: 5vw;
    padding-left: 5vw;
`;

const CardContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: cetner;
    align-items: center;
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px;
`;

// box
const CardBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0 20px;
    padding: 10px;
    background-color: white;
    border-style: solid;
    border-color: #4659A9;
    border-width: 1;
    border-radius: 30px;
`;

const ProfileBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
`;

const InfoTextBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`;

const RegisteredBox = styled.div`
    margin-top: 10px;
`;

const EditInfoBtnBox = styled.div`
    display: flex;
`;

// component
const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: gray;
`;

const InputContent = styled.input`
    font-size: 14px;
    flex: 1;
    border: none;
    border-radius: 50px;
    background-color: #c4cef94d;
    padding: 4px;
    font-family: "KOTRA_GOTHIC";
`;

const EditInfoBtn = styled.button`
    background: none;
    border: none;
`;

export default EditProfilePage;