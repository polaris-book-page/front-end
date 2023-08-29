import { useState } from "react";
import styled from "styled-components";

const Pagination = ({ slicePages, currentArray, currentPage, onPageChange }) => {
	const [isActive, setIsActive] = useState([true, false, false, false, false]);
	const setPage = (newCurrentArray) => {
        onPageChange(newCurrentArray, slicePages[newCurrentArray][0]);
    };

	const isactive = (page) => {
		// to focus on the current page
		const initialActive = [true, false, false, false, false];
		initialActive[0] = false
		initialActive[(page - 1) % 5] = true
		setIsActive(initialActive);
	}

	const pagination = (slicePages, currentPage) => {
		// to show such as [1, 2, 3, 4, 5] button
        return slicePages[currentArray]?.map((page, index) => (
            <PageButton
                key={index}
                onClick={() => {onPageChange(currentArray, page); isactive(page)}}
				className={isActive[(page - 1) % 5] ? 'active' : ''}
            >
                {page}
            </PageButton>
        ));
    }

	return (
		<Paging>
			<SideBtn 
				onClick={()=>{setPage(currentArray - 1, slicePages); isactive(1)}} 
				disabled={currentArray === 0}
				>
				&lt;
			</SideBtn>
				{pagination(slicePages, currentPage)}
			<SideBtn 
				onClick={()=>{setPage(currentArray + 1, slicePages); isactive(1)}} 
				disabled={currentArray === slicePages.length - 1}>
				&gt;
			</SideBtn>
		</Paging>
	)
}

const PageButton = styled.button`
    font-size: 27px;
    color: #4659A9;
    border: transparent;
    background-color: transparent;
    margin-bottom: 40px;
	&.active {
		color: #ffffff;
		background-color: #4659A9;
	}
`
const SideBtn = styled.button`
    font-size: 27px;
    color: #4659A9;
    border: transparent;
    background-color: transparent;
`
const Paging = styled.div`
    grid-area: pagination;
`;

export default Pagination;