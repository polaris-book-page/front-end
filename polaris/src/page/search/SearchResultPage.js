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
import { useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';

const SearchResultPage = () => {
    const [currentPage, setcurrentPage] = useState(1)
    const [currentArray, setCurrentArray] = useState(0);
    const [totalPage, setTotalPage] = useState([]);
    const [slicePages, setSlicePages] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [startIndex, setStartIndex] = useState(1)
    const pagePerLimit = 20
    const pageArrayLimit = 5
    const maxResults = 40
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const [categories, setCategories] = useState('');
    const [order, setOrder] = useState('정확도순');
    const [bookType, setBookType] = useState('종이책');
    const [searchText, setSearchText] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const searchResultFunc = async () => {
        setLoading(true);
        try {
            const result = await axios.get(`ttb/api/ItemSearch.aspx?ttbkey=${process.env.REACT_APP_TTBKEY}&Query=${searchText}
            &Cover=Big&QueryType=Title&MaxResults=${maxResults}&Sort=${orderOptionsSelect[orderOptions.indexOf(order)]}&start=${startIndex}
            &SearchTarget=${bookOptionsSelect[bookOptions.indexOf(bookType)]}&CategoryId=${categoryOptions[categories]}&output=js&Version=20131101`);
            console.log(result.data)
            setData(result.data);
            console.log('searchtext', searchText)
            if (data) {
                mutate({ books: result.data.item });
            }
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

    const { mutate } = useMutation({
        mutationFn: async (bookInfo) => {
            console.log("bookInfo", bookInfo)
            const { data } = await axios.post(`/api/search/result/save`, bookInfo, { withCredentials: true })
            return data;
        }, 
        onSuccess: (data) => {
            console.log("book save success")
        },
        onError: () => {
            console.log("book save failure")
        }
    });

    const prevBookTypeRef = useRef(bookType);
    const prevOrderRef = useRef(order);
    const searchQuery = searchParams.get("query");

    useEffect(() => {
        setSearchText(searchParams.get("query"));
    }, [searchQuery])

    useEffect(() => {
        if (searchText) {
            searchResultFunc();
            if (prevBookTypeRef.current !== bookType || prevOrderRef.current !== order) {
                setcurrentPage(1);
                setCurrentArray(0);
            }
            prevBookTypeRef.current = bookType;
            prevOrderRef.current = order;
        }
    }, [startIndex, bookType, order, categories, searchText]);

    useEffect(() => {
        // change page(ex 1, 2, 3, 4, 5)
        setCurrentItems(itemsPerPage[(currentPage - 1) % 2])
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
            for (let i = 0; i < newTotalPage.length; i += pageArrayLimit) {
                newSlicePages.push(newTotalPage.slice(i, i + pageArrayLimit));
            }
            setSlicePages(newSlicePages);
        }
    }, [data, categories]);

    if (!(data && currentItems)) {
        return null;
    }
    
    const handlePageChange = (newCurrentArray, newCurrentPage) => {
        setCurrentArray(newCurrentArray);
        setcurrentPage(newCurrentPage);
        if (newCurrentPage % 2 === 0) {
            setStartIndex(newCurrentPage / 2)
        } else {
            setStartIndex(Math.floor(newCurrentPage / 2) + 1)
        }
    };

    const toggleActive2 = () => {
        setIsActive2(prevIsActive => !prevIsActive);
        setIsActive3(false);
    };

    const toggleActive3 = () => {
        setIsActive2(false);
        setIsActive3(prevIsActive => !prevIsActive);
    };
    
    const handleOrderChange = (order) => {
        setOrder(order);
        console.log(orderOptionsSelect[orderOptions.indexOf(order)])
    };
    
    const handleCategoryChange = (categories) => {
        setCategories(categories);
        console.log("categoryOptions: ", categoryOptions[categories])
    };

    const handleSearchText = (e) => {
        const currentText = e.currentTarget.parentNode.children[0].value;
        searchParams.set("query", currentText)
        setSearchParams(searchParams);
		setSearchText(currentText)
	}
    
    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            const currentText = e.currentTarget.parentNode.children[0].value;
            searchParams.set("query", currentText)
            setSearchParams(searchParams);
            setSearchText(currentText)
        }
    };
    
    const navigateAddBook = () => {
        navigate('/search/add')
    }
    return (
        <>
            <NavBar/>
            <MainContainer>
            <BookContainer className="container">
            <SearchBox>
                <SearchInput className='searchInput' placeholder={searchText} onKeyDown={handleOnKeyPress}/>
                <SearchBtn className='butn' size="54" onClick={handleSearchText}/>
            </SearchBox>
                <ResultText>&lsquo;{data.query}&rsquo;에 대한 검색 결과({data.totalResults})</ResultText>
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
            </BookContainer>
            <TextContainer className='textfield'>
                <HaveBookText>찾으시는 책이 없으신가요?</HaveBookText>
                <AddBookText onClick={navigateAddBook}>+ 책 추가하기</AddBookText>
            </TextContainer>
            </MainContainer>
            <FooterBar/>
        </>
    )
}

const FilterContainer = styled.div`
    grid-area: resultFilter;
    display: flex;
    justify-self: end;
    margin-right: 20px;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
`;

const BookContainer = styled.div`
    display: grid;
    justify-items: center;
    align-content: center; 
    grid-template-areas:
    "searchBox searchBox searchBox searchBox searchBox"
    "resultText resultText resultText resultFilter resultFilter"
    "gridBox1 gridBox2 gridBox3 gridBox4 gridBox5"
    "gridBox6 gridBox7 gridBox8 gridBox9 gridBox10"
    "gridBox11 gridBox12 gridBox13 gridBox14 gridBox15"
    "gridBox16 gridBox17 gridBox18 gridBox19 gridBox20"
    ". pagination pagination pagination .";
    grid-template-columns: repeat(5, 1fr);
`;

const SearchBox = styled.div`
    display: flex;
    grid-area: searchBox;
    width: 730px;
    height: 85px;
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
    font-size: 32px;
`;

const SearchBtn = styled(IoSearch)`
    fill: #4659A9;
    margin: 0 25px;
`;

const ResultText = styled.div`
    grid-area: resultText;
    color: #4659A9;
    font-size: 30px;
    font-family: "KOTRA_BOLD";
    justify-self: start;
    margin-left: 20px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    margin-top: 60px;
    margin-bottom: 100px;
    padding: 50px;
    border-radius: 30px;
`;

const HaveBookText = styled.p`
    font-size: 30px;
    width: 359px;
    color: #B7B5B5;
    font-family: "KOTRA_BOLD";
`;

const AddBookText = styled.p`
    font-size: 30px;
    width: 196px;
    color: #4659A9;
    font-family: "KOTRA_BOLD";
    border-bottom : 3px solid #4659A9;
    margin-top: 10px;
    &:hover {
        cursor: default;
    }
`;

export default SearchResultPage;