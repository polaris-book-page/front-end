import styled from "styled-components";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const LikeIcon = () => {
	const [isChecked, setIsChecked] = useState(false);
    const onClick = () => {
        if (isChecked) {
            setIsChecked(false);
        } else {
            setIsChecked(true);
        }
    };
	return (
		<Icon>
			<svg width="0" height="0">
				<linearGradient id="gradient" x1="100%" y1="0%" x2="100%" y2="100%">
					<stop stopColor="#6F61C6" offset="0%" />
					<stop stopColor="#97A4E8" offset="100%" />
				</linearGradient>
			</svg>
			{isChecked ? (
				<HeartFilledIcon size={45} onClick={onClick} />
			) : ( 
				<HeartOutlinedIcon size={45} onClick={onClick} />
			)}
		</Icon>
	)
}


const Icon = styled.div`
    margin-left: auto;
    margin-right: 25px;
    
`;

const HeartFilledIcon = styled(AiFillHeart)`
    fill: url(#gradient);
    cursor: pointer;
    transition: transform 300ms ease;
    &:hover {
        transform: scale(1.1);
    }
`;

const HeartOutlinedIcon = styled(AiOutlineHeart)`
    color: #6F61C6;
    cursor: pointer;
    transition: transform 300ms ease;
    &:hover {
        transform: scale(1.1);
    }
`;

export default LikeIcon;