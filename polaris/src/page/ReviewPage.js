import styled from "styled-components";
import FooterBar from "../component/FooterBar";
import NavBar from "../component/NavBar";
import ReviewComment from "../component/ReviewComment";
import StarRating from '../component/StarRating.js'
import axios from "axios";
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useInView } from 'react-intersection-observer';

const ReviewPage = () => {

    const { state } = useLocation();
    const { ref, inView } = useInView();

    const fetchBookReviewList = async (page) => {
    try {
      const res = await axios.get(`/api/book/info/users/review/list?isbn=${state}&page=${page}`, { withCredentials: true });
      const data = res.data;

      return data;
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
      if(inView && reviewQuery.hasNextPage) reviewQuery.fetchNextPage();
  }, [inView]);

  const reviewQuery = useInfiniteQuery({
    queryKey: ["book-review-list-pagenation"],
    queryFn: ({ pageParam = 1 }) => fetchBookReviewList(pageParam),
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
    }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      return !lastPage.findBookReview ? undefined : nextPage;
    }
  })

  

  const listItem = useMemo(() => {
    if (reviewQuery.data) {
      const items = reviewQuery.data.pages.reduce((acc, cur) => 
        acc.concat(cur.result), []
      
        )

      return items;
    }
}, [reviewQuery.data])

  const handleReviewList = () => {
    const list = listItem.map((item, index) => {
        if(item === undefined) return <NoMoreText key={index}>더이상 리뷰가 없습니다.</NoMoreText>
        else return <ReviewComment key={index} review={item} />
      })

    return list;
  }

  return (
    <>
      <NavBar />
      <CenterContainer>
      <Container>
        <ReviewContainer>
          {!reviewQuery.isLoading && reviewQuery.data && <>
          {/* review title */}
          <ReviewTitleBox>
            <ReviewTitle>
              <TitleText color={'#4659A9'} size={'18px'}>다른 탐험자들의 리뷰</TitleText>
              <TitleText color={'#97A4E8'} size={'18px'}>30</TitleText>
            </ReviewTitle>
            <EvaluateBox>
              <StarRating rating={3.8} size={'20px'} />
              <TitleText style={{marginTop: 4, marginLeft: 5}} color={'#97A4E8'} size={'16px'}>3.8</TitleText>
            </EvaluateBox>
          </ReviewTitleBox>
          {/* review content */}
          <ReviewContentBox>
              {handleReviewList()}
              {!reviewQuery.isFetchingNextPage && <div ref={ref}/>}
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
  flex: 1;
  padding: 50px 5%;
`;

const CenterContainer = styled.div`
  display: flex;
  background: linear-gradient(#c4cef9, #facecb, #ffffff);
  justify-content: center;
`;

// sub container
const ReviewContainer = styled.div`
  display: grid;
  grid-template-rows: 50px 5fr;
  background-color: white;
  border-radius: 30px;
  padding: 20px;
  box-shadow: 0px 2px 7px #ddd;
`;

// text
const TitleText = styled.span`
  color: ${(props) => props.color || 'gray'};
  font-family: "KOTRA_BOLD";
  font-size: ${(props) => props.size || '12px'};
`;

// box
const ReviewTitleBox = styled.div`
  display: grid;
  grid-template-columns: 220px 150px;
`;

const ReviewContentBox = styled.div`
  display: flex;
  height: 66vh;
  flex-direction: column;
  overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.4);
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.7);
        border-radius: 6px;
    }
`; 

const EvaluateBox = styled.div`
  display: flex;
  flex-direction: row;
`;

// conetnt
const ReviewTitle = styled.div`
  display: grid;
  grid-template-columns: 175px 1fr;
`;

const NoMoreText = styled.div`
  color: #4659A9;
  font-family: "KOTRA_GOTHIC";
  text-align: center;
`


export default ReviewPage;
