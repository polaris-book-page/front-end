import styled from "styled-components";
import StarRatingVertical from "./StarRatingVertical";
import { ReactComponent as ICBookmark } from "../assets/ic-bookmark.svg";
import Marquee from "./Marquee";
import { useNavigate } from "react-router-dom";

const BookReviewItem = ({rate, image, title, isbn}) => {

    const navigate = useNavigate();

    return (
            <Container onClick={() => navigate(`/mypage/review/detail`, {state: isbn})}>
                <BookContainer>
                    <Bookmark>
                        <ICBookmark width={35} />
                    </Bookmark>
                    <StarRatingVertical rating={rate} size={'18px'} />
                    <Image src={image} />
                </BookContainer>
                <Marquee title={title} size={'15px'} color={'white'} />
            </Container>
    );
}


const TitleText = styled.text`
    position: relative;
    top: -10px;
    color: white;
    font-family: "KOTRA_BOLD";
    font-size: 16px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #CBCDFA;
    width: 180px;
    height: 230px;
    margin: 40px 30px;
    border-radius: 30px;
    box-shadow: 0px 2px 7px #00000022;
`;

const BookContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    left: -17px;
`

const Image = styled.img`
    background-color: #ffffff;
    position: relative;
    width: 130px;
    height: 200px;
    top: -15px;
`;

const Bookmark = styled.div`
    position: relative;
    top: -20px;
    left: -10px;
`

export default BookReviewItem;