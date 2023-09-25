import { useState } from "react";
import styled from "styled-components";
import { GoTriangleDown } from "react-icons/go";

const FilterDropdown = ({ isActive, setIsActive, options, setOptions }) => {
	const [selectedValue, setSelectedValue] = useState('');

	const onClickOption = (e) => {
		const selectedValue = e.currentTarget.innerHTML;
		console.log(selectedValue)
		setSelectedValue(selectedValue);
		setIsActive(false);
		setOptions(selectedValue);
	};

	const onClickDropDown = () => {
        setIsActive(prevIsActive => !prevIsActive);
    };

	return (
		<Dropdown>
			<FilterBtn onClick={onClickDropDown}>
				<Text className="text">{selectedValue === '' ? options[0] : selectedValue}</Text>
				<BottomArrow size={31}/>
			</FilterBtn>
			<OptionList className={`${isActive ? 'active' : ''}`}>
				{options.map((option, index) => (
                    <Option key={index} className="option" onClick={onClickOption}>
                        {option}
                    </Option>
                ))}
			</OptionList>
		</Dropdown>
	)
}

const Dropdown = styled.div`
	position: relative;
    cursor: default;
    margin: 10px;
`;

const FilterBtn = styled.button`
    display: flex;
    width: 175px;
    height: 42px;
    border: none;
    border-radius: 50px;
    background-color: #E5E7FF;
    justify-content: center;
    align-items: center;
`;

const Text = styled.div`
    font-size: 20px;
    color: #4659A9;
	margin-left: 10px;
`;

const OptionList = styled.ul`
    position: absolute;
    width: 100%;
    overflow: overlay;
    max-height: 0;
	padding: 0;
    &.active {
        max-height: 230px;
        box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
        border-radius: 20px;
        &::-webkit-scrollbar {
            width: 10px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: hsla(0, 0%, 42%, 0.49);
            border-radius: 100px;
        }
        &::-webkit-scrollbar-button:vertical:start:increment {
            display: block;
            height: 10px;
        }
        &::-webkit-scrollbar-button:vertical:end:decrement {
            display: block;
            height: 10px;
        }
    }
`;

const Option = styled.li`
    list-style-type: none;
    font-size: 20px;
    color: #4659A9;
    background-color: #E5E7FF;
    padding-left: 0;
    text-align: center;
    padding: 5px;
	margin: 5px;
	border-radius: 50px;
`;

const BottomArrow = styled(GoTriangleDown)`
    color: #4659A9;
    size: 15px;
`;

export default FilterDropdown;