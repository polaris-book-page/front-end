import styled from "styled-components";
import StarInput from "./StarInput";

const MoveStarRating = ({ onRate, rate }) => {

    const handleClickRating = (value) => {
        onRate(value)
    }

    return (
        <StarRatingContainer>
            <StarRatingBox>
                <StarRatingBox>
                {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5].map((value) => (
                    <StarInput
                        key={value}
                        value={value}
                        ishalf={value % 1 !== 0}
                        onClickRating={handleClickRating}
                        checked={rate==value}
                    />
                ))}
                </StarRatingBox>
            </StarRatingBox>
            <ContentText color={'white'} size={'12px'}>별점: {rate}</ContentText>
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