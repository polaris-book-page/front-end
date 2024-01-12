import styled from "styled-components";
import { ReactComponent as Search } from "../assets/ic-search.svg";
import { ReactComponent as Unlock } from "../assets/ic-unlock.svg";
import { FiLock } from "react-icons/fi";
import { ReactComponent as MyPage } from "../assets/ic-person.svg";
import { ReactComponent as Favorite } from "../assets/ic-heart.svg";
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const NavBar = () => {
  const [isLogined, setIsLogined] = useState(false)
  const queryClient = useQueryClient()
  let navigate = useNavigate();
  const initialData = queryClient.getQueryData(['check']);

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
    if (initialData) {
      setIsLogined(initialData.is_logined);
    }
  }, [initialData]);
  
  const handleLogout = async () => {
    console.log("로그아웃 완")
    await logoutquery();
    navigate('/auth/login');
    setIsLogined(false)
  };

  const handleLogin = async () => {
    navigate('/auth/login')
    setIsLogined(true)
  }

  return (
    <>
      <NavbarContainer>
        <NavBarMenuBox>
          <NavLogo />
          <div style={{ width: "10px" }} />
          <NavText>메인 페이지</NavText>
          <NavText>북극성 탐험</NavText>
          <NavText>오늘의 문장</NavText>
        </NavBarMenuBox>
        <div style={{ flex: 1 }} />
        <NavBarIconBox>
          <Search />
          <Favorite />
          <MyPage />
          {isLogined ? (
            <Unlock onClick={handleLogout}/>
          ) : ( 
            <FiLock size={35} color="white" onClick={handleLogin}/>
          )}
        </NavBarIconBox>
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

const NavLogo = styled.div`
  border-radius: 50px;
  width: 50px;
  height: 50px;
  background-color: gray;
`;

const NavBarIconBox = styled.div`
  display: flex;
  flex: 0.3;
  justify-content: space-around;
  align-items: center;
  float: left;
`;

const NavText = styled.p`
  font-size: 20px;
  color: white;
  margin: 15px;
  font-family: "KOTRA_GOTHIC";
`;

export default NavBar;
