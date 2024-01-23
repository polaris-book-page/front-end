import styled from "styled-components";
import NavBar from "../../component/NavBar";
import BookReviewItem from "../../component/BookReviewItem";
import ReviewRatingChart from "../../component/ReviewRatingChart";
import { ReactComponent as ICStar } from "../../assets/ic-star-white.svg";
import { ReactComponent as ICBook } from "../../assets/ic-book-covered-white.svg";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const MyReviewPage = () => {


    // fetch API
    const fetchReviewList = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/mypage/star-review`, { withCredentials: 'true'});
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
        return avg;
    }

    return (
        !ReviewQuery.isLoading && <>
            <NavBar/>
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
                        <Reviewcontainer>
                            {
                                ReviewQuery.data.reviewList.map((item, index) => {
                                    return <BookReviewItem key={index} rate={item.evaluation} image={item.bookImage} />
                                })
                            }
                        </Reviewcontainer> : <>작성한 리뷰가 없습니다.</>
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
    position: flex;
    justify-content: center;
    height: 90vh;
    background-color: #4659a9;
    padding: 20px 5%;
    overflow: none;
`;

// container
const Container = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    flex-direction: column;
    padding: 40px 20px;
    height: 80vh;
    width: 90vh;
    box-shadow: 0px 2px 7px #00000022;


    @media screen and (max-width: 900px) {
        width: 60vh;
    }

    @media screen and (max-width: 500px) {  
        width: 50vh;
    }
`;

const StatisticsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
`

const Reviewcontainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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