import NavBar from "../../component/NavBar";
import styled, { css } from "styled-components";
import axios from 'axios';
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo, useState } from "react";
import NightSkyBackground from "../../component/NightSkyBackground";
import BookEvalItem from "../../component/BookEvalItem";
import { useNavigate } from "react-router-dom";

const RegisterEvaluatePage = () => {

    const maxResults = 42; // 최대 검색 아이템 수
    const [rate, setRate] = useState({});
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const updateEvaluate = async (rate) => {
        const bookValues = Object.values(rate);
        //console.log("bookValues: ", bookValues)

        const res = await axios.post('/api/user/initial-evaluation', bookValues)
        const data = res.data;
        console.log("data:", data);

        return data;
    }

    const { mutate } = useMutation(['evaluate-update'], {
        mutationFn: () => updateEvaluate(rate), 
        onError: (error, variable, rollback) => {
            if (rollback) rollback();
            else console.log(error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['review-list']);
            navigate('/main/')
        },
    })

        // category func
    const categorySlicingFunc = ( category ) => {
        const categoryList = category.split('>')
        return categoryList[1];
    }

    // manage rate
    const handleRatingChange = (item, newRating) => {
        setRate((prevRatings) => ({
        ...prevRatings,
            [item.isbn13]: {
                "isbn13: ": item.isbn13,
                "evaluation": newRating,
                "title": item.title,
                "author": item.author,
                "publisher": item.publisher,
                "cover": item.cover,
                "category": categorySlicingFunc(item.categoryName),
                "categoryName": item.categoryName
            }
    }));
    }

    console.log("rate: ", Object.keys(rate).length)


    const fetchBestSellerFunc = async(start) => {
        try{
            const result = await axios.get(`/ttb/api/ItemList.aspx?ttbkey=${process.env.REACT_APP_TTBKEY}&Cover=Big&QueryType=Bestseller&MaxResults=${maxResults}&start=${start}&SearchTarget=Book&output=js&Version=20131101`);
            const data = result.data;
            
            return data.item;
        }
        catch (e){
            console.log(e);
        }
    }

    const {ref, inView} = useInView();

    useEffect(()=>{
        if(inView) fetchNextPage();
    }, [inView]);

    const {
        data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage
    } = useInfiniteQuery({
        queryKey:['evaluate-data'],
        queryFn: ({pageParam = 1}) => fetchBestSellerFunc(pageParam),
        select: (data) => ({
            pages: data?.pages,
            pageParams: data.pageParams,
        }),
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            
            return lastPage.length === 0 ? undefined : nextPage;
        }
    })

    const listItem = useMemo(() =>{
        if(data){
            const items = data.pages.reduce((acc, cur) => 
            acc.concat(cur), []
            )
            // shuffle

            return items;
        }
    }, [data])

    return (
        <>
            <NavBar/>
            <NightSkyBackground height={'calc(100vh - 100px)'} />
            <Background>
                <EvaluateContainer>
                    { (!isLoading && data) ? (
                        listItem.map((item, index) =>{
                            return <BookEvalItem key={index} item={item} rate={rate} handleRatingChange={handleRatingChange} />
                        })
                    ) : <ContentText color={'white'} size={'15px'}>로딩 중입니다...</ContentText>
                    }
                    {!isFetchingNextPage && <div ref={ref} />}
                </EvaluateContainer>
                <TextBox>
                    <TitleText color={'white'} size={'20px'}>책에 별점 남기기</TitleText> <br/>
                    <ContentText color={'white'}>이 별점을 기반으로 책을 추천해드립니다.</ContentText> <br />
                    <ContentText color={'white'}>그 전에 @닉네임@님의 취향을 알기 위한 5개 이상의 별점이 먼저 필요해요.</ContentText> <br />
                    <ContentText color={'white'}>하지만 5권 이상의 별점을 남기기 어려우시면 평소에 읽고 싶었던 책을 기준으로 평가하셔도 돼요!</ContentText> <br />
                    <ContentText color={'white'}>남기신 별점은 마이페이지의 '지금까지 남긴 별점' 부분에서 확인하실 수 있습니다.</ContentText> <br />
                    <div style={{height: '30px'}} />
                    <ButtonBox>
                        <Button select onClick={mutate} isEvaluate={Object.keys(rate).length >= 5 ? true : false}>완료!</Button>
                        {Object.keys(rate).length < 5 && <ContentText color={'white'}>5개 이상 별점을 등록해주세요.</ContentText>}
                    </ButtonBox>
                </TextBox>
            </Background>
        </>
    )
}

// text
const TitleText = styled.span`
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_BOLD";
    font-size: ${(props) => props.size || '12px'};
`;

const ContentText = styled.span`
    color: ${(props) => props.color || 'gray'};
    font-family: "KOTRA_GOTHIC";
    font-size: ${(props) => props.size || '12px'};
`

// background
const Background = styled.div`
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    min-width: 50rem;
    height: calc(100vh - 100px);
    margin: auto;
    display: flex;
    align-items: center;
    padding: 20px 5%;
    gap: 2rem;
`;

// container
const EvaluateContainer = styled.div`
    display: grid;
    flex-grow: 2;
    grid-template-columns: 1fr 1fr 1fr;
    overflow-y: scroll;
    height: 70vh;
    gap: 30px;

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
const TextBox = styled.div`
    flex-grow: 1;
    text-align: center;
`;

const ButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// component
const Button = styled.button.attrs((props) => ({
    disabled: !props.isEvaluate
}))`
    border-radius: 20px;
    border: none;
    background: linear-gradient(#7B85B7, #4659A9);
    font-family: "KOTRA_GOTHIC";
    color: white;
    min-width: 250px;
    padding: 10px;
    width: 20rem;
    margin-bottom: 1rem;
    
    ${({isEvaluate}) =>
        !isEvaluate &&
        css`
            background: linear-gradient(#B7B5B5, #6E6F8B);
    `}
`;

export default RegisterEvaluatePage;