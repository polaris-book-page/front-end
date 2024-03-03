import styled from "styled-components";
import { ReactComponent as Search } from "../assets/ic-search.svg";
import { ReactComponent as Unlock } from "../assets/ic-unlock.svg";
import { FiLock } from "react-icons/fi";
import { ReactComponent as MyPage } from "../assets/ic-person.svg";
import { ReactComponent as Favorite } from "../assets/ic-heart.svg";
import { ReactComponent as MainPage } from "../assets/ic-main-star.svg";
import { ReactComponent as Travel } from "../assets/ic-rocket-travel.svg";
import { ReactComponent as Sentence } from "../assets/ic-sentence.svg";
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavMenuList from "../component/NavMenuList"

const NavBar = () => {
  const [isLogined, setIsLogined] = useState(false)
  const queryClient = useQueryClient()
  let navigate = useNavigate();
  const initialData = queryClient.getQueryData(['check']);
  const [searchParams, setSearchParams] = useSearchParams();

  const logoutquery = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/logout`, {
        withCredentials: true,
      });
      console.log("response: ", response);
  
      await axios.get(`http://localhost:3001/user/check`, {
        withCredentials: true,
      });
  
      const somebodyIn = queryClient.getQueryData(['check']);
      console.log("is anyone in? after logout: ", somebodyIn);
      return response;
    } catch (error) {
      console.error("Error during logout:", error);
  
      if (error.response && error.response.status === 401) {
        navigate('/main'); 
      }
      throw error;
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [queryClient, initialData]);

  const fetchInitialData = async () => {
    const initialData = await queryClient.getQueryData(['check']);
    if (initialData) {
      setIsLogined(initialData.is_logined);
    }
  };
  
  const handleLogout = async () => {
    console.log("로그아웃 완")
    await logoutquery();
    setIsLogined(false)
    queryClient.invalidateQueries(['check']);
    navigate('/auth/login');
  };

  const handleLogin = async () => {
    navigate('/auth/login')
    setIsLogined(true)
    queryClient.invalidateQueries(['check']);
  }

  const navigateMypage = async () => {
    navigate('/mypage')
  }

  const navigateBooket = async () => {
    navigate('/mypage/list')
  }

  const navigateMain = async () => {
    navigate('/main')
  }

  const navigateHome = async () => {
    navigate('/')
  }

  const navigateExplo = async () => {
    navigate('/recommend')
  }

  const navigateToday = async () => {
    navigate('/sentence')
  }

  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
        const currentText = e.currentTarget.parentNode.children[0].value;
        if (currentText !== '') {
          navigate(`/search?query=${encodeURIComponent(currentText)}`);
        }
      }
    };

  const handleSearchText = (e) => {
    const currentText = e.currentTarget.parentNode.children[0].value;
    if (currentText !== '') {
      navigate(`/search?query=${encodeURIComponent(currentText)}`);
    }
  }

  console.log("window.innerWidth: ", window.innerWidth)

  return (
    <>
      <NavbarContainer>
        <NavBarMenuBox>
          <NavLogo src={require('../assets/graphic/app-logo.png')} onClick={navigateHome}/>
          <div style={{ width: "10px" }} />
            <NavScreenListBox>
              <NavText onClick={navigateMain}>메인 페이지</NavText>
              <NavText onClick={navigateExplo}>북극성 탐험</NavText>
              <NavText onClick={navigateToday}>오늘의 문장</NavText>
            </NavScreenListBox>
          <NavMobileListBox>
            <MainPage onClick={navigateMain} />
            <Travel onClick={navigateExplo} />
            <Sentence onClick={navigateToday} />
            </NavMobileListBox>
        </NavBarMenuBox>
        <div style={{ flex: 1 }} />
        <NavBarIconContainer>
          <SearchBox>
            <SearchInput className='searchInput' placeholder="책 이름을 입력해주세요." onKeyDown={handleOnKeyPress}/>
            <SearchBtn size="33" onClick={handleSearchText}/>
          </SearchBox>
          <NavBarScreenIconBox>
            <Favorite fill='white' onClick={navigateBooket}/>
            <MyPage fill='white' onClick={navigateMypage}/>
            {isLogined ? (
              <Unlock fill="white" onClick={handleLogout}/>
            ) : ( 
              <FiLock size={35} color="white" onClick={handleLogin}/>
              )}
            </NavBarScreenIconBox>
          <NavBarMobileIconBox>
            <NavMenuList />
          </NavBarMobileIconBox>
        </NavBarIconContainer>

      </NavbarContainer>
    </>
  );
};

const NavbarContainer = styled.div`
  display: flex;
  background: linear-gradient(#2c2c60, #4659a9);
  height: 100px;
  padding: 40px;
`;

const NavBarMenuBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLogo = styled.img`
  border-radius: 50px;
  width: 50px;
  height: 50px;
`;

const NavScreenListBox = styled.div`
  display: flex;
  
  @media all and (max-width: 540px) {
    display: none;
  }
`;

const NavMobileListBox = styled.div`
  display: flex;
  gap: 10px;
  
  @media all and (min-width: 540px) {
    display: none;
  }
`;

const NavBarIconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 5px;
`;

const NavBarScreenIconBox = styled.div`
  display: flex;
  flex: 0.3;
  justify-content: space-around;
  align-items: center;
  float: left;
  gap: 7px;

  @media all and (max-width: 540px) {
    display: none;
  }
`;

const NavBarMobileIconBox = styled.div`
  display: flex;
  align-items: center;

  @media all and (min-width: 540px) {
    display: none;
  }
`;

const NavText = styled.p`
  font-size: 16px;
  color: white;
  margin: 15px;
  font-family: "KOTRA_GOTHIC";

  &:hover {
    cursor: default;
  }
`;

const SearchBox = styled.div`
  position: relative;
  display: flex; 
  align-items: center; 
  padding: 10px 0 10px 10px;
  height: 50px;
  background-color: transparent;
  border-radius: 30px;
  transition: 0.4s;
  width: 50px;
  &:hover {
    background-color: #fff;
    width: 300px;
  }
`;

const SearchInput = styled.input`
  width: 0px;
  border:none;
  outline: none;
  float: left;
  font-size: 1rem;
  line-height: 30px;
  transition: .4s;
  font-family: "KOTRA_BOLD";
  color: #4659A9;
  background-color: transparent;
  ${SearchBox}:hover &{
    width: 240px;
    padding: 0 6px;
  }
  
  `;
const SearchBtn = styled(Search)`    
    stroke: #fff;
    ${SearchBox}:hover &{
      stroke: #4659A9;
  }
`;


export default NavBar;