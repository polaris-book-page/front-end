import styled from "styled-components";
import { useState } from "react";
import StarInput from "./StarInput";

const MoveStarRating = () => {
    
    const [rating, setRating] = useState(0)

    const handleClickRating = (value) => {
        setRating(value)
    }

    return (
        <StarRatingContainer>
            <StarRatingBox>
                <StarInput
                    onClickRating={() => handleClickRating(5)}
                    value={5}
                    ishalf={false}
                />
                <StarInput
                    onClickRating={() => handleClickRating(4.5)}
                    value={4.5}
                    ishalf={true}
                />
                <StarInput
                    onClickRating={() => handleClickRating(4)}
                    value={4}
                    ishalf={false}
                />
                <StarInput
                    onClickRating={() => handleClickRating(3.5)}
                    value={3.5}
                    ishalf={true}
                />
                <StarInput
                    onClickRating={() => handleClickRating(3)}
                    value={3}
                    ishalf={false}
                />
                <StarInput
                    onClickRating={() => handleClickRating(2.5)}
                    value={2.5}
                    ishalf={true}
                />
                <StarInput
                    onClickRating={() => handleClickRating(2)}
                    value={2}
                    ishalf={false}
                />
                <StarInput
                    onClickRating={() => handleClickRating(1.5)}
                    value={1.5}
                    ishalf={true}
                />
                <StarInput
                    onClickRating={() => handleClickRating(1)}
                    value={1}
                    ishalf={false}
                />
                <StarInput
                    onClickRating={() => handleClickRating(0.5)}
                    value={0.5}
                    ishalf={true}
                />
            </StarRatingBox>
            <ContentText color={'white'} size={'12px'}>별점: {rating}</ContentText>
        </StarRatingContainer>
    )
}

const ContentText = styled.span`
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_GOTHIC";
    font-size: ${(props) => props.size || '12px'};
`

const StarRatingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StarRatingBox = styled.fieldset`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    border: none;
    transform: translateY(2px);

    input:checked ~ label,
    labeL:hover,
    labeL:hover ~ label {
        transition: 0.2s;
        color: #4659A9;
    }
`;

export default MoveStarRating;