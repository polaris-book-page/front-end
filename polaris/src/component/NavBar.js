import styled, {css} from "styled-components";
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
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { toastContent } from "../utils/toastContent";

const NavBar = () => {
  const [isLogined, setIsLogined] = useState(false)
  const queryClient = useQueryClient()
  let navigate = useNavigate();
  const initialData = queryClient.getQueryData(['check']);
  const [isModal, setIsModal] = useState(false);

  const logoutquery = async () => {
    try {
      const response = await axios.get(`/api/user/logout`, {
        withCredentials: true,
      });
      console.log("response: ", response);
  
      await axios.get(`/api/user/check`, {
        withCredentials: true,
      });
  
      const somebodyIn = queryClient.getQueryData(['check']);
      console.log("is anyone in? after logout: ", somebodyIn);
      return response.data.logoutSuccess;
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
    const isLogout = await logoutquery();
    if(isLogout){
      localStorage.removeItem('islogined')
      toast.success(toastContent.logoutSuccess);
    } else{
      toast.error(toastContent.logoutError);
    }
    setIsLogined(false)
    queryClient.invalidateQueries(['check']);
    navigate('/auth/login');
  };

  const handleLogin = async () => {
    queryClient.invalidateQueries(['check']);
    const somebodyIn = queryClient.getQueryData(['check']);
    if (somebodyIn.is_logined === false && window.location.pathname !== '/auth/login') {
      navigate('/auth/login')
      setIsLogined(true)
    }
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
              <Unlock id="log_btn" fill="white" onClick={() => setIsModal(true)}/>
            ) : ( 
              <FiLock id="log_btn" size={35} color="white" onClick={handleLogin}/>
              )}
            </NavBarScreenIconBox>
          <NavBarMobileIconBox>
            <NavMenuList />
          </NavBarMobileIconBox>
        </NavBarIconContainer>

      </NavbarContainer>

        {/* modal */}
        <Modal
      ariaHideApp={false}
      style={customStyle}
      isOpen={isModal}
      onRequestClose={() => setIsModal(false)}
      shouldCloseOnOverlayClick={true}>
      <ModalTitleContainer>
          <ModalTitleText color={'#ffffff'}>Polaris</ModalTitleText>
      </ModalTitleContainer>
      <ModalContentContainer>
        <div style={{height: 25}} />
        <ModalTitleText color={'#4659A9'}>로그아웃 하시겠습니까?</ModalTitleText>
        <div style={{height: 25}} />
          <ModalButtonBox>
            <ModalButton status={'logout'} onClick={handleLogout}>확인</ModalButton>
            <ModalButton status={'cancel'} onClick={() => setIsModal(false)}>취소</ModalButton>
          </ModalButtonBox>
      </ModalContentContainer>
  </Modal>
    </>
  );
};

// modal style
const customStyle = {
  overlay: {
      backgroundColor: '#00000040',
  },
  content: {
      maxWidth: '800px',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      width: '75%',
      height: 235,
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderStyle: 'none',
      borderRadius: '30px',
      outline: 'none',
      padding: 0,
      backgroundColor: 'rgb(255,255,255,0.9)',
      boxShadow: '0px 2px 7px #00000040'
  }
};

// text
const ModalTitleText = styled.div`
    font-family: 'KOTRA_BOLD';
    color: ${(props) => props.color || 'gray'};
    font-size: 20px;
`;

// modal-container
const ModalTitleContainer = styled.div`
    height: 60px;
    display: flex;
    background-color: #4659A9;
    justify-content: center;
    align-items: center;
`

const ModalContentContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;
`

// modal-box
const ModalButtonBox = styled.div`
    display: flex;
    flex-align: columns;
    justify-content: center;
    align-items: center;
`;

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
  
  @media all and (max-width: 570px) {
    display: none;
  }
`;

const NavMobileListBox = styled.div`
  display: flex;
  gap: 10px;
  
  @media all and (min-width: 570px) {
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

  @media all and (max-width: 570px) {
    display: none;
  }
`;

const NavBarMobileIconBox = styled.div`
  display: flex;
  align-items: center;

  @media all and (min-width: 570px) {
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

const ModalButton = styled.button`
    width: 10rem;
    font-family: "KOTRA_GOTHIC";
    color: white; 
    font-size: 16px;
    padding: 7px 50px;
    margin: 10px;
    border-radius: 50px;

    ${({status}) => {switch(status){
      case 'logout' : return css`
        background-color: #4659A9;
        color: white;
        border-style: none;
      `
      case 'cancel' : return css`
        color: #4659A9;
        bacoground-color: white;
        border-width: 2px;
        border-color: #4659A9;
      `
    }}}
`;

export default NavBar;