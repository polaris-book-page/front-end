import styled, { css } from "styled-components";
import { FaStar, FaStarHalf } from "react-icons/fa";

const StarInputVertical = ({ onClickRating, value, ishalf, name, checked }) => {

    const handleClickRatingInput = (value) => {
        onClickRating(value);
    };

    return (
        <>
            <Input type="radio" name={name} id={`star${value}`} value={value} checked={checked} />
            <Label
                onClick={handleClickRatingInput}
                ishalf={ishalf}
                htmlFor={`star${value}`}
            >
                {ishalf ? <FaStarHalf /> : <FaStar />}
            </Label>
        </>
    )
}

const Input = styled.input`
    display: none;
`;

const Label = styled.label`
    cursor: pointer;
    font-size: 1.5rem;
    color: lightgray;

    ${({ ishalf }) =>
    ishalf &&
        css`
        position: absolute;
        width: 12px;
        overflow: hidden;

        &:nth-of-type(10) {
            transform: translate(-108px);
        }
        &:nth-of-type(8) {
            transform: translate(-84px);
        }
        &:nth-of-type(6) {
            transform: translate(-60px);
        }
        &:nth-of-type(4) {
            transform: translate(-36px);
        }
        &:nth-of-type(2) {
            transform: translate(-12px);
        }
    `}
`;

export default StarInputVertical;