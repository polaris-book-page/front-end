import { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import NavBar from "../../component/NavBar";
import FooterBar from "../../component/FooterBar";
import { IoSearch } from "react-icons/io5";
import GridBox from "../../component/GridBox";
import Pagination from "../../component/Pagination";

const SearchResultPage = () => {
    const [currentPage, setcurrentPage] = useState(1)
    const [currentArray, setCurrentArray] = useState(0);
    const [totalPage, setTotalPage] = useState([]);
    const [slicePages, setSlicePages] = useState([]);
    const pagePerLimit = 10
    const pageArrayLimit = 5
    
    // 책 데이터 db에 저장
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const searchResultFunc = async () => {
        setLoading(true);
        try {
            const result = await axios.get(`ttb/api/ItemSearch.aspx?ttbkey=${process.env.REACT_APP_TTBKEY}&Query=모순&QueryType=Title&MaxResults=10&start=${currentPage}&SearchTarget=Book&output=js&Version=20131101`);
            console.log(result.data)
            setData(result.data);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        searchResultFunc();
    }, [currentPage]);

    useEffect(() => {
        if (data) {
            // calculate the total number of pages
            const newTotalPage = [];
            for (let i = 1; i <= Math.ceil(data.totalResults / pagePerLimit); i++) {
                newTotalPage.push(i);
            }
            setTotalPage(newTotalPage);
            // divide per limitPage
            const newSlicePages = [];
            for (let i = 0; i < newTotalPage.length; i += pageArrayLimit) {
                newSlicePages.push(newTotalPage.slice(i, i + pageArrayLimit));
            }
            setSlicePages(newSlicePages);
            // when press <, > button, change page array
            if (currentPage % pageArrayLimit === 1) {
                setCurrentArray(Math.floor((currentPage - 1) / pageArrayLimit));
            } else if (currentPage % pageArrayLimit === 0) {
                setCurrentArray(currentPage / pageArrayLimit - 1);
            }
        }
    }, [currentPage, data]);

    if (!data) {
        return null;
    }
    const handlePageChange = (newCurrentArray, newCurrentPage) => {
        setCurrentArray(newCurrentArray);
        setcurrentPage(newCurrentPage);
    };

    return (
        <>
            <NavBar/>
                <MainContainer className="container">
                    <SearchBox>
                        <SearchInput placeholder="책 이름을 입력해주세요."/>
                        <SearchBtn size="54"/>
                    </SearchBox>
                    <ResultText>'{data.query}'에 대한 검색 결과({data.totalResults})</ResultText>
                    
                    <ResultFilter></ResultFilter>
                    {data.item.map((item, index) => (
                        <GridBox key={index} item={item} gridArea={`gridBox${index + 1}`} />
                    ))}
                    <Pagination
                        slicePages={slicePages}
                        currentArray={currentArray}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </MainContainer>
            <FooterBar/>
        </>
    )
}

const MainContainer = styled.div`
    width: 100%;
    display: grid;
    justify-items: center;
    align-content: center; 
    grid-template-areas:
        "searchBox searchBox searchBox searchBox searchBox"
        "resultText resultText resultText resultFilter resultFilter"
        "gridBox1 gridBox2 gridBox3 gridBox4 gridBox5"
        "gridBox6 gridBox7 gridBox8 gridBox9 gridBox10"
        ". pagination pagination pagination .";
    grid-template-columns: repeat(5, 1fr);
`;

const SearchBox = styled.div`
    display: flex;
    grid-area: searchBox;
    width: 781px;
    height: 93px;
    border-radius: 50px;
    border: 4px solid #4659A9;
    align-items: center;
    margin: 60px;
`;

const SearchInput = styled.input`
    border: transparent;
    outline: none;
    margin-left:40px;
    width: 100%;
    height: 90%;
    font-size: 35px;
`;

const SearchBtn = styled(IoSearch)`
    fill: #4659A9;
    margin: 0 25px;
`;

const ResultText = styled.div`
    grid-area: resultText;
    color: #4659A9;
    font-size: 36px;
    font-family: "KOTRA_BOLD";
    justify-self: start;
`;

const ResultFilter = styled.div`
    grid-area: resultFilter;
`;

export default SearchResultPage;