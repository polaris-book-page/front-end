import styled, {keyframes} from "styled-components";
import NavBar from "../../component/NavBar.js";
import FooterBar from "../../component/FooterBar";
import { ReactComponent as IcType } from "../../assets/ic-type.svg";
import { ReactComponent as IcRocket } from "../../assets/ic-rocket.svg";
import { ReactComponent as IcBook} from "../../assets/ic-book.svg";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';

const MyPage = () => {
  const [flip, setFlip] = useState(false);
  let navigate = useNavigate();
  const queryClient = useQueryClient()
  const basicImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
 
  const fields = [];
  const fieldCnt = new Map();

    const fetchReviewList = async () => {
      try {
          const res = await axios.get(`/api/mypage/star-review`, { withCredentials: 'true'});
          const data = res.data;

          if (!data.findMyReview) return false;
          

          return data;
          
      } catch (err) {
          console.log(err)
      }
  }

  const fetchUserProfile = async () => {
    try {
        // refetch user auth
        await queryClient.refetchQueries(["check"]);
      const UserAuthInfoCheck = queryClient.getQueryData(["check"]);

        const res = await axios.get(`/api/user/${UserAuthInfoCheck.userId}`)
        const data = res.data;

        return data.findUser;
    } catch (err) {
        console.log("get user profile failure.");
    }
  }

  const fetchLikeList = async () => {
    try {
        const res = await axios.get(`/api/mypage/like/list`, { withCredentials: 'true'});
        const data = res.data;
      
        return data;
    } catch (err) {
      console.log("get user like list failure.", err);
    }
  }

  const queries = useQueries({
    queries: [{
      queryKey: ["profile", 1],
      queryFn: fetchUserProfile
    },
    {
      queryKey: ["review-list", 2],
      queryFn: fetchReviewList
    },
    {
      queryKey: ["like-list", 3],
      queryFn: fetchLikeList
    }]
  })

  const DateFormat = (date) => {
      const dateObj = new Date(date);
      
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth();
      const day = dateObj.getDate();

      return `${year}.${month + 1}.${day}`
  }

  const handleDetail = (item) =>{
    navigate(`/mypage/review/detail`, { state: item })
  }

  const reviewList = (data) => {
    if (data.length >= 2) {
      const newData = data.slice(-2).reverse()
      const items = newData.map((item, index) => {

        return (
          <ReadingBox onClick={() =>handleDetail(item)} key={index}>
            <img src={item.bookImage} style={{ backgroundColor: '#ddd', width: 50, height: 70 }} />
            <ReadingContent>
              <ContentText color={'#4659A9'} size={'14px'}>{item.title}</ContentText>
              <ContentText color={'#4659A9'}>{DateFormat(item.startDate) + '~' + DateFormat(item.endDate)}</ContentText>
            </ReadingContent>
          </ReadingBox>
        )
      })

      return items;
    }
    else {
      let items = new Array();
      for (let cnt = 0; cnt <= 1; cnt++) {
        if (data.length - cnt > 0) {
          items = data.map((item, index) => {
          cnt++;
          return (
            <ReadingBox key={index}>
              <img src={item.bookImage} style={{ backgroundColor: '#ddd', width: 50, height: 70 }} />
              <ReadingContent>
                <ContentText color={'#4659A9'} size={'14px'}>{item.title}</ContentText>
                <ContentText color={'#4659A9'}>{DateFormat(item.startDate) + '~' + DateFormat(item.endDate)}</ContentText>
              </ReadingContent>
            </ReadingBox>
          )
        })}
      }
      return items;
    }
  }

  const BooketList = (data) => {
    if (data.length >= 6) {
      const newData = data.slice(0, 6);
      const items = newData.map((item, index) => {
        return (
          <BookItem onClick={()=>navigate('/book/info')} key={index} src={item.cover} />
        )
      })

      return items;
    }
    else {
      let items = new Array();
      for (let cnt = 0; cnt <= 5; cnt++) {
        if (data.length - cnt > 0) {
          items = data.map((item, index) => {
            cnt++;
            return (
              <BookItem key={index} src={item.cover} />
            )
          })
        }

        items.push(
          <BookItem />
        )       
      }
      return items;
    }
  }

  const CountingCategory = (reviews) => {
    const categories = [];
    const categoryCnt = new Map();
    if (reviews) {
        // init category count list
        categoryCnt.forEach((value, key, map) => {
          map.set(key, 0);
        });;
        
        // count category
        reviews.forEach(review => {
          if (!categoryCnt.has(review.category)) {
            categoryCnt.set(review.category, 0);
            categories.push(review.category);
          }
          categoryCnt.set(review.category, categoryCnt.get(review.category) + 1);
        });
    }
    return categories[0]
  }

  const CountingField = (reviews) => {
    const fields = [];
    const fieldCnt = new Map();
    if (reviews) {
        // init field count list
        fieldCnt.forEach((value, key, map) => {
          map.set(key, 0);
        });;
        
        // count field
        reviews.forEach(review => {
          if (!fieldCnt.has(review.field)) {
            fieldCnt.set(review.field, 0);
            fields.push(review.field);
          }
          fieldCnt.set(review.field, fieldCnt.get(review.field) + 1);
        });
    }
    return fields[0]
  }

  return (
    !queries[0].isLoading && !queries[1].isLoading && !queries[2].isLoading && <>
      <NavBar/>
      <BookContainer>
        <Background>
          <div style={{ height: '20px' }} />
          <TextBox>
            <HighTitleBox>
              <HighTitleText style={{ marginRight: 10 }}>
                BOOK PASSPORT
              </HighTitleText>
              <HighTitleCircle />
              <HighTitleCircle />
            </HighTitleBox>
            <div style={{ flex: 1 }} />
            <HighTitleBox style={{textAlign: 'right'}}>
              <HighTitleCircle />
              <HighTitleCircle />
              <HighTitleText style={{ marginLeft: 10 }}>
                북극성 BOOK POLARIS
              </HighTitleText>
            </HighTitleBox>
          </TextBox>
          <div style={{ height: '20px' }} />
          {/* info-card */}
          <CardContainer>
            <CardBox flipped={flip}>
              {!flip ? (
                <>
                {/* ticket front */}
              <ContentContainer>
              {/* profile */}
              <ProfileContainer>
                <ProfileBox> 
                  {queries[0].data.profileImage ? <ProfileImage src={queries[0].data.profileImage} /> : <ProfileImage src={basicImg} />}
                  <ProfileContent>
                    <ContentText size={'13px'}>닉네임: {queries[0].data.nickname}</ContentText>
                    <ContentText size={'13px'}>아이디: {queries[0].data._id}</ContentText>
                    <ContentText size={'13px'}>이메일: {queries[0].data.email}</ContentText>
                    <ContentText size={'13px'}>가입일자: {DateFormat(queries[0].data.createDate)}</ContentText>
                  </ProfileContent>
                        <div style={{margin: 20}} />
                        <ContentText onClick={() => navigate('/mypage/edit-profile')} color={'#CBCDFA'} size={'12px'} style={{textDecoration: 'underline'}}>프로필 수정하기</ContentText>
                </ProfileBox>

              </ProfileContainer>
              {/* statistics */}
              <ContentBox>
                <ProfileTitleBox>
                  <ProfileTitleText>: 지금까지의 여행 기록</ProfileTitleText>
                </ProfileTitleBox>
                <ContentText color={'#97A4E8'}>통계 살펴보기</ContentText>
                {queries[1].data.findMyReview ? 
                  <StatisticsBox>
                    <StatisticsContent>
                      <StatisticIcon color={'#CBCDFA'} style={{zIndex: 1}}>
                        <IcType />
                      </StatisticIcon >
                      {queries[1].data.findMyReview ? <StatisticsBar color={'#CBCDFA'} style={{zIndex: 0}}>{queries[1].data.reviewList.length}권</StatisticsBar> : <StatisticsBar color={'#CBCDFA'} style={{zIndex: 0}}>0권</StatisticsBar>}
                      <ContentText color={'#97A4E8'}>만큼 탐험했어요!</ContentText>
                    </StatisticsContent>
                    <StatisticsContent>
                      <StatisticIcon color={'#D5CFFB'}>
                        <IcBook />
                      </StatisticIcon>
                      {queries[1].data.findMyReview ? <StatisticsBar color={'#D5CFFB'}>{CountingCategory(queries[1].data.reviewList)}</StatisticsBar> : <StatisticsBar color={'#D5CFFB'}>0</StatisticsBar>}
                      <ContentText color={'#97A4E8'}>카테고리를 많이 읽었어요!</ContentText>
                    </StatisticsContent>
                    <StatisticsContent>
                      <StatisticIcon color={ '#DDCBFA'}>
                        <IcRocket />
                      </StatisticIcon>
                      {queries[1].data.findMyReview ? <StatisticsBar color={'#D5CFFB'}>{CountingField(queries[1].data.reviewList)}</StatisticsBar> : <StatisticsBar color={'#D5CFFB'}>0</StatisticsBar>}
                      <ContentText color={'#97A4E8'}>분야를 많이 읽었어요!</ContentText>
                    </StatisticsContent>
                  </StatisticsBox>
                  : <ContentText>작성한 리뷰가 없습니다.</ContentText>}
              </ContentBox>
              {/* reading */}
              <ContentBox>
                <ProfileTitleBox>
                  <ProfileTitleText>: 나의 우주</ProfileTitleText>
                </ProfileTitleBox>
                <ContentText color={'#97A4E8'}>지금까지 읽은 책 탐방하기</ContentText>
                {queries[1].data.findMyReview ? reviewList(queries[1].data.reviewList) : <ContentText>작성한 리뷰가 없습니다.</ContentText>}
              </ContentBox>
              </ContentContainer>
              </>
              ) : (
                <>
                  {/* Ticket back */}
                  <TicketContainer>
                    <ContentText color={'black'} size={'13px'}>북극성 회원인 이 여권 소지인은 아무 지장 없이 다양한 행성을 탐험할 수 있도록 하여 주시고 웹사이트에서 제공하는 서비스를 사용할 수 있도록 한다.</ContentText>
                    <TicketLogoBox>
                      <TitleText color={'#4659A9'} size={'20px'} style={{zIndex: 1}}>북 극 성  운 영 자</TitleText>
                      <TicketLogo src={require('../../assets/graphic/app-logo.png')} style={{zIndex: 0}}/>
                    </TicketLogoBox>
                    <ContentText color={'black'} size={'13px'}>As a member of the Polaris, this passport holder will be able to explore to the various planets without any hindrance and use the services provided by the website.</ContentText>
                    <TicketSignatureBox>
                      <ContentText color={'#4659A9'} size={'13px'}>소지인의 서명</ContentText>
                      <TicketNameBox>
                        <ContentText color={'#4659A9'} size={'12px'}>holder's signature</ContentText>
                          <ContentText color={'black'} size={'12px'}> &nbsp; {queries[0].data._id}</ContentText>
                      </TicketNameBox>
                      <TicketNameLine /> 
                    </TicketSignatureBox>
                  </TicketContainer>
                </>
              )}
              <EditInfoBtnBox>
              <div style={{flex: 1}} />
              <EditInfoBtn onClick={() => setFlip(!flip)}>
                  <ContentText color={'#4659A9'} size={'15px'}> &gt;&gt;&gt;&gt;</ContentText>
              </EditInfoBtn>
            </EditInfoBtnBox>
            </CardBox>
          </CardContainer>
        </Background>
        
        <ListWrapper>
        {/* favorite */}
        <FavoriteContainer>
          <div style={{ height: '50px' }} />
          <TextBox>
            <TitleText color={'#4659A9'} size={'28px'}>otcr의 북킷리스트</TitleText>
            <div style={{ flex: 1 }} />
            <MoreText onClick={() => navigate('/mypage/list')}>더보기</MoreText>
          </TextBox>
          <div style={{ height: '30px' }} />
          <FavoriteBox>
            <div style={{flex: 1}} />
            <BookListBox>
              {BooketList(queries[2].data)}
            </BookListBox>
            <div style={{flex: 1}} />
          </FavoriteBox>
        </FavoriteContainer>
        <ListContainer>
          <ListItemOne onClick={() => navigate('/mypage/statistics')}>통계 보러가기</ListItemOne>
          <ListItemTwo onClick={() => navigate('/mypage/universe')}>우주를 향유하러</ListItemTwo>
          <ListItemThree onClick={() => navigate('/mypage/review')}>작성한 기록보기</ListItemThree>
          <ListItemFour onClick={() => navigate('/mypage/calendar')}>북극성 달력</ListItemFour>
        </ListContainer>
        </ListWrapper>
      </BookContainer>
      <div style={{ height: '50px' }} />
      <FooterBar />
    </>
  );
};


const ContentText = styled.div`
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_GOTHIC";
    font-size: ${(props) => props.size || '12px'};
`

const TitleText = styled.div`
  color: ${(props) => props.color || 'gray'};
  font-family: "KOTRA_BOLD";
  font-size: ${(props) => props.size || '12px'};
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(#c4cef9, #facecb, #ffffff00);
  justify-content: center;
  padding-right: 5vw;
  padding-left: 5vw;
`;

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  perspective: 1000px;
`;

const CardBox = styled.div`
  display: flex;
  width: 95vw;
  max-width: 90vw;
  flex-direction: column;
  padding: 2vw;
  background-color: white;
  border-style: solid;
  border-color: #4659A9;
  border-width: 1;
  border-radius: 30px;

  transition: transform 1s;
  transform-style: preserve-3d;
  transform: ${({ flipped }) => (flipped ? 'rotateX(180deg)' : 'rotateX(0deg)')};
`;

const ProfileContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 10px;
`;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 5vw;
  padding-left: 5vw;

  @media all and (max-width: 1250px) {
    display: flex;
    flex-direction: column;
  }
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 40rem;

  @media all and (max-width: 1250px) {
    height: 37rem;
  }
`;

const Gradient = keyframes`
    0% {
      background-position: 50% 100%;
      opacity: 0.9;
      transform: translateY(0px);
    }
    50%{
      opacity: 1.0;
      transform: translateY(5px);
    }
    100% {
      background-position: 50% 100%;
      opacity: 0.9;
      transform: translateY(0px);
    }
`;

const ListItemOne = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "KOTRA_GOTHIC";

  width: 10rem;
  height: 10rem;
  color: white;
  border-radius: 30rem;

  background-color: #2C2C60ee;
  animation: ${Gradient} 5s ease-in-out infinite;
  bottom: 12rem;
  left: 10rem;

  transition: 0.5s;
  &:hover {
    width: 11rem;
    height: 11rem;
    curser: pointer;
    font-size: 1.1rem;
  }
`;

const ListItemTwo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "KOTRA_GOTHIC";

  width: 8rem;
  height: 8rem;
  color: white;
  border-radius: 30rem;

  background: linear-gradient( #6F61C6, #4659A9, #2C2C60);
  animation: ${Gradient} 10s ease-in-out infinite;
  right: 5rem;
  bottom: 3rem;

  transition: 0.5s;
  &:hover {
    width: 9rem;
    height: 9rem;
    curser: pointer;
    font-size: 1.1rem;
  }
`;

const ListItemThree = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "KOTRA_GOTHIC";

  width: 9rem;
  height: 9rem;
  color: white;
  border-radius: 30rem;

  background-size: 2000% 2000%;
  background: linear-gradient(#6F61C6, #97A4E8);
  animation: ${Gradient} 3s ease-in-out infinite;
  right: 3rem;
  bottom: 1rem;

  transition: 0.5s;
  &:hover {
    width: 10rem;
    height: 10rem;
    curser: pointer;
    font-size: 1.1rem;
  }
`;

const ListItemFour = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "KOTRA_GOTHIC";

  width: 10rem;
  height: 10rem;
  color: white;
  border-radius: 30rem;

  background-size: 2000% 2000%;
  background: linear-gradient(#D5CFFB, #97A4E8);
  animation: ${Gradient} 5s ease-in-out infinite;
  top: 8rem;
  right: 20rem;

  transition: 0.5s;
  &:hover {
    width: 11rem;
    height: 11rem;
    curser: pointer;
    font-size: 1.1rem;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  margin: 10px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  box-shadow: 0px 4px 8px #ddd;
  margin-bottom: 30px;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  gap: 5px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  margin: 5px;
  gap: 10px;
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

// statistics, My reading book title
const ProfileTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
`

const ProfileTitleText = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-family: "KOTRA_BOLD";
  color: #4659A9;
  margin-right: 10px;
`

// statistics content
const StatisticsBox = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  margin-bottom: 10px;
`

const StatisticsContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin: 7px;
  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`
const StatisticIcon = styled.div`
  width: 50px;
  height: 50px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border-style: solid;
  border-color: ${(props) => props.color};
`

// differ to color
const StatisticsBar = styled.div`
  position: relative;
  left: -10px; 
  display: flex;
  min-width: 200px;
  text-align: center;
  justify-content: center;
  color: #4659A9;
  background-color: ${(props) => props.color};
  font-family: "KOTRA_BOLD";
  border-radius: 50px;
  padding: 15px;
  margin-right: 7px;
  @media screen and (max-width: 1200px) {
    left: 0px; 
  }
`
// reading book
const ReadingBox = styled.div`
  display: flex;
  max-height: 200px;
  flex: 0.6;
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
  flex: 1;
  
  flex-direction: column;
  font-family: "KOTRA_GOTHIC";
  margin-left: 10px;
`

const FavoriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 5vw;
  padding-left: 5vw;
`;

const FavoriteBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BookListBox = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;

    @media screen and (max-width: 1500px) {
      
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (max-width: 900px) {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 380px) {
      display: flex;
      flex-dirrection: column;
    }
`;

const BookItem = styled.img`
  width: 180px;
  height: 250px;
  background-color: #d9d9d9;
  margin: 10px;
  box-shadow: 0px 5px 10px #d9d9d9;

  @media screen and (max-width: 380px) {
    width: 120px;
    height: 170px;
  }
`;

const TextBox = styled.div`
  display: flex;
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
  justify-content: center;
  align-items: center;
`;

const HighTitleCircle = styled.div`
  background-color: white;
  border-radius: 50px;
  width: 10px;
  height: 10px;
  margin: 4px;
  @media screen and (max-width: 700px) {
  display: none;
  }
`;

// edit
const EditInfoBtn = styled.button`
    background: none;
    border: none;
`;

const EditInfoBtnBox = styled.div`
    display: flex;
`;

// back card
const TicketContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr 0.5fr 0.5fr;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 15px;

    @media screen and (max-width: 600px) {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    transform: rotateX(180deg);
`;

const TicketLogoBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 50px;
    margin-top: 10px;
`;

const TicketLogo = styled.img`
    position: relative;
    top: -25px;
    left: -25px;
    width: 80px;
    height: 80px;
`;

const TicketSignatureBox = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 2;
  grid-row: 3;
  align-items: center;
`;

const TicketNameBox = styled.div`
  display: flex;
`;

const TicketNameLine = styled.div`
    width: 250px;
    border-style: solid;
    border-width: 1px;
    border-color: #ddd;
`;

export default MyPage;
