import { useState } from "react";
import styled from "styled-components";
import { GoTriangleDown } from "react-icons/go";

const YearDropdown = ({ isActive, setIsActive, options, setOptions }) => {
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
				<BottomArrow size={25}/>
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
    z-index: 999;
`;

const FilterBtn = styled.button`
    display: flex;
    width: 150px;
    height: 35px;
    border: none;
    border-bottom: solid 2px white;
    background-color: transparent;
    align-items: center;
`;

const Text = styled.div`
    font-size: 30px;
    color: white;
	margin-left: 25px;
`;

const OptionList = styled.ul`
    position: absolute;
    text-align: center;
    width: 150px;
    border-radius: 20px;
    overflow: overlay;
    max-height: 0;
	padding: 0;
    &.active {
        max-height: 230px;
        box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
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
    font-size: 18px;
    color: white;
    background-color: transparent;
    padding-left: 0;
    text-align: center;
    padding: 5px;
	margin: 5px;
`;

const BottomArrow = styled(GoTriangleDown)`
    color: white;
    size: 15px;
    margin-left: 8px;
`;

export default YearDropdown;