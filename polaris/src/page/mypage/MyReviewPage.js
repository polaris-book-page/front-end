import styled from "styled-components";
import NavBar from "../../component/NavBar";
import BookReviewItem from "../../component/BookReviewItem";
import ReviewRatingChart from "../../component/ReviewRatingChart";
import { ReactComponent as ICStar } from "../../assets/ic-star-white.svg";
import { ReactComponent as ICBook } from "../../assets/ic-book-covered-white.svg";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NightSkyBackground from '../../component/NightSkyBackground';
import { useNavigate } from "react-router";

const MyReviewPage = () => {

    // fetch API
    const fetchReviewList = async () => {
        try {
            const response = await axios.get(`/api/mypage/star-review`, { withCredentials: 'true'});
            const data = response.data;
            
            return data;
        } catch (err) {
            console.log(err)
        }
    }

    // react-query
    const ReviewQuery = useQuery({
        queryKey: ["review-list"],
        queryFn: fetchReviewList
    })

    // average a evaluation
    const funcAverage = () => {
        let init = 0;
        const sum = ReviewQuery.data.reviewList.reduce((acc, item) => acc + item.evaluation, init);
        let avg = sum/ReviewQuery.data.reviewList.length;
        return Math.round(avg*100) / 100;
    }

    return (
        !ReviewQuery.isLoading && <>
            <NavBar />
            <NightSkyBackground height={'90vh'}/>
            <Background>
                <Container>
                    <TitleText color={'#ffffff'} size={'28px'}>내 리뷰</TitleText>
                    <StatisticsContainer>
                        <StatisticsBox>
                            <ICStar width={23} style={{marginRight: 5, marginTop: -6}} />
                            <TitleText color={'#ffffff'} size={'20px'}>{ReviewQuery.data.findMyReview ? funcAverage() : 0}</TitleText>
                            <div style={{width: 20}} />
                            <ICBook width={20} style={{marginRight: 7, marginTop: -4}}/>
                            <TitleText color={'#ffffff'} size={'20px'}>{ReviewQuery.data.findMyReview ? ReviewQuery.data.reviewList.length : 0}</TitleText>
                        </StatisticsBox>
                        {/* statistics lib */}
                        <ReviewRatingChart />
                    </StatisticsContainer>
                    <div style={{ height: 20 }} />
                    { ReviewQuery.data.findMyReview ?
                        <ReviewContainer>
                            { 
                                ReviewQuery.data.reviewList.map((item, index) => {  // 경로 수정
                                    return <BookReviewItem key={index} item={item} /> 
                                })
                            }
                        </ReviewContainer> : <>작성한 리뷰가 없습니다.</>
                    }
                </Container>
            </Background>
        </>
    )
}

// text
const TitleText = styled.text`
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_BOLD";
    font-size: ${(props) => props.size || '12px'};
`;

// background
const Background = styled.div`
    position: absolute;
    top: 10px;
    margin: auto;
    display: flex;
    justify-content: center;
    padding: 20px 5%;
`;

// container
const Container = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 120px auto;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    flex-direction: column;
    padding: 40px 20px;
    width: 75vw;
    max-width: 1000px;
    height: 80vh;
    box-shadow: 0px 2px 7px #00000022;
`;

const StatisticsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
`

const ReviewContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    overflow-y: scroll;
    flex-grow: 3;

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
`

// box
const StatisticsBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export default MyReviewPage;