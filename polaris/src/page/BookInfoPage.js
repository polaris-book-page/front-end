import styled from "styled-components";
import axios from 'axios';
import FooterBar from "../component/FooterBar";
import NavBar from "../component/NavBar";
import ReviewComment from "../component/ReviewComment";
import StarRating from '../component/StarRating.js'
import { ReactComponent as ICLike } from "../assets/ic-like-sel.svg";
import BookProgressDropDown from '../component/BookProgressDropDown';
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from "react-router-dom";

const BookInfoPage = () => {
  const [book, setBook] = useState(null);
  const [dbbook, setDbook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkLike, setCheckLike] = useState(null);
  const [progress, setProgress] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

    const bookSearch = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.REACT_APP_TTBKEY}&itemIdType=ISBN&ItemId=${state}&output=js&Version=20131101&cover=big`);
        console.log(result.data.item[0]);
        console.log("itemPage: ", result.data.item[0].subInfo.itemPage);
        setBook(result.data.item[0]);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }

  const { mutate } = useMutation({
    mutationFn: async (bookInfo) => {
        const { data } = await axios.post(`/api/book/info`, bookInfo, { withCredentials: true })
        //console.log("data", data)
        return data;
    }, 
    onSuccess: (data) => {
      console.log("book info save success")
      setDbook(data);
    },
    onError: () => {
      console.log("book info save failure")
    }
  });

  const fetchBookReviewList = async () => {
    try {
      const res = await axios.get(`/api/book/info/review/list?isbn=${state}`, { withCredentials: true });
      const data = res.data;

      return data;
    } catch (err) {
      console.log(err)
    }
  }

  const fetchCheckLike = async () => {
    try {
      const res = await axios.post(`/api/mypage/check/like`, { isbn: state }, { withCredentials: true });
      const data = res.data;
      setCheckLike(data.is_liked);

      return data.is_liked;
    } catch (err) {
      
    }
  }

  const fetchAddLike = async () => {
    try {
      const res = await axios.post(`/api/mypage/like`, {isbn: state}, { withCredentials: true });
      const data = res.data;
      setCheckLike(true);

      return data;
    }
    catch (err) {
      console.log(err);
    }
  }

  const fetchDeleteLike = async () => {
    try {
      const UserAuthInfoCheck = queryClient.getQueryData(["check"]);
      const res = await axios.delete(`/api/mypage/unlike`, { isbn: state, userId: UserAuthInfoCheck.userId }, { withCredentials: true });
      const data = res.data;
      setCheckLike(false);

      return data;
    }
    catch (err) {
      console.log(err);
    }
  }

  const fetchAddBook = async (review) => {
    try {
      const res = await axios.put(`/api/book/add-review`, review, { withCredentials: true });
      const data = res.data;

      console.log(data)

      return data;
    } catch (err) {
      console.log(err)
    }

  }

  const handleAddReview = (progress, startDate, pageType) => {
    setProgress(progress);
    setStartDate(startDate);
    console.log(pageType)
    
    const UserAuthInfoCheck = queryClient.getQueryData(["check"]);

    let formData = new FormData();

    formData.append('userId', UserAuthInfoCheck.userId)
    formData.append('isbn', state)
    if (pageType == "쪽(p)") formData.append('progressPage', progress);
    else formData.append('progressPercent', progress);
    formData.append('startDate', startDate);
    //formData.append('category', null);

    fetchAddBook(formData)
  }

  const reviewQuery = useQuery({
      queryKey: ["book-review-list"],
      queryFn: fetchBookReviewList
  })

  useEffect(() => {
    bookSearch();
  }, []);

  useEffect(() => {
    fetchCheckLike(); 
  }, [])
  
  useEffect(() => {
    if (book) {
      mutate({ isbn: book.isbn13, page: book.subInfo.itemPage });
    }
  }, [book])
  
  if (!(book)) {
    return null;
  }

  const handleNewTab = (url) => {
    window.open(url, "_blank", "noopener, noreferrer");
  }

  const handleReviewList = (review) => {
    console.log("reviwe:", review)
    const cnt = 5;
    const list = new Array(cnt)
    if (!review.findBookReview) list.push(<InfoContentText>리뷰가 없어요.</InfoContentText>)
    else if(review.result.length <= 5) {
      for(let i=0; i < review.result.length; i++){
        list.push(<ReviewComment index={i} review={review.result[i]} />)
      }
    }
    else {
      for (let i=0; i < 5; i++){
      list.push(<ReviewComment index={i} review={review.result[i]} />)
      }
    }


    return list;
  }

  const handleLikeBook = () => {
    if (!checkLike) {
      fetchAddLike();
      alert(`${book.title}이(가) 북킷리스트에 추가되었습니다.`);
    }
    else {
      fetchDeleteLike();
      alert(`${book.title}이(가) 북킷리스트에서 삭제되었습니다.`);
    }

  }

  return (
    <>
      <NavBar />
      <CenterContainer>
      <Container>
        {/* book info */}
        <TitleText color={'#4659A9'} size={'24px'}>{book.title}</TitleText>
        <div style={{height: '20px'}} />
        <InfoContainer>
          <InfoBookBox>
            {/* book image */}
            <BookImageBox>
            <img style={{ width: '150px', height: '200px' }} src={book.cover} alt="Book cover" />
              <StarRating rating={3.5} size={'25px'} />
              <LikeBox>
                <ICLike />
                <TitleText color={'#97A4E8'} size={'16px'}>43</TitleText>
              </LikeBox>
            </BookImageBox>
            {/* book content */}
            <InfoContentBox>
              <InfoContentTextBox>
                <InfoTitleText>지은이: </InfoTitleText>
                <InfoContentText>{book.author.substring(0, book.author.indexOf('(지은이)') - 1)}</InfoContentText>
              </InfoContentTextBox>
              <InfoContentTextBox>
                <InfoTitleText>출판사: </InfoTitleText>
                <InfoContentText>{book.publisher}</InfoContentText>
              </InfoContentTextBox>
              <InfoContentTextBox>
                <InfoTitleText>쪽수: </InfoTitleText>
                <InfoContentText>{book.subInfo.itemPage}</InfoContentText>
              </InfoContentTextBox>
              <InfoContentTextBox>
                <InfoTitleText>isbn: </InfoTitleText>
                <InfoContentText>{book.isbn13}</InfoContentText>
              </InfoContentTextBox>
              <InfoContentDetailBox>
              <InfoTitleText>책정보: </InfoTitleText>
              <InfoContentDetailText>{book.description}</InfoContentDetailText>
              {/* <InfoContentText>이 책은 아주 작가 자전적인 소설이구요 블라블라 어쩌구 저쩌구 웅냥 이 책은 아주 작가 자전적인 소설이구요 블라블라 어쩌구 저쩌구 웅냥 이 책은 아주 작가 자전적인 소설이구요 블라블라 어쩌구 저쩌구 웅냥 이 책은 아주 작가 자전적인 소설이구요 블라블라 어쩌구 저쩌구 웅냥 이 책은 아주 작가 자전적인 소설이구요 블라블라 어쩌구 저쩌구 웅냥 이 책은 아주 작가 자전적인 소설이구요 블라블라 어쩌구 저쩌구 웅냥 </InfoContentText> */}
            </InfoContentDetailBox>
            </InfoContentBox>
          </InfoBookBox>
          <ButtonBox>
            <Button onClick={() => handleLikeBook()}>{!checkLike ? <>북킷리스트에 추가</> : <>북킷리스트에 삭제</>}</Button>
            <Button onClick={() => handleNewTab(`https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=${book.itemId}`)}>알라딘에서 책 구매하기</Button>
            <BookProgressDropDown handleAddReview={handleAddReview} book={book}  />
          </ButtonBox>
        </InfoContainer>
        <div style={{ height: 30 }} />
        {/* review info */}
        <ReviewContainer>
          {/* review title */}
          {!reviewQuery.isFetching && reviewQuery.data && <>
            <ReviewTitleBox>
              <ReviewTitle>
                <TitleText color={'#4659A9'} size={'17px'}>다른 탐험자들의 리뷰</TitleText>
                <TitleText color={'#97A4E8'} size={'17px'}>{reviewQuery.data.length}</TitleText>
              </ReviewTitle>
              <EvaluateBox>
                <StarRating rating={3.8} size={'20px'} />
                <TitleText style={{ marginTop: 4, marginLeft: 5 }} color={'#97A4E8'} size={'16px'}>3.8</TitleText>
              </EvaluateBox>
              <TitleText onClick={() => navigate('/book/review', {state : state })} style={{ justifySelf: 'flex-end', gridRow: 1, gridColumn: 3 }} color={'#4659A9'} size={'13px'}>더보기</TitleText>
            </ReviewTitleBox>
          {/* review content */}
            <ReviewContentBox>
              {handleReviewList(reviewQuery.data)}              
            </ReviewContentBox>
          </>}
        </ReviewContainer>
        <div style={{ height: 30 }} />
      </Container>
      </CenterContainer>
      <FooterBar />
    </>
  );
};

// main container
const Container = styled.div`
  padding: 40px 5%;
`;

const CenterContainer = styled.div`
  display: flex;
  background: linear-gradient(#c4cef9, #facecb, #ffffff);
  justify-content: center;
`;

// text
const TitleText = styled.text`
  color: ${(props) => props.color || 'gray'};
  font-family: "KOTRA_BOLD";
  font-size: ${(props) => props.size || '12px'};
`;

const InfoTitleText = styled.text`
  color: #4659A9;
  font-family: "KOTRA_GOTHIC";
  font-size: 16px;
  justify-self: flex-end;
  font-weight: 700;
`;

const InfoContentText = styled.text`
  flex: 1; 
  color: #4659A9;
  font-family: "KOTRA_GOTHIC";
  font-size: 16px;
  justify-self: flex-start;
`;

const InfoContentDetailText = styled.div`
  flex: 1; 
  color: #4659A9;
  font-family: "KOTRA_GOTHIC";
  font-size: 16px;
  justify-self: flex-start;

    overflow-y: scroll;
  padding-right: 10px;

  &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background: #D4D0EE;
  }
  &::-webkit-scrollbar-thumb {
      background: #6F61C6AA;
      border-radius: 6px;
  }
`;

const LinkText = styled.a`
  color: #ffffff;
  font-family: "KOTRA_GOTHIC";
  text-decoration: none;
`;

// sub container
const InfoContainer = styled.div`
  max-width: 1200px;
  display: grid;
  grid-template-rows: 1fr 50px;
  background-color: white;
  border-radius: 30px;
  padding: 30px;
  box-shadow: 0px 2px 7px #00000022;

  @media screen and (max-width: 587px) {
    grid-template-rows: 1fr 0.5fr;
  }
`;

const ReviewContainer = styled.div`
  max-width: 1200px;
  display: grid;
  grid-template-rows: 70px 5fr;
  background-color: white;
  border-radius: 30px;
  padding: 20px;
  box-shadow: 0px 2px 7px #ddd;
`;

// box
const InfoBookBox = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-rows: 200px 60px 1fr;
  gap: 5px;
`;

const InfoContentBox = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 20px;
  margin-left: 40px;
  gap: 10px;
`;

const InfoContentTextBox = styled.div`
  display: flex;
  gap: 7px;
`;

const InfoContentDetailBox = styled.div`
  height: 100px;
  display: flex;
  gap: 7px;
  grid-column: 1;
  grid-row: 5;

`;

const BookImageBox = styled.div`
  display: grid;
  grid-template-rows: 200px 20px 20px;
  grid-row: auto / span 2;
  gap: 10px;
`;

const LikeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-top: 10px
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 587px) {
    display: flex;
    flex-direction: column;
  }
`;

const ReviewTitleBox = styled.div`
  display: grid;
  grid-template-columns: 170px 150px 1.5fr;
  align-items: center;
  text-align: left;

  @media screen and (max-width: 587px) {
    grid-template-rows: 1fr 50px;
    grid-template-columns: 220px 1fr;
  }
`;

const ReviewContentBox = styled.div`
  display: flex;
  flex-direction: column;
`; 

const EvaluateBox = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 587px) {
    grid-column: 1;
    grid-row: 2;
  }
`;

// content
const ReviewTitle = styled.div`
  display: flex;
  flex-direction: flex-start;
  gap: 6px;
`;

const Button = styled.button`
  font-family: "KOTRA_GOTHIC";
  color: white;
  background-color: #4659A9;
  border-style: none;
  font-size: 14px;
  padding: 3px 20px;
  margin: 8px;
  border-radius: 50px;
`;

export default BookInfoPage;
