import styled from "styled-components";
import StarRating from '../component/StarRating.js'
import { ReactComponent as IcBookCovered } from "../assets/ic-book-covered.svg";

const ReviewComment = () => { 
    return (
        <Container>
            {/* user info */}
            <ProfileImage />
            <UserInfoBox>
                <UserInfoTextBox>
                    <UserNameEvalBox>
                        <UserNameText  style={{marginTop: 5}} size={'14px'} color={'#4659A9'}>넹글넹글 돌아가는</UserNameText>
                        <StarRating rating={3.5} size={'15px'} />
                    </UserNameEvalBox>
                    <UserInfoDetailBox>
                        <IcBookCovered />
                        <ContentText color={'#4659A9'}>22권 탐험</ContentText>
                        <ContentText color={'#4659A9'}>23.05.14</ContentText>
                    </UserInfoDetailBox>
                </UserInfoTextBox>
            </UserInfoBox>
            {/* review content */}
            <ContentBox>
                이 책은 아주 작가 자전적인 소설이구요 블라블라 어쩌구 저쩌구 웅냥 이 책은 아주 작가 자전적인 소설이구요 블라블라 어쩌구 저쩌구 웅냥 이 책은 아주 작가 자전적인 소설이구요 블라블라 어쩌구 저쩌구 웅냥 이 책은 아주 작가 자전적인 소설이구요 블라블라 어쩌구 저쩌구 웅냥 이 책은 아주 작가 자전적인 소설이구요 블라블라 어쩌구 저쩌구 웅냥 이 책은 아주 작가 자전적인 소설이구요 블라블라 어쩌구 저쩌구 웅냥 
            </ContentBox>
        </Container>
    );
}

// container
const Container = styled.div`
    display: grid;
    grid-template-rows: 55px 1fr;
    grid-template-columns: 40px 1fr;
    padding: 10px;
    gap: 3px;
`;

// text
const UserNameText = styled.text`
    grid-column: auto / span 3;
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_BOLD";
    font-size: ${(props) => props.size || '12px'};
`;

const ContentText = styled.text`
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_GOTHIC";
    font-size: ${(props) => props.size || '12px'};
    margin-left: 5px;
`;

// box
const UserInfoBox = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
`;

const UserInfoTextBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

const UserNameEvalBox = styled.div`
    display: flex;
    padding: 5px;
    gap: 5px;
    margin-top: -10px;
`;

const UserInfoDetailBox = styled.div`
    display: flex;
    gap: 2px;
    margin-left: 5px;
`;

const ContentBox = styled.div`
    grid-column: 2;
    display: flex;
    padding: 10px;
    font-family: "KOTRA_GOTHIC";
    font-size: 13px;
`;

// content
const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: #ddd;
  box-shadow: 0px 2px 4px #ddd;
`;

export default ReviewComment;