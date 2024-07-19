import styled from "styled-components";
import { useState, useEffect } from "react";
import StarInput from "./StarInput";

const MoveStarRatingVertical = () => {

    const [rate, onRate] = useState(0);

    useEffect(() =>{
        handleClickRating(rate)
    },[])

    const handleClickRating = (value) => {
        onRate(value)
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
        </StarRatingContainer>
    )
}

const StarRatingContainer = styled.div`
    position: relative;
    z-index: 1;
    top: 70px;
    right: 34px;
    width: 0px;
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
    -ms-transform: rotate(270deg); /* IE 9 */
    -webkit-transform: rotate(270deg); /* Chrome, Safari, Opera */
    transform: rotate(270deg);

    input:checked ~ label,
    labeL:hover,
    labeL:hover ~ label {
        transition: 0.2s;
        color: #4659A9;
    }
`;

export default MoveStarRatingVertical;