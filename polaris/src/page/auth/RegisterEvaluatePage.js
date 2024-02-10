import NavBar from "../../component/NavBar";
import styled from "styled-components";
import BookReviewItem from "../../component/BookReviewItem";
import axios from 'axios';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from "react";

const RegisterEvaluatePage = () => {

    const maxResults = 12;

    const fetchBestSellerFunc = async(start) => {
        try{
            const result = await axios.get(`/ttb/api/ItemList.aspx?ttbkey=${process.env.REACT_APP_TTBKEY}&Cover=Big&QueryType=Bestseller&MaxResults=${maxResults}&start=${start}&SearchTarget=Book&output=js&Version=20131101`);
            const data = result.data;
            
            //console.log(data.item);
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
        queryFn: (pageParam = 1) => fetchBestSellerFunc(pageParam),
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
        //console.log(data.pages);
        if(data){
            const items = data.pages.reduce((acc, cur) => 
            acc.concat(cur), []
            )
            //console.log(items);
            return items;
        }
    }, [data])

    console.log(data)

    return (
        <>
            <NavBar/>
            <Background>
                <TextBox>
                    <TitleText color={'white'} size={'20px'}>책에 별점 남기기</TitleText> <br/>
                    <ContentText color={'white'}>이 별점을 기반으로 책을 추천해드립니다.</ContentText> <br />
                    <ContentText color={'white'}>그 전에 @닉네임@님의 취향을 알기 위한 5개 이상의 별점이 먼저 필요해요.</ContentText> <br />
                    <ContentText color={'white'}>하지만 5권 이상의 별점을 남기기 어려우시면 평소에 읽고 싶었던 책을 기준으로 평가하셔도 돼요!</ContentText> <br />
                    <ContentText color={'white'}>남기신 별점은 마이페이지의 '지금까지 남긴 별점' 부분에서 확인하실 수 있습니다.</ContentText> <br />
                </TextBox>
                <EvaluateContainer>
                    { (!isLoading && data) ? (
                        listItem.map((item, index) =>{
                            return <BookReviewItem key={index} rate={3.5} image={item.cover} title={item.title} />
                        })
                    ) : <ContentText color={'white'} size={'15px'}>로딩 중입니다...</ContentText>
                    }
                    {!isFetchingNextPage && <div ref={ref} />}
                </EvaluateContainer> 
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
    position: flex;
    justify-content: center;
    height: 90vh;
    background-color: #4659a9;
    padding: 20px 5%;
    overflow: none;
`;

// container
const EvaluateContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    overflow-y: scroll;
    height: 70vh;

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
    text-align: center;
`;

export default RegisterEvaluatePage;