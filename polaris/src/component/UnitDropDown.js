import styled, { css } from "styled-components";
import { useEffect, useRef, useState } from "react";
import useDetectClose from "./hook/useDetectClose";

const UnitDropDown = ({handlePageType}) => { 
    const dropDownRef = useRef(null);
    const [unit, setunit] = useState('쪽(p)');
    const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

    useEffect(() => {
        handlePageType(unit)
    }, [unit])

    return (
        <>
            <Container>
                <Selected ref={dropDownRef} onClick={() => setIsOpen(!isOpen)}>
                    {unit} ▼
                </Selected>
                <Menu $isdropped={isOpen}>
                    <Li onClick={() => setunit('쪽(p)')}>
                        쪽(p)
                    </Li>
                    <Li onClick={() => setunit('퍼센트(%)')}>
                        퍼센트(%)
                    </Li>
                </Menu>
            </Container>
        </>
    )

}

const Container = styled.div`
    display: flex;
    position: relative;
`;

const Menu = styled.div`
    background: #ffffff;
    border-radius: 8px;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 90px;
    top: 40px;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    padding: 10px;
    font-family: "KOTRA_GOTHIC";
    font-size: 14px;
    list-style: none;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;

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

const Selected = styled.div`
    width: 90px;
    font-family: "KOTRA_GOTHIC";
    font-size: 14px;
    border-style: solid;
    border-width: 2px;
    padding: 3px;
    text-align: center;
    border-color: #4659A9;
    border-radius: 20px;
    cursor: pointer;
`

const Li = styled.li`

`;


export default UnitDropDown;

