import styled from "styled-components";
import StarRatingVertical from "./StarRatingVertical";
import { ReactComponent as ICBookmark } from "../assets/ic-bookmark.svg";
import Marquee from "./Marquee";
import { useNavigate, useLocation } from "react-router-dom";
import MoveStarRatingVertical from "./MoveStarRatingVertical";

const BookEvalItem = ({ item, rate, handleRatingChange }) => {
    

    return (
            <Container>
                <BookContainer>
                    <Bookmark>
                        <ICBookmark width={40} />
                    </Bookmark>
                <MoveStarRatingVertical key={item.isbn13} isbn={item.isbn13} rate={rate} item={item} onRatingChange={handleRatingChange}/>
                    <Image src={item.bookImage || item.cover} />
                </BookContainer>
                <Marquee title={item.title} size={'15px'} color={'white'} />
            </Container>
    );
}

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
    left: -10px;
`

export default BookEvalItem;