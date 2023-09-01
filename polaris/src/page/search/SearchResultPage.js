import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import styled from "styled-components";
import NavBar from "../../component/NavBar";
import FooterBar from "../../component/FooterBar";
import { IoSearch } from "react-icons/io5";
import GridBox from "../../component/GridBox";
import Pagination from "../../component/Pagination";
import { bookOptions, bookOptionsSelect, categoryOptions, categoryKeys, orderOptions, orderOptionsSelect } from "../../component/optionsData"; 
import FilterDropdown from "../../component/FilterDropdown";

const SearchResultPage = () => {
    const [currentPage, setcurrentPage] = useState(1)
    const [currentArray, setCurrentArray] = useState(0);
    const [totalPage, setTotalPage] = useState([]);
    const [slicePages, setSlicePages] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const pagePerLimit = 10
    const pageArrayLimit = 5
    const maxResults = 50
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const [categories, setCategories] = useState([]);
    const [order, setOrder] = useState('정확도순');
    const [bookType, setBookType] = useState('종이책');
    
    const searchResultFunc = async () => {
        setLoading(true);
        try {
            // const result = await axios.get(query);
            console.log("before api: ", categoryOptions[categories])
            const result = await axios.get(`ttb/api/ItemSearch.aspx?ttbkey=${process.env.REACT_APP_TTBKEY}&Query=물고기
            &Cover=Big&QueryType=Title&MaxResults=${maxResults}&Sort=${orderOptionsSelect[orderOptions.indexOf(order)]}&start=${currentArray + 1}&SearchTarget=${bookOptionsSelect[bookOptions.indexOf(bookType)]}&CategoryId=${categoryOptions[categories]}&output=js&Version=20131101`);
            console.log(result.data)
            setData(result.data);
            // divide books to show 10 per page
            const newItemSlice = [];
            for (let i = 0; i < maxResults; i += pagePerLimit) {
                newItemSlice.push(result.data.item.slice(i, i + pagePerLimit));
            }
            setItemsPerPage(newItemSlice)
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    const prevBookTypeRef = useRef(bookType);
    const prevOrderRef = useRef(order);

    useEffect(() => {
        // var query = `ttb/api/ItemSearch.aspx?ttbkey=${process.env.REACT_APP_TTBKEY}&Query=물고기&Cover=Big&QueryType=Title&MaxResults=${maxResults}&Sort=${orderOptionsSelect[orderOptions.indexOf(order)]}&start=${currentArray + 1}&SearchTarget=${bookOptionsSelect[bookOptions.indexOf(bookType)]}&output=js&Version=20131101`
        // if (orderOptionsSelect[orderOptions.indexOf(order)] !== orderOptionsSelect[0]){
        //     query += `&Sort=${orderOptionsSelect[orderOptions.indexOf(order)]}`
        // }
        // if (bookOptionsSelect[bookOptions.indexOf(bookType)] !== bookOptionsSelect[0]){
        //     query += `&SearchTarget=${bookOptionsSelect[bookOptions.indexOf(bookType)]}`
        // }
        // if (bookType === '종이책') {

        // } else if (bookType === '전자책'){

        // } else {

        // }
        // if (categoryOptions[categories] !== 0){
        //     query += `&CategoryId=${categoryOptions[categories]}`
        // }
        console.log("cate: ", categories)
        searchResultFunc();
        if (prevBookTypeRef.current !== bookType || prevOrderRef.current !== order) {
            setcurrentPage(1);
            setCurrentArray(0);
        }
        prevBookTypeRef.current = bookType;
        prevOrderRef.current = order;
    }, [currentArray, bookType, order, categories]);

    useEffect(() => {
        // change page(ex 1, 2, 3, 4, 5)
        setCurrentItems(itemsPerPage[(currentPage - 1) % 5])
        // if current page is 1, 6..., page array change
        if (currentPage % pageArrayLimit === 1) {
            setCurrentArray(Math.floor((currentPage - 1) / pageArrayLimit));
        }
    }, [currentPage, itemsPerPage, currentItems])

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
            for (let i = 0; i < totalPage.length; i += pageArrayLimit) {
                newSlicePages.push(totalPage.slice(i, i + pageArrayLimit));
            }
            setSlicePages(newSlicePages);
        }
    }, [data]);

    if (!(data && currentItems)) {
        return null;
    }
    
    const handlePageChange = (newCurrentArray, newCurrentPage) => {
        setCurrentArray(newCurrentArray);
        setcurrentPage(newCurrentPage);
    };

    const toggleActive1 = () => {
        setIsActive1(prevIsActive => !prevIsActive);
        setIsActive2(false);
        setIsActive3(false);
    };

    const toggleActive2 = () => {
        setIsActive1(false);
        setIsActive2(prevIsActive => !prevIsActive);
        setIsActive3(false);
    };

    const toggleActive3 = () => {
        setIsActive1(false);
        setIsActive2(false);
        setIsActive3(prevIsActive => !prevIsActive);
    };

    const handleBookTypeChange = (bookType) => {
        setBookType(bookType);
        console.log(bookOptionsSelect[bookOptions.indexOf(bookType)])
    };
    
    const handleOrderChange = (order) => {
        setOrder(order);
        console.log(orderOptionsSelect[orderOptions.indexOf(order)])
    };
    
    const handleCategoryChange = (categories) => {
        setCategories(categories);
        console.log("categoryOptions: ", categoryOptions[categories])
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
                    <FilterContainer>
                        <FilterDropdown 
                            isActive={isActive3}
                            setIsActive={toggleActive3}
                            options={categoryKeys}
                            setOptions={handleCategoryChange}
                        />
                        <FilterDropdown 
                            isActive={isActive2}
                            setIsActive={toggleActive2}
                            options={orderOptions}
                            setOptions={handleOrderChange}
                            //가격순은 옵션에 없음 
                        />
                    </FilterContainer>
                    {currentItems && currentItems.map((item, index) => (
                        <GridBox key={index} item={item} gridArea={`gridBox${index % 10 + 1}`} />
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

const FilterContainer = styled.div`
    grid-area: resultFilter;
    display: flex;
`

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



export default SearchResultPage;