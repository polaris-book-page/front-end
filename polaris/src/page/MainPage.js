import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from 'axios';
import { ReactComponent as ArrowRight } from "../assets/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import NavBar from "../component/NavBar";
import FooterBar from "../component/FooterBar";
import GridBox from "../component/GridBox"
import { useMutation, useQuery } from '@tanstack/react-query';

const MainPage = () => {
  const pagePerLimit = 5;
  const maxResults = 50
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentReadPage, setCurrentReadPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState([]);
  const [itemsReadPerPage, setItemsReadPerPage] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentReadItems, setCurrentReadItems] = useState([]);
  const [currentArray, setCurrentArray] = useState(1);
  const [currentReadArray, setCurrentReadArray] = useState(1);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);

    const bestsellerResult = async (start) => {
      setLoading(true);
      try {
        const result = await axios.get(`ttb/api/ItemList.aspx?ttbkey=${process.env.REACT_APP_TTBKEY}&Cover=Big&QueryType=Bestseller&MaxResults=${maxResults}&start=${start}&SearchTarget=Book&output=js&Version=20131101`);
        setData(result.data.item);
        if (result.data.item) {
          mutate({ books: result.data.item });
        }
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

    const { mutate } = useMutation({
      mutationFn: async (bookInfo) => {
          const { data } = await axios.post(`/api/search/result/save`, bookInfo, { withCredentials: true })
          return data;
      }, 
      onSuccess: (data) => {
          console.log("book save success")
      },
      onError: () => {
          console.log("book save failure")
      }
  });

  const fetchMostRead = async () => {
    try {
        const response = await axios.get(`/api/book/most-read`, { withCredentials: 'true'});
        const data = response.data;
        
        return data;
    } catch (err) {
        console.log(err)
    }
}

  const fetchBookInfo = async (isbn) => {
    try {
        const response = await axios.get(`/api/book/info/${isbn}`, { withCredentials: 'true'});
        const data = response.data;
        
        return data;
    } catch (err) {
        console.log(err)
    }
  }

  const mostReadQuery = useQuery({
      queryKey: ["most-read"],
      queryFn: fetchMostRead
  })

  const MostReadResult = async () => {
    try {
      console.log("mostReadQuery.data", mostReadQuery.data)
      const newItemSlice = [];
          for (let i = 0; i < maxResults; i += pagePerLimit) {
              newItemSlice.push(mostReadQuery.data.slice(i, i + pagePerLimit));
          }
          setItemsReadPerPage(newItemSlice)
    } catch (e) {
      console.log(e);
    }
  }

  const subscribe = useMutation({
    mutationFn: async (subInfo) => {
      console.log("subInfo", subInfo)
      const { data } = await axios.post(`api/user/subscribe`, subInfo, { withCredentials: true })
      alert("구독이 완료되었습니다. 이제 작은 글조각들이 메일함으로 전송될 거예요!")
      return data;
    },
    onSuccess: (data) => {
      console.log("subscribe success")
    },
    onError: () => {
        console.log("subscribe failure")
    }
  })


    useEffect(() => {
      setCurrentItems(itemsPerPage[(currentPage - 1) % 10])
  }, [currentPage, itemsPerPage])

  useEffect(() => {
    const fetchBookDetails = async () => {
        if (itemsReadPerPage.length > 0) {
          const currentSlice = itemsReadPerPage[(currentReadPage - 1) % 10];
          const bookDetailsPromises = currentSlice.map(item => fetchBookInfo(item._id));
          const bookDetails = await Promise.all(bookDetailsPromises);
          setCurrentReadItems(bookDetails);
      }
    };
  
    fetchBookDetails();
  }, [currentReadPage, itemsReadPerPage]);

  useEffect(() => {
    if (mostReadQuery.data) {
      MostReadResult();
    }
  }, [mostReadQuery.data]);

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
  
  const handleReadNextPage = () => {
    const nextPage = currentReadPage + 1;
    const totalPages = Object.keys(itemsReadPerPage).length;
    console.log("nextpage ", nextPage)
    if (nextPage <= totalPages) {
      setCurrentReadPage(nextPage);
    }
    if (nextPage % 10 === 1) {
      setCurrentReadArray(Math.floor((nextPage) / 10 + 1))
      setCurrentReadPage(1)
    }
  };
  
  const handleReadPrevPage = () => {
    const prevPage = currentReadPage - 1;
    
    if (prevPage >= 1) {
      setCurrentReadPage(prevPage);
    }
    console.log('prepage ', prevPage)
    console.log('curr ', currentReadPage)
    if ((prevPage) % 10 === 0) {
      if (currentReadArray !== 1) {
        setCurrentReadArray(currentReadArray - 1)
        setCurrentReadPage(10)
      }
    }
  };
  
  useEffect(() => {
    if (currentArray !== 0) {
      bestsellerResult(currentArray);
    }
  }, [currentArray]);

  const handleSubscribe = () => {
    if (nickname && email) {
      subscribe.mutate({ nickname, email });
    }
  }

  const checkHandled = ({target}) => {
    setChecked(!checked);
  }

  return (
    !mostReadQuery.isLoading  && mostReadQuery.data &&
    <>
      <NavBar />
        {/* banner */}
        <Carousel>
          <Carousel.Item>
            <Banner src={require('../assets/graphic/main-cover-1.png')} />
          </Carousel.Item>
          <Carousel.Item>
            <Banner src={require('../assets/graphic/main-cover-2.png')} />
          </Carousel.Item>
          <Carousel.Item>
            <Banner src={require('../assets/graphic/main-cover-3.png')} />
          </Carousel.Item>
        </Carousel>
        <div style={{ height: "50px" }} />
      {/* content */}
      <Background>
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
          <div style={{ height: "50px", marginTop: "50px" }} />
          <TitleText>여행자가 가장 많이 읽은 책:</TitleText>
          <SubTitleText>
            북극성 사용자가 많이 완독한 책을 살펴볼까요?
          </SubTitleText>
          <BookContainer>
        <ArrowL onClick={handleReadPrevPage} />
          {currentReadItems && currentReadItems.map((item, index) => (
            <GridBox key={index} item={item} gridArea={`gridBox${index % 5 + 1}`} />
            ))}
          <ArrowR onClick={handleReadNextPage}/>
        </BookContainer>
          <div style={{ height: "50px", marginTop: "50px" }} />
          <TitleText>북극성 구독하기:</TitleText>
          <SubTitleText>북극성의 이야기를 들어보고 싶으시다면,<br /></SubTitleText>
          <SubTitleText>
            북극성 운영자가 북극성의 소식과 글조각을 간간이 전해드립니다.
          </SubTitleText>
          <SubscribeContainer>
            <TextInput placeholder="여러분의 닉네임을 입력하세요." onChange={(e) => {setNickname(e.target.value)}}/>
            <TextInput placeholder="여러분의 이메일을 입력하세요." onChange={(e) => {setEmail(e.target.value)}}/>
            <PersonalInfoBox>
              <PersonalInfoCheck type="checkbox" onChange={(e) => checkHandled(e)} />
              <PersonalInfoText>개인정보처리방침에 동의합니다.</PersonalInfoText>
            </PersonalInfoBox>
            <div style={{ height: "50px" }} />
            { checked && nickname && email
              ? <SubscribeBtn id='subBtn' onClick={handleSubscribe} checked={checked} nickname={nickname} email={email}>구독하기</SubscribeBtn>
              : <SubscribeBtn disabled id='subBtn' onClick={handleSubscribe} checked={checked} nickname={nickname} email={email}>구독하기</SubscribeBtn>
            }
          </SubscribeContainer>
          <div style={{ height: "100px" }} />
          </MainContainer>
        </Background>
      <FooterBar />
    </>
  );
};

const Banner = styled.img`
  display: flex;
  width: 100%;
  max-height: 500px;
  background-color: #d9d9d9;
`;

const Background = styled.div`
    padding-right: 5%;
    padding-left: 5%;
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

const SubTitleText = styled.span`
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

const SubscribeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
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
  width: 300px;
  height: 60px;
  background-color: ${props => props.checked && props.nickname && props.email ? '#4659a9 ': '#909090'};
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 20px;
  font-family: "KOTRA_GOTHIC";
`;

const PersonalInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const PersonalInfoCheck = styled.input`
  border: 7px solid #4659a9;
`;

const PersonalInfoText = styled.div`
  font-size: 16px;
  color: #97a4e8;
  margin-left: 10px;
  font-family: "KOTRA_GOTHIC";
`;

export default MainPage;
