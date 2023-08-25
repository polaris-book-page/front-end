import styled from "styled-components";

const Pagination = ({ slicePages, currentArray, currentPage, onPageChange }) => {
	const setPage = (newCurrentArray) => {
        onPageChange(newCurrentArray, slicePages[newCurrentArray][0]);
    };

	const pagination = (slicePages, currentPage) => {
        return slicePages[currentArray]?.map((page, index) => (
            <PageButton
                key={index}
                isActive={page === currentPage}
                onClick={() => onPageChange(currentArray, page)}
            >
                {page}
            </PageButton>
        ));
    }

	return (
		<Paging>
			<SideBtn 
				onClick={()=>setPage(currentArray - 1, slicePages)} 
				disabled={currentArray === 0}>
				&lt;
			</SideBtn>
				{pagination(slicePages, currentPage)}
			<SideBtn 
				onClick={()=>setPage(currentArray + 1, slicePages)} 
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