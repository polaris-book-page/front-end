import styled from "styled-components";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from 'axios'; // axios import 추가
import { useMutation, useQueryClient } from '@tanstack/react-query';

const LikeIcon = ({ item, onModalOpen }) => {
	const [isChecked, setIsChecked] = useState(false);
	const [currUser, setCurrUser] = useState('');
    const queryClient = useQueryClient()
    console.log("!!!!!!!!!!!!!!", item)

    const { mutate } = useMutation({
        mutationFn: async (isbn) => {
            // console.log(isbn)
            const response = await axios.post('http://localhost:3001/mypage/check/like', { isbn }, { withCredentials: true });
            return response.data.is_liked;
        }, 
        onSuccess: (data) => {
            console.log(data)
            setIsChecked(data);
        },
        onError: (error) => {
            console.error('check liked:', error);
        }
    });

    const addlike = useMutation({
        mutationFn: async (isbn) => {
            const response = await axios.post('http://localhost:3001/mypage/like', { isbn }, { withCredentials: true });
            return response;
        }, 
        onSuccess: (data) => {
            console.log(data)
            setIsChecked(true);
        },
        onError: (error) => {
            console.error('add like list:', error);
        }
    });

    const dellike = useMutation({
        mutationFn: async (isbn) => {
            const response = await axios.delete('http://localhost:3001/mypage/unlike', { data:{ isbn: isbn, userId: currUser }}, { withCredentials: true });
            if (item.title.length < 15) {
                alert(item.title + "에 대한 좋아요를 취소하시겠습니까?")
            } else {
                alert(item.title.substr(0, 15) + "...에 대한 좋아요를 취소하시겠습니까?")
            }
            return response;
        }, 
        onSuccess: (data) => {
            setIsChecked(false);
        },
        onError: (error) => {
            console.error('del like list:', error);
        }
    });

    const onClick = () => {
        const initialData = queryClient.getQueryData(['check']);
        console.log("initialData: ", initialData.userId)
        setCurrUser(initialData.userId)
        if (!initialData.is_logined) {
            onModalOpen();
        } else {
            if (!isChecked) {
                if (item.isbn13) {
                    addlike.mutate(item.isbn13);
                } else if (item.isbn) {
                    addlike.mutate(item.isbn);
                } 
            } else if (isChecked) {
                if (item.isbn13) {
                    dellike.mutate(item.isbn13);
                } else if (item.isbn) {
                    dellike.mutate(item.isbn);
                } 
            }
        }
    };

    useEffect(() => {
        if (item.isbn13) {
            mutate(item.isbn13);
        } else if (item.isbn) {
            mutate(item.isbn);
        } 
    }, [item]);

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