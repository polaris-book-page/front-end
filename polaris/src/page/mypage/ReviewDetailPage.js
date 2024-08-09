import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import NavBar from "../../component/NavBar";
import NightSkyBackground from "../../component/NightSkyBackground";
import StarRating from "../../component/StarRating";
import LoadSpinner from "../../component/LoadSpinner";

const ReviewDetailPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // useEffect
    useEffect(()=> {
        queryClient.invalidateQueries(['detail-review']);
    }, [state.isbn])

    // fetch func
    const fetchDetailReview = async () =>{
        try{
            const res = await axios.get(`/api/book/info/review/${state.isbn}`, { withCredentials: true })
            const data = res.data;
    
            console.log("data", data);
    
            return data;
        } catch(err){
            console.log(err);
        }
    }

    // review query
    const DetailReviewQuery = useQuery({
        queryKey: ['detail-review'],
        queryFn: fetchDetailReview,
        refetchOnWindowFocus : true
    });

    const DateFormat = (date) => {
        const dateObj = new Date(date);
        
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const day = dateObj.getDate();
  
        return `${year}.${month + 1}.${day}`
    }

    const handleMovePage =() =>{
        const obj = {
            title: state.title,
            author: state.author,
            cover: state.bookImage,
            isbn13: state.isbn,
            planetImage: state.planetImage
        }
        navigate('/mypage/write', {state: obj})
    }

    return(        
        <>
        <NavBar/>
        <NightSkyBackground height={'calc(100vh - 100px)'} />
        <EditBtn onClick={handleMovePage}>수정하기</EditBtn>
        <Container>
        {!DetailReviewQuery.isLoading ? <>
            {/* scroll */}
            <ScrollbarContainer>
            
                <ContentContainer>
                {/* book image */}
                    <BookInfoBox>
                        <BookImage>
                            <img src={state.bookImage} style={{ width: 80, height: 120 }} />                            
                        </BookImage>
                        <InfoSubBox>
                            <TitleAuthorBox>
                                <TitleText color={'white'} size={'16px'}>{state.title}</TitleText>
                                <ContentText color={'white'} size={'13px'}>{state.author}</ContentText>
                            </TitleAuthorBox>
                            <RatingBox>
                                <StarRating rating={state.evaluation} size={'20px'} />
                            </RatingBox>
                            <div style={{height: 10}} />
                            <DateBox>
                                <ContentText color={'white'} size={'13px'}>독서 기간: &nbsp;</ContentText>
                                <ContentText color={'white'} size={'13px'}>{DateFormat(DetailReviewQuery.data.startDate)} ~ {DateFormat(DetailReviewQuery.data.endDate)}</ContentText>
                            </DateBox>
                        </InfoSubBox>
                    </BookInfoBox>
                    <div style={{height: 20}} />
                    {/* dashed line */}
                    <Line />
                    {/* quote */}
                    <ReviewContainer>
                        <QuoteBox>
                            <TitleText color='white' size='16px'>인용</TitleText>
                            {DetailReviewQuery.data.quotes == null ? <ContentText color={"white"} size={'13px'}>등록된 인용구가 없습니다.</ContentText> :  (
                                DetailReviewQuery.data.quotes.map((item, index) => {
                                    return (<div key={index}>
                                        <ContentText color={"white"} size={'15px'}>- {item.page} page: </ContentText>
                                        <ContentText color={"white"} size={'14px'}>{item.quote}</ContentText>
                                        <div style={{height: 10}} />
                                    </div>)
                                })
                            )}
                        </QuoteBox>
                        {/* review */}
                        <div style={{height: 20}} />
                        <ReviewBox>
                            <TitleText color='white' size='16px'>리뷰</TitleText>
                            <ContentText color={'white'} size='15px'>{DetailReviewQuery.data.content}</ContentText>
                        </ReviewBox>
                    </ReviewContainer>
                </ContentContainer>
            </ScrollbarContainer>
            </>: <LoadSpinner />}
        </Container>
    </>
    )
};

// text
const TitleText = styled.span`
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_BOLD";
    font-size: ${(props) => props.size || '12px'};
`;

const ContentText = styled.span`
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_GOTHIC";
    font-size: ${(props) => props.size || '12px'};
    line-height: 1.8;
`

// container
const Container = styled.div`
    display: flex;
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 120px auto;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    flex-direction: column;
    padding: 40px 20px;
    height: 70vh;
    width: 90vw;
    max-width: 1000px;
    box-shadow: 0px 2px 7px #00000022;
`;

const ScrollbarContainer = styled.div`
    display: flex;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;

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

    @media screen and (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 0 10px;
    gap: 10px 0;
`;

const ReviewContainer = styled.div`
`;

// box
const BookInfoBox = styled.div`
    display: flex;
    align-items: center;
`;

const InfoSubBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
`;

const TitleAuthorBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const RatingBox = styled.div`
    display: flex;
    align-items: center;
`

const DateBox = styled.div`
    display: flex;
`;

const QuoteBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const ReviewBox = styled.div`
    display: flex;
    flex-direction: column;
`;

// component
const Line = styled.div`
    border-color: white;
    border-width: 2px;
    border-style: dashed;
    width: 100%;
    margin-bottom: 20px;
    margin-top: 30px;

`;

const BookImage = styled.div`
    background-color: #4659a9;
    border-radius: 10px;
    padding: 12px;
    grid-column: 2;
    align-self: flex-start;
`;

const EditBtn = styled.button`
    position: absolute;
    top: 110px;
    right: 5vh;

    display: flex;
    justify-content: center;
    font-family: "KOTRA_GOTHIC";
    color: white;
    background-color: #97A4EB;
    border-style: none;
    font-size: 16px;
    padding: 7px 50px;
    border-radius: 50px;
    text-align: center;
    margin-top: 10px;
`;


export default ReviewDetailPage;