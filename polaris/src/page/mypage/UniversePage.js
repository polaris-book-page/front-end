import styled, { keyframes, css } from "styled-components";
import NavBar from "../../component/NavBar";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Moment from 'moment';
import YearDropdown from "../../component/YearDropdown";

const UniversePage = () => {
    const reviewPerMonth = Array.from({length: 12}, () => 0)
    const [yearReview, setYearReview] = useState([])
    const [currYearReview, setCurrYearReview] = useState([])
    let navigate = useNavigate()
    const [year, setYear] = useState(new Date().getFullYear());
    const [isActive3, setIsActive3] = useState(false);
    let premonth = -1
    let n = 0
    const currMonth = new Date().getMonth() + 1;
    console.log(currMonth)

    const fetchReviewList = async () => {
        try {
            const response = await axios.get(`/api/mypage/star-review`, { withCredentials: 'true'});
            const data = response.data;
                        
            return data;
        } catch (err) {
            console.log(err)
        }
    }

    const ReviewQuery = useQuery({
        queryKey: ["review-list"],
        queryFn: fetchReviewList
    })

    const splitReviewsPerYear = (reviews) => {
        const reviewsPerYear = {};
        reviews.forEach(review => {
            const year = new Date(review.endDate).getFullYear().toString();
            if (!reviewsPerYear[year]) {
                reviewsPerYear[year] = [];
            }
            reviewsPerYear[year].push(review);
        });
        return reviewsPerYear;
    };
    
    const orderReview = (reviews) => {
        return reviews.slice().sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    };
    
    const handleYearChange = (year) => {
        setYear(year);
    };

    useEffect(() => {
        const processReviews = async () => {
            if (ReviewQuery.data) {
                const reviewsPerYear = splitReviewsPerYear(ReviewQuery.data.reviewList);
                const sortedReviewsPerYear = {};
                
                Object.keys(reviewsPerYear).forEach(year => {
                    sortedReviewsPerYear[year] = orderReview(reviewsPerYear[year]);
                });
                setYearReview(sortedReviewsPerYear);
    
                // Calculate reviews per month 
                if (year && sortedReviewsPerYear[year]) {
                    const reviewsOfYear = sortedReviewsPerYear[year];
                    reviewsOfYear.forEach(review => {
                        if (review.endDate) {
                            const endDate = new Date(review.endDate);
                            const month = endDate.getMonth();
                            reviewPerMonth[month]++;
                        }
                    });
                    console.log("reviewPerMonth: ", reviewPerMonth);
                }
            }
        };
        processReviews();
    }, [ReviewQuery.data]);

    useEffect(() => {
        if (ReviewQuery.data && yearReview) {
            setCurrYearReview(yearReview[year])
        }
    }, [year, yearReview])

    const handleReviewDetail = (review) => {
        navigate(`/mypage/review/detail`, { state: review })
    }

    const toggleActive3 = () => {
        setIsActive3(prevIsActive => !prevIsActive);
    };

    return (
        !ReviewQuery.isLoading && <>
        {/* <> */}
            <NavBar/>
            <Background>
            <DropdownBox>
                <YearDropdown 
                    isActive={isActive3}
                    setIsActive={toggleActive3}
                    options={Object.keys(yearReview).reverse()}
                    setOptions={handleYearChange}
                    />
            </DropdownBox>
                <Solar>
                    <Sun src={require("../../assets/graphic/sun.png")}></Sun>
                    <Orbit1 $m={1} curm={currMonth}/>
                    <Orbit2 $m={2} curm={currMonth}/>
                    <Orbit3 $m={3} curm={currMonth}/>
                    <Orbit4 $m={4} curm={currMonth}/>
                    <Orbit5 $m={5} curm={currMonth}/>
                    <Orbit6 $m={6} curm={currMonth}/>
                    <Orbit7 $m={7} curm={currMonth}/>
                    <Orbit8 $m={8} curm={currMonth}/>
                    <Orbit9 $m={9} curm={currMonth}/>
                    <Orbit10 $m={10} curm={currMonth}/>
                    <Orbit11 $m={11} curm={currMonth}/>
                    <Orbit12 $m={12} curm={currMonth}/>
                    {currYearReview && <>
                        {currYearReview.map((review, index) => {
                                const endDate = new Date(review.endDate);
                                const curmonth = endDate.getMonth(); 
                                
                                if (curmonth === premonth) {
                                    n += 1
                                } else (
                                    n = 0
                                )
                                premonth = endDate.getMonth(); 
                        
                                return (
                                    <PlanetWrapper 
                                        key={index} 
                                        review={review}
                                        $m={curmonth + 1} 
                                        $n={n}
                                        onClick={() => handleReviewDetail(review)}
                                    />
                                );
                            })}
                    </>}
                    {/* <PlanetWrapper src={require("../../assets/graphic/planet-10.png")} m={9} n={1}/> */}
                    {/* <PlanetWrapper src={require("../../assets/graphic/planet-4.png")} m={3} n={1}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-4.png")} m={3} n={2}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-4.png")} m={3} n={3}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-4.png")} m={3} n={4}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-5.png")} m={3} n={5}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-6.png")} m={3} n={6}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-4.png")} m={3} n={7}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-4.png")} m={3} n={8}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-4.png")} m={3} n={9}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-4.png")} m={3} n={10}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-5.png")} m={3} n={11}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-6.png")} m={3} n={12}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-4.png")} m={3} n={13}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-4.png")} m={3} n={14}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-4.png")} m={3} n={15}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-4.png")} m={3} n={16}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-5.png")} m={3} n={17}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-6.png")} m={3} n={18}/> */}
                    {/* <PlanetWrapper src={require("../../assets/graphic/planet-2.png")} m={7} n={2}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-3.png")} m={10} n={1}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-7.png")} m={10} n={3}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-8.png")} m={10} n={5}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-9.png")} m={10} n={7}/>
                    <PlanetWrapper src={require("../../assets/graphic/planet-10.png")} m={10} n={10}/> */}
                </Solar>
            </Background>
        </>)
}

// 행성의 시작점은 translateX(-85px), translateX(85px), translateY(85px), translateY(-85px)
// initialX(m)(링 위치)는 0 ~ 11 사이의 값
// degree(n)(링 안에서 시작위치)를 360 / 행성 개수로 해야 조금 더 조화로울듯?
const cloudOrbit = (initialX, degree) => keyframes`
    0% {
        transform: 
            rotate(0deg) 
            translateX(${Math.cos((degree * 20 % 360) * (Math.PI / 180)) * (60 + 35 * (initialX - 1))}px) 
            translateY(${Math.sin((degree * 20 % 360) * (Math.PI / 180)) * (60 + 35 * (initialX - 1))}px) 
            rotate(0deg);

    }
    100% {
        transform: 
            rotate(360deg) 
            translateX(${Math.cos((degree * 20 % 360) * (Math.PI / 180)) * (60 + 35 * (initialX - 1))}px) 
            translateY(${Math.sin((degree * 20 % 360) * (Math.PI / 180)) * (60 + 35 * (initialX - 1))}px) 
            rotate(-360deg);
    }
`;

const neon_flicker = keyframes`
    0% {
        box-shadow: 
        inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), 
        inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4),
        inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4);
    }
    100% {
        box-shadow: 
        inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), 
        inset 0 0 25px rgba(255, 255, 255, 0.6), 0 0 25px rgba(255, 255, 255, 0.6),
        inset 0 0 45px rgba(255, 255, 255, 0.6), 0 0 45px rgba(255, 255, 255, 0.6);
    }
`;

const Background = styled.div`
    background: #2C2C60;
`;

const DropdownBox = styled.div`
    /* position: relative; */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh; 
`;

const Solar = styled.div`
    position: relative;
    height: 140vh;
    width: 100%;
`;

const Sun = styled.img`
    width: 60px;
    height: 60px;
    position: absolute;
    left: calc(50% - 30px);
    top: calc(50% - 30px);
`;

const PlanetWrapper = ({ review, $m, $n, onClick }) => (
    <BookInfo $m={$m} $n={$n} onClick={onClick}>
        <Planet src={review.planetImage} />
        <ReadingBox>
            <img src={review.bookImage} style={{width: 50, height: 70 }} />
            <ReadingContent>
                <ContentText color={'#4659A9'} size={'16px'}>{review.title}</ContentText>
                <ContentText color={'#4659A9'}>{Moment(review.startDate).format('YYYY.MM.DD')} /
                                                ~ {Moment(review.endDate).format('YYYY.MM.DD')}</ContentText>
            </ReadingContent>
        </ReadingBox>
    </BookInfo>
);

const BookInfo = styled.div`
    position: absolute;
    left: calc(50% - 14px);
    top: calc(50% - 14px);
    animation: ${props => cloudOrbit(props.$m, props.$n)} ${props => (props.$m + 1) * 15}s linear infinite;
`;

const Planet = styled.img.attrs(({ src }) => ({
    src: src ? src: require('../../assets/graphic/planet-10.png') }))`
    width: 28px;
    height: 28px;
`;

const ReadingBox = styled.div`
    display: none;
    background-color: #fff;
    align-items: center;
    border: solid 2px #D5CFFB;
    border-radius: 20px;
    padding: 10px;
    width: 200px;
    ${Planet}:hover ~ & {
        display: flex;
    }
    position: absolute;
    left: calc(50% + 30px);
    top: calc(50% - 110px);
`;

const ReadingContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    font-family: "KOTRA_GOTHIC";
    margin-left: 10px;
`;

const ContentText = styled.span`
    color: gray;
    font-family: "KOTRA_GOTHIC";
    font-size: 12px;
`;

const Orbit1 = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    ${props => props.$m == props.curm && css`
        animation: ${neon_flicker} 1.5s infinite alternate;
    `};
    position: absolute;
    left: calc(50% - 60px);
    top: calc(50% - 60px);
`;

const Orbit2 = styled.div`
    width: 190px;
    height: 190px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    ${props => props.$m == props.curm && css`
        animation: ${neon_flicker} 1.5s infinite alternate;
    `};
    position: absolute;
    left: calc(50% - 95px);
    top: calc(50% - 95px);
`;

const Orbit3 = styled.div`
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    ${props => props.$m == props.curm && css`
        animation: ${neon_flicker} 1.5s infinite alternate;
    `};
    position: absolute;
    left: calc(50% - 130px);
    top: calc(50% - 130px);
`;

const Orbit4 = styled.div`
    width: 330px;
    height: 330px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    ${props => props.$m == props.curm && css`
        animation: ${neon_flicker} 1.5s infinite alternate;
    `};
    position: absolute;
    left: calc(50% - 165px);
    top: calc(50% - 165px);
`;

const Orbit5 = styled.div`
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    ${props => props.$m == props.curm && css`
        animation: ${neon_flicker} 1.5s infinite alternate;
    `};
    position: absolute;
    left: calc(50% - 200px);
    top: calc(50% - 200px);
`;

const Orbit6 = styled.div`
    width: 470px;
    height: 470px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    ${props => props.$m == props.curm && css`
        animation: ${neon_flicker} 1.5s infinite alternate;
    `};
    position: absolute;
    left: calc(50% - 235px);
    top: calc(50% - 235px);
`;

const Orbit7 = styled.div`
    width: 540px;
    height: 540px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    ${props => props.$m == props.curm && css`
        animation: ${neon_flicker} 1.5s infinite alternate;
    `};
    position: absolute;
    left: calc(50% - 270px);
    top: calc(50% - 270px);
`;

const Orbit8 = styled.div`
    width: 610px;
    height: 610px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    ${props => props.$m == props.curm && css`
        animation: ${neon_flicker} 1.5s infinite alternate;
    `};
    position: absolute;
    left: calc(50% - 305px);
    top: calc(50% - 305px);
`;

const Orbit9 = styled.div`
    width: 680px;
    height: 680px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    ${props => props.$m == props.curm && css`
        animation: ${neon_flicker} 1.5s infinite alternate;
    `};
    position: absolute;
    left: calc(50% - 340px);
    top: calc(50% - 340px);
`;

const Orbit10 = styled.div`
    width: 750px;
    height: 750px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    ${props => props.$m == props.curm && css`
        animation: ${neon_flicker} 1.5s infinite alternate;
    `};
    position: absolute;
    left: calc(50% - 375px);
    top: calc(50% - 375px);
`;

const Orbit11 = styled.div`
    width: 820px;
    height: 820px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    ${props => props.$m == props.curm && css`
        animation: ${neon_flicker} 1.5s infinite alternate;
    `};
    position: absolute;
    left: calc(50% - 410px);
    top: calc(50% - 410px);
`;

const Orbit12 = styled.div`
    width: 890px;
    height: 890px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.2px solid white;
    ${props => props.$m == props.curm && css`
        animation: ${neon_flicker} 1.5s infinite alternate;
    `};
    box-shadow: ${props => props.animated ? 'none' :
        'inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.4), ' + 
        'inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.4), ' +
        'inset 0 0 25px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.4)'};
    position: absolute;
    left: calc(50% - 445px);
    top: calc(50% - 445px);
`;



export default UniversePage;