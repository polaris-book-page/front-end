import styled from "styled-components";
import NavBar from "../../component/NavBar.js";
import FooterBar from "../../component/FooterBar";
import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg";
import { ReactComponent as IcType } from "../../assets/ic-type.svg";
import { ReactComponent as IcRocket } from "../../assets/ic-rocket.svg";
import { ReactComponent as IcBook} from "../../assets/ic-book.svg";

const MyPage = () => {
  return (
    <>
      <NavBar />

      <BookContainer>
        <Background>
          <div style={{ height: '30px' }} />
          <TextBox>
            <HighTitleBox>
              <HighTitleText style={{ marginRight: 10 }}>
                BOOK PASSPORT
              </HighTitleText>
              <HighTitleCircle />
              <HighTitleCircle />
            </HighTitleBox>
            <div style={{ flex: 1 }} />
            <HighTitleBox>
              <HighTitleCircle />
              <HighTitleCircle />
              <HighTitleText style={{ marginLeft: 10 }}>
                북극성 BOOK POLARIS
              </HighTitleText>
            </HighTitleBox>
          </TextBox>
          <div style={{ height: '40px' }} />
          {/* info-card */}
          <CardContainer>
            <CardBox>
              {/* profile */}
              <ProfileContainer>
                <ProfileBox>
                  <ProfileImage />
                  <ProfileContent>
                    <Text size={'13px'}>닉네임: </Text>
                    <Text size={'13px'}>아이디: </Text>
                    <Text size={'13px'}>이메일: </Text>
                    <Text size={'13px'}>가입일자: </Text>
                  </ProfileContent>
                </ProfileBox>

              </ProfileContainer>
              {/* statistics */}
              <ContentContainer>
                <ProfileTitleBox>
                  <ProfileTitleText>: 지금까지의 여행 기록</ProfileTitleText>
                  <ProfileSubTitleText>더보기</ProfileSubTitleText>
                </ProfileTitleBox>
                <Text color={'#97A4E8'}>통계 살펴보기</Text>
                <StatisticsBox>
                  <StatisticsContent>
                    <StatisticIcon color={'#CBCDFA'}>
                      <IcType />
                    </StatisticIcon>
                    <StatisticsBar color={'#CBCDFA'}>56권, 560km</StatisticsBar>
                    <Text color={'#97A4E8'}>만큼 탐험했어요!</Text>
                  </StatisticsContent>
                  <StatisticsContent>
                    <StatisticIcon color={'#D5CFFB'}>
                      <IcBook />
                    </StatisticIcon>
                    <StatisticsBar color={'#D5CFFB'}>인문학</StatisticsBar>
                    <Text color={'#97A4E8'}>카테고리를 많이 읽었어요!</Text>
                  </StatisticsContent>
                  <StatisticsContent>
                    <StatisticIcon color={ '#DDCBFA'}>
                      <IcRocket />
                    </StatisticIcon>
                    <StatisticsBar color={'#DDCBFA'}>과학</StatisticsBar>
                    <Text color={'#97A4E8'}>분야를 많이 읽었어요!</Text>
                  </StatisticsContent>
                </StatisticsBox>
              </ContentContainer>
              {/* reading */}
              <ContentContainer>
                <ProfileTitleBox>
                  <ProfileTitleText>: 지금까지의 여행 기록</ProfileTitleText>
                  <ProfileSubTitleText>더보기</ProfileSubTitleText>
                </ProfileTitleBox>
                <ReadingBox>
                  <img style={{ backgroundColor: '#ddd', width: 50, height: 70}} />
                  <ReadingContent>
                    <Text color={'#4659A9'} size={'16px'}>책 제목</Text>
                    <Text color={'#4659A9'}>2023.07.07 ~ 2023.07.15</Text>
                  </ReadingContent>
                </ReadingBox>
                <ReadingBox>
                  <img style={{ backgroundColor: '#ddd', width: 50, height: 70}} />
                  <ReadingContent>
                    <Text color={'#4659A9'} size={'16px'}>책 제목</Text>
                    <Text color={'#4659A9'}>2023.07.07 ~ 2023.07.15</Text>
                  </ReadingContent>
                </ReadingBox>
              </ContentContainer>
            </CardBox>
          </CardContainer>
        </Background>

        {/* favorite */}
        <FavoriteContainer>
          <div style={{ height: '170px' }} />
          <TextBox>
            <TitleText>otcr의 북킷리스트</TitleText>
            <div style={{ flex: 1 }} />
            <MoreText>더보기</MoreText>
          </TextBox>
          <div style={{ height: '30px' }} />
          <FavoriteBox>
            <ArrowLeft />
            <BookItem />
            <BookItem />
            <BookItem />
            <BookItem />
            <BookItem />
            <ArrowRight />
          </FavoriteBox>
        </FavoriteContainer>
      </BookContainer>
      <div style={{ height: '50px' }} />
      <FooterBar />
    </>
  );
};

const Text = styled.text`
  color: ${(props) => props.color || 'gray'};
  font-family: "KOTRA_GOTHIC";
  font-size: ${(props) => props.size || '12px'};
`

const Background = styled.div`
  position: flex;
  flex-direction: column;
  width: 100%;
  height: 230px;
  background: linear-gradient(#c4cef9, #facecb);
  justify-content: center;
  align-items: center;
`;

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: cetner;
  align-items: center;
  height: 250px;
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin: 0 20px;
  padding: 10px;
  background-color: white;
  border-style: solid;
  border-color: #4659A9;
  border-width: 1;
  border-radius: 30px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 10px;
`;

const ProfileBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  margin: 10px;
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #fff;
  box-shadow: 0px 4px 8px #ddd;
  margin-bottom: 15px;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 10px;
`

// statistics, My reading book title
const ProfileTitleBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
`

const ProfileTitleText = styled.text`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-family: "KOTRA_BOLD";
  color: #4659A9;
  margin-right: 10px;
`
const ProfileSubTitleText = styled.text`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-family: "KOTRA_BOLD";
  color: #97A4E8;
`

// statistics content
const StatisticsBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 10px;
`

const StatisticsContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin: 7px;
`
const StatisticIcon = styled.div`
  width: 50px;
  height: 50px;
  padding: 5px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border-radius: 50px;
  border-style: solid;
  border-color: ${(props) => props.color};
`

// differ to color
const StatisticsBar = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
  width: 300px;
  text-align: center;
  justify-content: center;
  flex-direction: row;
  color: #4659A9;
  background-color: ${(props) => props.color};
  font-family: "KOTRA_BOLD";
  border-radius: 50px;
  padding: 15px;
  margin-right: 7px;
`
// reading book
const ReadingBox = styled.div`
  display: flex;
  align-items: center;
  border-style: solid;
  border-width: 2px;
  border-color: #D5CFFB;
  flex-direction: row;
  border-radius: 30px;
  margin: 5px;
  padding: 10px;
`

const ReadingContent = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  font-family: "KOTRA_GOTHIC";
  margin-left: 10px;
`

const FavoriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 50px;
`;

const FavoriteBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BookItem = styled.div`
  width: 270px;
  height: 400px;
  background-color: #d9d9d9;
  margin: 10px;
  box-shadow: 0px 5px 10px #d9d9d9;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 20px;
`;

// 추후에 수정
const TitleText = styled.div`
  display: flex;
  font-family: "KOTRA_BOLD";
  font-size: 30px;
  color: #4659a9;
  font-weight: 700;
`;

const MoreText = styled.div`
  display: flex;
  font-family: "KOTRA_BOLD";
  font-size: 20px;
  color: #4659a9;
  font-weight: 700;
  float: right;
`;

const HighTitleText = styled.div`
  display: flex;
  font-family: "KOTRA_BOLD";
  font-size: 20px;
  color: white;
  font-weight: 700;
`;

const HighTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HighTitleCircle = styled.div`
  background-color: white;
  border-radius: 50px;
  width: 10px;
  height: 10px;
  margin: 4px;
`;


export default MyPage;
