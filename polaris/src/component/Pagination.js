import styled from "styled-components";

const Pagination = ({ slicePages, currentArray, currentPage, onPageChange }) => {
	const setPage = (newCurrentArray) => {
        onPageChange(newCurrentArray, slicePages[newCurrentArray][0]);
		console.log('newCurrentArray', newCurrentArray)
		console.log('slicePages[newCurrentArray][0]', slicePages[newCurrentArray][0])
		console.log('currentArray in pagenation', currentArray)
    };

	const isactive = (page) => {
		return currentPage === page;
	}

	const pagination = (slicePages, currentPage) => {
		// to show such as [1, 2, 3, 4, 5] button
        return slicePages[currentArray]?.map((page, index) => (
			<PageButton
				key={index}
				onClick={() => {onPageChange(currentArray, page); }}
				className={isactive(page) ? 'active' : ''}
            >
                {page}
            </PageButton>
        ));
    }

	return (
		<Paging>
			<SideBtn 
				onClick={()=>{setPage(currentArray - 1); isactive(1)}} 
				disabled={currentArray === 0}
				>
				&lt;
			</SideBtn>
				{pagination(slicePages, currentPage)}
			<SideBtn 
				onClick={()=>{setPage(currentArray + 1); isactive(1)}} 
				disabled={currentArray === slicePages.length - 1}>
				&gt;
			</SideBtn>
		</Paging>
	)
}

const PageButton = styled.button`
    color: #4659A9;
    border: transparent;
    background-color: transparent;
    margin-bottom: 40px;
	&.active {
		color: #ffffff;
		background-color: #4659A9;
	}
	@media screen and (min-width: 516px) {
		font-size: 27px;
    }
    @media screen and (max-width: 515px) {
		font-size: 22px;
    }
`
const SideBtn = styled.button`
    color: #4659A9;
    border: transparent;
    background-color: transparent;
	@media screen and (min-width: 516px) {
		font-size: 27px;
    }
    @media screen and (max-width: 515px) {
		font-size: 22px;
    }
`
const Paging = styled.div`
    grid-area: pagination;
	margin-top: 30px;
`;

export default Pagination;