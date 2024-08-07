import { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import FooterBar from "../../component/FooterBar";
import GridBox from "../../component/GridBox";
import Pagination from "../../component/Pagination";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import NavBar from "../../component/NavBar";

const BooketListPage = () =>{
    const [currentPage, setcurrentPage] = useState(1)
    const [currentArray, setCurrentArray] = useState(0);
    const [totalPage, setTotalPage] = useState([]);
    const [slicePages, setSlicePages] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [startIndex, setStartIndex] = useState(1)
    const pagePerLimit = 20
    const pageArrayLimit = 5

    const queryClient = useQueryClient()
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['likeList'],
        queryFn: async () => {
            const response = await axios.get('/api/mypage/like/list', {
                withCredentials: true,
            })
            const userInfo = await queryClient.getQueryData(['check']);
            console.log("userindfo", userInfo)
            setCurrentUser(userInfo.nickname)
            return response.data;
        },
    });

    const handleUserLogin = async () => {
        try {
        const response = await axios.get('/api/mypage/like/list', {
            withCredentials: true,
        });
        queryClient.setQueryData(['likeList'], response.data);
        const userInfo = await queryClient.getQueryData(['check']);
        setCurrentUser(userInfo.nickname)        
        } catch (error) {
        console.error("Error fetching review data after login:", error);
        }
    };

    useEffect(() => {
        if (currentUser) {
            handleUserLogin();
        }
    }, [currentUser]); 

    useEffect(() => {
        const newTotalPage = [];
        const newSlicePages = [];
        const newItemSlice = [];
        if (data) {
            // set items put in 1page
            for (let i = 0; i < data.length; i += pagePerLimit) {
                newItemSlice.push(data.slice(i, i + pagePerLimit));
            }
            setItemsPerPage(newItemSlice)
            // calculate the total number of pages
            for (let i = 1; i <= Math.ceil(data.length / pagePerLimit); i++) {
                newTotalPage.push(i);
            }
            setTotalPage(newTotalPage);
            // divide per limitPage
            for (let i = 0; i < newTotalPage.length; i += pageArrayLimit) {
                newSlicePages.push(newTotalPage.slice(i, i + pageArrayLimit));
            }
            setSlicePages(newSlicePages);
            // console.log('newSlicePages: ', newSlicePages)
        }
    }, [data, currentUser]);

    useEffect(() => {
        // change page(ex 1, 2, 3, 4, 5)
        setCurrentItems(itemsPerPage[(currentPage - 1)])
        // if current page is 1, 6..., page array change
        if (currentPage % pageArrayLimit === 1) {
            setCurrentArray(Math.floor((currentPage - 1) / pageArrayLimit));
        }
    }, [currentPage, itemsPerPage, currentItems])
    
    if (!(data) || !(currentUser)) {
        return null;
    }

    if (isLoading) return <div>loading...</div>;
    if (error) return <div>ERROR</div>;
    
    const handlePageChange = (newCurrentArray, newCurrentPage) => {
        setCurrentArray(newCurrentArray);
        setcurrentPage(newCurrentPage);
    };

    return (
        <>
            <NavBar/>
            <Container>
            <ResultText>{currentUser}님의 북킷리스트({data.length})</ResultText>
            <MainContainer className="container">
                {currentItems && currentItems.map((item, index) => (
                    <GridBox key={index} item={item} gridArea={`gridBox${index % 10 + 1}`} />
                ))}
                {currentItems && <Pagination
                    slicePages={slicePages}
                    currentArray={currentArray}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />}
            </MainContainer>
            {!currentItems &&
                <ContentText>아직 담아둔 책이 없어요. 책을 탐험하러 떠나볼까요?</ContentText>
            }
            </Container>
        </>
    )
}

const Container = styled.div`
    padding: 0 5vw;
`

const MainContainer = styled.div`
    display: grid;
    justify-items: center;
    align-content: center; 
    @media screen and (min-width: 1201px) {
        grid-template-areas:
        "resultText resultText resultText resultText resultText"
        "gridBox1 gridBox2 gridBox3 gridBox4 gridBox5"
        "gridBox6 gridBox7 gridBox8 gridBox9 gridBox10"
        "gridBox11 gridBox12 gridBox13 gridBox14 gridBox15"
        "gridBox16 gridBox17 gridBox18 gridBox19 gridBox20"
        ". pagination pagination pagination .";
        grid-template-columns: repeat(5, 1fr);
    }

    @media screen and (max-width: 1200px) {
        grid-template-areas:
        "resultText resultText resultText resultText"
        "gridBox1 gridBox2 gridBox3 gridBox4"
        "gridBox5 gridBox6 gridBox7 gridBox8"
        "gridBox9 gridBox10 gridBox11 gridBox12"
        "gridBox13 gridBox14 gridBox15 gridBox16"
        "gridBox17 gridBox18 gridBox19 gridBox20"
        ". pagination pagination .";
        grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (max-width: 990px) {
        grid-template-areas:
        "resultText resultText"
        "gridBox1 gridBox2"
        "gridBox3 gridBox4"
        "gridBox5 gridBox6" 
        "gridBox7 gridBox8"
        "gridBox9 gridBox10" 
        "gridBox11 gridBox12"
        "gridBox13 gridBox14" 
        "gridBox15 gridBox16"
        "gridBox17 gridBox18" 
        "gridBox19 gridBox20"
        "pagination pagination";
        grid-template-columns: repeat(2, 1fr);
    }
`;

const ResultText = styled.div`
    margin: 20px 0;    
    grid-area: resultText;
    color: #4659A9;
    font-family: "KOTRA_BOLD";
    justify-self: start;
    @media screen and (min-width: 991px) {
        font-size: 30px;
    }
    @media screen and (max-width: 990px) {
        font-size: 24px;
    }
`;

const ContentText = styled.div`
    color: #4659A9;
    font-family: "KOTRA_GOTHIC";
    font-size: 15px;
`

export default BooketListPage;