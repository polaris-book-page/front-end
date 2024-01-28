import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from 'axios';
import { ReactComponent as ArrowRight } from "../assets/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import NavBar from "../component/NavBar";
import FooterBar from "../component/FooterBar";
import GridBox from "../component/GridBox"

const MainPage = () => {
  const pagePerLimit = 5;
  const maxResults = 50
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentArray, setCurrentArray] = useState(1);

    const bestsellerResult = async (start) => {
      setLoading(true);
      try {
        const result = await axios.get(`ttb/api/ItemList.aspx?ttbkey=${process.env.REACT_APP_TTBKEY}&Cover=Big&QueryType=Bestseller&MaxResults=${maxResults}&start=${start}&SearchTarget=Book&output=js&Version=20131101`);
        console.log(result.data);
        setData(result.data.item);
        const newItemSlice = [];
            for (let i = 0; i < maxResults; i += pagePerLimit) {
                newItemSlice.push(result.data.item.slice(i, i + pagePerLimit));
            }
            setItemsPerPage(newItemSlice)
            console.log('start ', start)
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }

    useEffect(() => {
      setCurrentItems(itemsPerPage[(currentPage - 1) % 10])
  }, [currentPage, itemsPerPage, currentItems])
  

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    const totalPages = Math.ceil(maxResults / pagePerLimit);
    console.log("nextpage ", nextPage)
    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
    }
    if (nextPage % 10 === 1) {
      setCurrentArray(Math.floor((nextPage) / 10 + 1))
      setCurrentPage(1)
    }
  };
  
  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    
    if (prevPage >= 1) {
      setCurrentPage(prevPage);
    }
    console.log('prepage ', prevPage)
    console.log('curr ', currentPage)
    if ((prevPage) % 10 === 0) {
      if (currentArray !== 1) {
        setCurrentArray(currentArray - 1)
        setCurrentPage(10)
      }
    }
  };
  
  useEffect(() => {
    if (currentArray !== 0) {
      bestsellerResult(currentArray);
    }
  }, [currentArray]);
        

  return (
    <>
      <NavBar />
      {/* banner */}
      <Carousel>
        <Carousel.Item>
          <Banner />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Banner />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div style={{ height: "50px" }} />
      {/* content */}
      <MainContainer>
        <TitleText>Best Seller:</TitleText>
        <SubTitleText>사람들이 요즘 많이 보는 책을 살펴볼까요?</SubTitleText>
        <BookContainer>
          <ArrowL onClick={handlePrevPage} />
          {currentItems && currentItems.map((item, index) => (
                <GridBox key={index} item={item} gridArea={`gridBox${index % 5 + 1}`} />
            ))}
          <ArrowR onClick={handleNextPage}/>
        </BookContainer>
        <div style={{ height: "50px" }} />
        <TitleText>여행자가 가장 많이 읽은 책:</TitleText>
        <SubTitleText>
          북극성 사용자가 많이 완독한 책을 살펴볼까요?
        </SubTitleText>
        <BookContainer>
          <ArrowLeft />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <BookItem />
          <ArrowRight />
        </BookContainer>
        <div style={{ height: "50px" }} />
        <TitleText>북극성 구독하기:</TitleText>
        <SubTitleText>북극성의 이야기를 들어보고 싶으시다면,</SubTitleText>
        <SubTitleText>
          북극성 운영자가 북극성의 소식과 글조각을 간간이 전해드립니다.
        </SubTitleText>
        <SubscribeContainer>
          <TextInput placeholder="여러분의 닉네임을 입력하세요." />
          <TextInput placeholder="여러분의 이메일을 입력하세요." />
          <PersonalInfoBox>
            <PersonalInfoCheck type="checkbox" />
            <PersonalInfoText>개인정보처리방침에 동의합니다.</PersonalInfoText>
          </PersonalInfoBox>
          <div style={{ height: "50px" }} />
          <SubscribeBtn>구독하기</SubscribeBtn>
        </SubscribeContainer>
        <div style={{ height: "100px" }} />
      </MainContainer>
      <FooterBar />
    </>
  );
};

const Banner = styled.div`
  width: 100%;
  height: 400px;
  background-color: #d9d9d9;
`;

const MainContainer = styled.div`
  padding: 0 48px;
`;

const TitleText = styled.p`
  font-size: 30px;
  color: #4659a9;
  font-weight: 700;
  font-family: "KOTRA_BOLD";
`;

const SubTitleText = styled.p`
  font-size: 20px;
  color: #97a4e8;
  font-family: "KOTRA_GOTHIC";
`;

const BookContainer = styled.div`
  display: flex;
  justify-content: center;
  grid-template-areas:
  "arrowl gridBox1 gridBox2 gridBox3 gridBox4 gridBox5 arrowr";
`;

const ArrowL = styled(ArrowLeft)`
  grid-area: arrowl;
  margin-right: 20px;
  margin-top: 140px;
`;

const ArrowR = styled(ArrowRight)`
  grid-area: arrowr;
  margin-top: 140px;
`;

const BookItem = styled.div`
  width: 270px;
  height: 400px;
  background-color: #d9d9d9;
  margin: 10px;
  box-shadow: 0px 5px 10px #d9d9d9;
`;

const SubscribeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextInput = styled.input`
  width: 620px;
  height: 80px;
  border-radius: 30px;
  border: 5px solid #d9d9d9;
  padding: 10px;
  font-size: 20px;
  margin: 10px 0;
  font-family: "KOTRA_GOTHIC";
`;

const SubscribeBtn = styled.button`
  width: 350px;
  height: 80px;
  background-color: #4659a9;
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 20px;
  font-family: "KOTRA_GOTHIC";
`;

const PersonalInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PersonalInfoCheck = styled.input`
  border: 7px solid #4659a9;
`;

const PersonalInfoText = styled.div`
  font-size: 16px;
  color: #97a4e8;
  margin-left: 10px;
  margin-top: 10px;
  font-family: "KOTRA_GOTHIC";
`;

export default MainPage;
