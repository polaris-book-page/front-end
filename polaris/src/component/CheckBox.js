import styled from "styled-components";

const Checkbox = ({ label, selectedValue, setSelectedValue }) => {	
	return (
		<CheckboxWrapper>
			<input type="checkbox" checked={selectedValue} onChange={setSelectedValue} style={{ display: 'none' }} />
			<CustomCheckbox checked={selectedValue} />
			<CheckboxLabel>{label}</CheckboxLabel>
		</CheckboxWrapper>
	)
}

const CheckboxWrapper = styled.label`
    display: flex;
    align-items: center;
    width: 240px; 
    cursor: pointer;
`;

const CustomCheckbox = styled.span`
    position: relative;
    width: 20px;
    height: 20px;
    border: solid #ffffff;
    &:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 5px;
    width: 6px;
    height: 10px;
    border: solid #ffffff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    }
`;

const CheckboxLabel = styled.span`
    margin-left: 8px;
    margin-bottom: 1px;
    color: white;
    font-size: 16px;
`;

export default Checkbox;