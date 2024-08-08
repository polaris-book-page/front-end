import { ReactComponent as MenuIcon } from "../assets/ic-hamburger.svg";
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import useDetectClose from "./hook/useDetectClose";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MyPage } from "../assets/ic-person.svg";
import { ReactComponent as Favorite } from "../assets/ic-heart.svg";
import { ReactComponent as Unlock } from "../assets/ic-unlock.svg";
import axios from "axios";
import { useQueryClient } from '@tanstack/react-query'
import { FiLock } from "react-icons/fi";

const NavMenuList = () => {

    const dropDownRef = useRef(null);
    const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isLogined, setIsLogined] = useState(false);

    useEffect(() => {
        setIsLogined(queryClient.getQueryData(['check']).is_logined)
    }, [isLogined])
    
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
        return response;
        } catch (error) {
        console.error("Error during logout:", error);
    
        if (error.response && error.response.status === 401) {
            navigate('/main'); 
        }
        throw error;
        }
    };

    const handleLogout = async () => {
        console.log("로그아웃 완")
        await logoutquery();
        setIsLogined(false)
        queryClient.invalidateQueries(['check']);
        navigate('/auth/login');
    };

    return (
        <>
            <MenuIcon ref={dropDownRef} onClick={() => setIsOpen(!isOpen)} />
            <Menu $isdropped={isOpen}>
                <Li onClick={() => navigate('/mypage')}>
                    <MyPage fill={'#4659A9'} />
                    마이페이지
                </Li>
                <Li onClick={() => navigate('/mypage/list')}>
                    <Favorite fill={'#4659A9'} />
                    북킷리스트
                </Li>
                {
                    isLogined ?
                    <Li onClick={handleLogout}>
                        <Unlock fill={'#4659A9'} />
                        로그아웃
                    </Li> :
                    <Li onClick={() => navigate('/auth/login')}>
                        <FiLock color='#4659A9' size={35} /> 로그인
                    </Li>
                }
            </Menu>
        </>
    )
}

const Menu = styled.div`
    background: #ffffffAA;
    border-radius: 8px;
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 160px;
    top: 105px;
    right: 15px;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    padding: 5px;
    font-family: "KOTRA_GOTHIC";
    font-size: 14px;
    color: #4659A9;
    list-style: none;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    z-index: 1;

    &:after {
        display: flex;
        position: absolute;
        top: -3px;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    ${({ $isdropped }) => 
    $isdropped &&
    css`
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    `};
`

const Li = styled.li`
    display: flex;
    flex: 1;
    padding: 10px;
    align-items: center;
    gap: 10px;

    &:hover {
        background-color: #ffffffaa;
    }
`;


export default NavMenuList;