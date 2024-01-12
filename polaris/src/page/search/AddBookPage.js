import styled from "styled-components";
import NavBar from "../../component/NavBar";
import FooterBar from "../../component/FooterBar";
import { ReactComponent as Upload } from "../../assets/ic-upload.svg";

const AddBookPage = () => {
  return (
    <>
      <NavBar />
      <Container>
        <div style={{ height: "50px" }} />
        <AddBookTitle>도서 등록</AddBookTitle>
        {/* container */}
        <AddBookContainer>
          {/* photo container */}
          <PhotoContainer>
            <Photo />
            <UploadButton>
              <Upload width={"25px"} />
              upload
            </UploadButton>
          </PhotoContainer>
          {/* input container */}
          <AddBookContentContainer>
            <InputContainer>
              <InputBox>
                <InputTitle>도서 제목: </InputTitle>
                <InputContent></InputContent>
              </InputBox>
              <InputBox>
                <InputTitle>지은이: </InputTitle>
                <InputContent></InputContent>
              </InputBox>
              <InputBox>
                <InputTitle>옮긴이: </InputTitle>
                <InputContent></InputContent>
              </InputBox>
              <InputBox>
                <InputTitle>출판사: </InputTitle>
                <InputContent></InputContent>
              </InputBox>
              <InputBox>
                <InputTitle>쪽수: </InputTitle>
                <InputContent></InputContent>
              </InputBox>
              <InputBox>
                <InputTitle>isbn: </InputTitle>
                <InputContent></InputContent>
              </InputBox>
              <InputBox>
                <InputTitle>카테고리: </InputTitle>
                <InputContent></InputContent>
              </InputBox>
              <InputBox>
                <InputTitle>분야: </InputTitle>
                <InputContent></InputContent>
              </InputBox>
            </InputContainer>
            <SaveBox>
              <SaveButton>저장</SaveButton>
            </SaveBox>
          </AddBookContentContainer>
        </AddBookContainer>
        <InfoText>
          카테고리와 분야를 추가하시면, 통계 페이지에서 확인하실 수 있습니다.
        </InfoText>
        <div style={{ height: "70px" }} />
      </Container>
      <FooterBar />
    </>
  );
};

const Container = styled.div`
  background: linear-gradient(#c4cef9, #facecb, #ffffff);
`;

const AddBookContainer = styled.div`
  padding: 50px;
  display: flex;
  background-color: white;
  border-radius: 50px;
  margin: 0px 100px;
`;

const AddBookTitle = styled.div`
  font-family: "KOTRA_BOLD";
  font-size: 30px;
  color: #4659a9;
  text-align: center;
  margin-bottom: 15px;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex: 0.5;
  flex-direction: column;
  margin-right: 40px;
`;

const Photo = styled.img`
  width: 100%;
  height: 250px;
  background-color: #c0c0c0;
  margin-bottom: 10px;
`;

const UploadButton = styled.button`
  border: 3px dashed #d5cffb;
  background-color: white;
  border-radius: 10px;
  padding: 5px;
  font-family: "KOTRA_GOTHIC";
  color: #4659a9;
`;

const AddBookContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
`;

const InputTitle = styled.div`
  color: #4659a9;
  font-size: 18px;
  margin-right: 15px;
  flex: 0.4;
  text-align: right;
  font-family: "KOTRA_GOTHIC";
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

const SaveBox = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: center;
`;

const SaveButton = styled.button`
  width: 110px;
  height: 40px;
  background-color: #4659a9;
  border-radius: 50px;
  border: none;
  color: white;
  margin-top: 30px;
  font-family: "KOTRA_GOTHIC";
`;

const InfoText = styled.div`
  text-align: center;
  margin-top: 15px;
  color: #4659a9;
  font-family: "KOTRA_GOTHIC";
`;

export default AddBookPage;
