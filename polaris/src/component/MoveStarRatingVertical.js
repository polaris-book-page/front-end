import styled from "styled-components";
import StarInput from "./StarInput";

const MoveStarRatingVertical = ({ item, rate, isbn, onRatingChange }) => {

    return (
        <StarRatingContainer>
            <StarRatingBox>
            {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5].map((value) => (
                <StarInput
                    key={value}
                    name={isbn}
                    onClickRating={() => onRatingChange(item, value)}
                    value={value}
                    ishalf={value % 1 !== 0}
                    checked={rate[isbn] && rate[isbn].evaluation === value}
                />
            ))}
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