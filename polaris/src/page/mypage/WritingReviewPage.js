import styled, { css } from "styled-components";
import StarRating from "../../component/StarRating";
import NavBar from "../../component/NavBar";
import { useState, useRef, useEffect, useCallback } from "react";
import CustomDatePicker from "../../component/CustomDatePicker";
import useDetectClose from "../../component/hook/useDetectClose";
import MoveStarRating from "../../component/MoveStarRating";
import NightSkyBackground from "../../component/NightSkyBackground";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const WritingReviewPage = () => {
    const [select, setSelect] = useState('1');
    const [quotes, setQuotes] = useState([{
        id: 0,
        quote: "",
        page: 0
    }]);
    const quoteIdNxt = useRef(1);
    const navigate = useNavigate();
    
    const dropDownRef = useRef(null);
    const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false)
    const [selPlanet, setSelPlanet] = useState(null)
    const [content, onContent] = useState('');
    const [rate, onRate] = useState(5);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(Date());
    const queryClient = useQueryClient()
    const [iswrited, setIsWrited] = useState(false);

    const date = new Date();

    const {state} = useLocation();
    

    const plenetImgArr = [require('../../assets/graphic/planet-1.png'), require('../../assets/graphic/planet-2.png'), require('../../assets/graphic/planet-3.png'), require('../../assets/graphic/planet-5.png'), require('../../assets/graphic/planet-6.png'), require('../../assets/graphic/planet-7.png'), require('../../assets/graphic/planet-8.png'), require('../../assets/graphic/planet-9.png'), require('../../assets/graphic/planet-10.png')]
    
    // radio func
    const selectRadioFunc = (e) => {
        setSelect(e.target.value)
    }

    // quote func
    const quoteList = () => {
            const quotesItem = quotes.map((item, index) => {
                return(
                    <>
                        <QuoteInputBox key={index}>
                            <QuoteInput name={index} style={{flex: 0.8}} defaultValue={item.quote} placeholder={'인용구를 작성하세요.'} onChange={handleQuote} />
                            <QuotePageInput name={index} style={{flex: 0.2}} defaultValue={item.page} onChange={handleQuotePage} />
                        </QuoteInputBox>
                    </>
            )})
            return quotesItem;
        }
        
    const inputQuoteFunc = () => {
        const quote = {
            id: quoteIdNxt.current,
            quote: "",
            page: 0
        }
        setQuotes(quotes.concat(quote));
        quoteIdNxt.current++;
    }

    const deleteQuoteFunc = () => {
        if(quotes.length == 0) return  
        setQuotes(quotes.slice(0, quoteIdNxt.current - 1));
        quoteIdNxt.current--;
    }

    const handleQuote = (e) => {
        quotes.map((item, index) => {
            if (item.id == e.target.name) {
                const temp = quotes
                temp[e.target.name].quote = e.target.value
                setQuotes(temp);
                console.log("temp: ", temp);
                return;
            }
        })
    }

    const handleQuotePage = (e) => {
        quotes.map((item, index) => {
            if (item.id == e.target.name) {
                const temp = quotes
                temp[e.target.name].page = parseInt(e.target.value);
                setQuotes(temp);
                console.log("temp: ", temp);
                return;
            }
        })
    }

    const fetchIsWriteReview  = async () => {
        try{
            // check user
            await queryClient.refetchQueries(["check"]);
            const UserAuthInfoCheck = queryClient.getQueryData(["check"]);

            // connect api
            const res = await axios.get(`/api/mypage/iswrited/review/${UserAuthInfoCheck.userId}/${state.isbn13}`)
            const data = res.data
            console.log(queryClient.userId, data.iswrited);
                        setIsWrited(data.iswrited);

            return data.iswrited;
            
        }catch(err){
            console.log(err);
        }
    }

    const fetchEditReview = async () => {
        const reviewId = queries[1].data.reviewId;

        // set form data
        const formData = new FormData();
        formData.append('dir', 'planetImg');
        if(selPlanet !== ''){
            const blob = b64toBlob(selPlanet);
            formData.append('planetImage', blob);
        }
        formData.append('_id', reviewId);
        formData.append('evaluation', rate);
        formData.append('content', content);
        formData.append('type', selectTypeFunc());
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);

        // delete null quote
        let filterQuotes = quotes.filter((item) => item.quote !== "")
        console.log(filterQuotes)
        if(filterQuotes.length !=0) formData.append('quotes', JSON.stringify(filterQuotes));

        try{
            const res = await axios.put(`/api/mypage/review/modify`, formData, {
                headers: {
                    "Content-Type": `multipart/form-data`,
                },
            })
            const data = res.data;
            console.log(data);
            
            return data;
        } catch(err){
            console.log(err);
        }
    }

    // radio func
    const selectTypeFunc = () => {
        if(select == 1) return '종이책';
        else return '전자책';
    }

    // category func
    const categorySlicingFunc = () => {
        const categoryList = state.categoryName.split('>')
        console.log("categoryList: ", categoryList);
        return categoryList[1];
    }

    // bas64 to blob
    const b64toBlob =(b64Data, sliceSize = 512) => {
        const image_data = atob(b64Data.split(',')[1]);
    
        const arraybuffer = new ArrayBuffer(image_data.length);
        const view = new Uint8Array(arraybuffer);
    
        for (let i = 0; i < image_data.length; i++) {
        view[i] = image_data.charCodeAt(i) & 0xff;
        }
    
        return new Blob([arraybuffer], { type: 'image/png' });
    }

    const fetchAddReview = async () => {

        queryClient.refetchQueries(["check"]);
        const userAuthInfoCheck = queryClient.getQueryData(["check"]);
        const formData = new FormData();
        if(selPlanet !== ''){
            const blob = b64toBlob(selPlanet);
            formData.append('planetImage', blob);
        } else formData.append('planetImage', null);

        // set form data
        formData.append('dir', 'planetImg');
        formData.append('userId', userAuthInfoCheck.userId);
        formData.append('isbn', state.isbn13);
        formData.append('evaluation', rate);
        formData.append('content', content);
        formData.append('progressPage', state.subInfo.itemPage);
        formData.append('progressPercent', 100);
        formData.append('category', categorySlicingFunc());
        formData.append('type', selectTypeFunc());
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);

        let filterQuotes = quotes.filter((item) => item.quote !== "")
        console.log(filterQuotes)
        if(filterQuotes.length !=0) formData.append('quotes', JSON.stringify(filterQuotes));

        console.log(state.isbn13);

        try{
            const res = axios.post(`/api/mypage/review/add`,  formData, {
                headers: {
                    "Content-Type": `multipart/form-data`,
                },
            });
            const data = res.data;
            
            return data;
        } catch(err){
            console.log(err);
        }
    }

    const fetchOneReview = async () => {
        try{
            const res = await axios.get(`/api/book/info/review/${state.isbn13}`)
            const data = res.data;

            if(iswrited){
                onRate(data.evaluation)
                onContent(data.content);
                setSelPlanet(state.planetImage)
                if (data.quotes) {
                    const updateQuotes = data.quotes.map((item, index) => {
                        return ({
                            id: quoteIdNxt.current++,
                            quote: item.quote,
                            page: item.page
                        });
                    }) 
                    console.log("updateQuotes", updateQuotes)
                    setQuotes(updateQuotes)
                }
            }

            return data;

        } catch(err){
            console.log(err);
        }
    }

    // handle textarea size
    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    }, []);

    // send a review
    const handleUploadReview = () => {
        if(iswrited) {
            editReviewMutation.mutate();
            navigate('/mypage/');
        }
        else {
            addReviewMutation.mutate();
            navigate('/mypage/');
        }
    }

    // query
    const queries = useQueries({
        queries: [{
            queryKey: ['iswrite-review'],
            queryFn: fetchIsWriteReview
        },{
            queryKey: ['one-review'],
            queryFn: fetchOneReview,
            enabled: iswrited,
            notifyOnChangeProps: ['data']
        }]
    })

    const editReviewMutation = useMutation({
        mutationFn: fetchEditReview,
        onSuccess: () => {
            console.log("update review success.")
        },
        onError: () => {
            console.log("update review failure.")
        }
    });

    const addReviewMutation = useMutation({
        mutationFn: fetchAddReview,
        onSuccess: () => {
            console.log("update profile success.")
        },
        onError: () => {
            console.log("update profile failure.")
        }
    });

    return (
        !queries[0].isLoading && (queries[0].data ? !queries[1].isFetching : true) && <>
            <NavBar/>
            <NightSkyBackground height={'90vh'} />
            <Container>
                {/* scroll */}
                <ScrollbarContainer>
                    <ContentContainer>
                    {/* book image */}
                    <BookImageBox>
                        <PlanetBox>
                            <BookImage>
                                <img src={state.cover} style={{ width: 120, height: 200 }} />                            
                            </BookImage>
                            {/* select plenet image */}
                            <PlanetSelBox>
                                <PlenetList $isClicked={isOpen} >
                                    {plenetImgArr.map((item, index) => {
                                        return (<PlenetComponents src={item} key={index} onClick={(e) => {console.log(item); setSelPlanet(item)}} />)
                                    })}
                                </PlenetList>
                                <div style={{margin: 5}} />
                                {selPlanet == null ?
                                    <AddPlanet ref={dropDownRef} onClick={() => { setIsOpen(!isOpen) }}>
                                        <TitleText color={'#4659A9'} size={"12px"} >내 행성 <br /> 선택하기</TitleText>
                                    </AddPlanet> :  <SelectedPlanetImg src={selPlanet} ref={dropDownRef} onClick={() => { setIsOpen(!isOpen) }}/>
                                }

                                <div style={{margin: 3}} />
                                <ContentText color={'white'} size={'12px'} style={{ textAlign: 'center' }}>통계 페이지에 <br />들어가요!</ContentText>
                            </PlanetSelBox>
                        </PlanetBox>
                        <div style={{marginBottom: 20}} />
                        <TitleText color={'white'} size={'16px'}>{state.title}</TitleText>
                        <ContentText color={'white'} size={'13px'}>{state.author}</ContentText>
                        <MoveStarRating onRate={onRate} rate={rate} />
                    </BookImageBox>
                    {/* book type */}
                    <div style={{height: 20}} />
                    <RadioContainer>
                        <RadioBox>
                            <RadioButton type='radio' value='1' checked={select === '1'} onChange={selectRadioFunc} />
                            <ContentText color={'white'} size={'13px'}>종이책</ContentText>
                        </RadioBox>
                        <RadioBox>
                            <RadioButton type='radio' value='2' checked={select === '2'} onChange={selectRadioFunc} />
                            <ContentText color={'white'} size={'13px'} >전자책</ContentText>
                        </RadioBox>
                    </RadioContainer>

                    {/* input date */}
                    <DateInputBox>
                        <TitleText color={'white'} size={"16px"}>읽기 시작한 날짜</TitleText>
                                                <CustomDatePicker setDate={iswrited ? queries[1].data.startDate : date} page="addreview" onDate={setStartDate} />
                        <div style={{height: 20}} />
                        <TitleText color={'white'} size={"16px"}>읽기 종료한 날짜</TitleText>
                        <CustomDatePicker setDate={iswrited ? queries[1].data.endDate :date} page="addreview" onDate={setEndDate} />
                    </DateInputBox>
                    {/* dashed line */}
                    <Line />
                    {/* input quote */}
                    <QuoteContainer>
                        <QuoteColumnAlignContainer>
                            <QuoteInputTitleBox>
                                <QuoteInputTitleText flex={0.8} color={'white'} size={'16px'}>마음에 남았던 구절</QuoteInputTitleText>
                                <QuoteInputTitleText flex={0.2} color={'white'} size={'16px'}>페이지</QuoteInputTitleText>
                            </QuoteInputTitleBox>
                            {quoteList()}
                            <DeleteQuoteButton onClick={() => deleteQuoteFunc()}>{
                                quotes.length > 1 && <ContentText color={'red'} size={'12px'}>구절 삭제하기</ContentText>
                            }
                            </DeleteQuoteButton>
                            <AddQuoteButton onClick={() => inputQuoteFunc()}>
                                <ContentText color={'white'} size={'12px'}>+ 구절 추가하기</ContentText>
                            </AddQuoteButton>
                    </QuoteColumnAlignContainer>
                    </QuoteContainer>
                    {/* input review */}
                    <div style={{height: 20}} />
                    <ReviewBox>
                        <TitleText color='white' size='16px'>리뷰</TitleText>
                        <ReviewInput ref={textRef} value={content} onChange={e => onContent(e.target.value)} onInput={handleResizeHeight} />
                    </ReviewBox>
                    <div style={{height: 10}} />
                    <Button onClick={handleUploadReview}>
                        <ContentText color={'white'} size={'16px'}>내 행성에 추가하기</ContentText>
                    </Button>
                    </ContentContainer>
                </ScrollbarContainer>
            </Container>
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

// container
const Container = styled.div`
    display: flex;
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    flex-direction: column;
    padding: 40px 20px;
    height: 80vh;
    width: 90vh;
    box-shadow: 0px 2px 7px #00000022;

    @media screen and (max-width: 900px) {
        width: 70vh;
    }

    @media screen and (max-width: 500px) {  
        width: 60vh;
    }
`;

const ScrollbarContainer = styled.div`
    display: flex;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    justify-content: center;

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
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    gap: 10px 0;
`;

const QuoteContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const QuoteColumnAlignContainer = styled.div`
    flex-direction: column;
    flex: 1;
    align-items: center;
`;

const RadioContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

// box
const BookImageBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

const DateInputBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;
`;

const QuoteInputTitleBox = styled.div`
    display:flex;
    flex-direction: row;
    flex: 1;
    justify-content: center;
`;

const QuoteInputTitleText = styled.div`
    flex: ${(props) => props.flex || 1};
    font-family: "KOTRA_BOLD";
    font-size: ${(props) => props.size || '12px'};
    color: ${(props) => props.color || 'grey'};
    text-align: center;
`;

const QuoteInputBox = styled.div`
    display: flex;
    flex: 1;
`;

const ReviewBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RadioBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2px;
    margin: 5px;
`;

const PlanetBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    
`;

const PlanetSelBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

// component
const BookImage = styled.div`
    background-color: #4659a9;
    border-radius: 10px;
    padding: 17px;
    grid-column: 2;
`;

const QuoteInput = styled.input`
    width: 40vh;
    border: none;
    border-radius: 50px;
    background-color: white;
    padding: 4px;
    font-family: "KOTRA_GOTHIC";
    margin: 3px;
    padding: 5px 10px;
`;

const QuotePageInput = styled.input`
    width: 45px;
    border: none;
    border-radius: 50px;
    background-color: white;
    padding: 4px;
    font-family: "KOTRA_GOTHIC";
    text-align: center;
    margin: 3px;
    padding: 5px 10px;
`;

const ReviewInput = styled.textarea`
    width: 370px;
    font-size: 14px;
    border: none;
    border-radius: 20px;
    background-color: white;
    padding: 10px;
    font-family: "KOTRA_GOTHIC";
`;

const Line = styled.div`
    border-color: white;
    border-width: 2px;
    border-style: dashed;
    width: 100%;
    margin-bottom: 40px;
    margin-top: 40px;

`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    width: 50%;
    font-family: "KOTRA_BOLD";
    color: white;
    background-color: #4659A9;
    border-style: none;
    font-size: 16px;
    padding: 7px 50px;
    margin: 10px;
    border-radius: 50px;
    text-align: center;
`;

const RadioButton = styled.input`

`;

const AddQuoteButton = styled.button`
    float: right;
    background: none;
    border: none;
`;

const DeleteQuoteButton = styled.button`
    float: left;
    background: none;
    border: none;
`;

const AddPlanet = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 80px;
    height: 80px;
    background-color: white;
    border-style: dashed;
    border-color: #4659A9;
    border-radius: 50px;
    grid-column: 3;
    text-align: center;
`

const SelectedPlanetImg = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 70px;
    height: 70px;
    grid-column: 3;
    text-align: center;
`

const PlenetList = styled.div`
    width: 120px;
    padding: 10px;
    background-color: #ffffff44;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    opacity: 0;
    gap: 10px;
    visibility: hidden;
    border-radius: 10px;
    align-self: center;
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;

    ${({ $isClicked }) => 
    $isClicked &&
    css`
        opacity: 1;
        visibility: visible;
    `};

`

const PlenetComponents = styled.img`
    width: 25px;
`;

export default WritingReviewPage;