import styled from "styled-components";
import {RingLoader} from "react-spinners";

const LoadSpinner = () => {

  return (
    <LoadSpinnerWrapper>
      <RingLoader size={50} color={'#4659A9'} />
      <ContentText>불러오는 중이에요..</ContentText>
    </LoadSpinnerWrapper>
  )
}

const LoadSpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentText = styled.text`
    color: #4659A9;
    font-family: "KOTRA_GOTHIC";
    font-size: 15px;
    margin-top: 10px;
`

export default LoadSpinner;