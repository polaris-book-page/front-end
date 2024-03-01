import styled from "styled-components";

const FooterBar = () => {
  return (
    <>
      <FooterbarContainer>
        <FooterInfoContainer>
          <TeamInfoBox>
            <TitleText>Team.Polaris</TitleText>
            <ContentText>introduce</ContentText>
          </TeamInfoBox>
          <ContentDevInfoBox>
            <ContactInfoBox>
              <TitleText>Contact</TitleText>
              <ContentText>polaris-book@gmail.com</ContentText>
            </ContactInfoBox>
            <DeveloperInfoBox>
              <TitleText>Developer</TitleText>
              <ContentText>김주희, 유수연</ContentText>
            </DeveloperInfoBox>
          </ContentDevInfoBox>
        </FooterInfoContainer>
        <div style={{ flex: 1 }} />
        <CopyrightInfoBox>
          Copyright 북극성 All rights reserved.
        </CopyrightInfoBox>
      </FooterbarContainer>
    </>
  );
};

const FooterbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(#2c2c60, #4659a9);
  height: 380px;
  padding: 40px;
`;

const FooterInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media all and (max-width: 450px) {
    flex-direction: column;
  }
`;

const TeamInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 100px;
`;

const ContentDevInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactInfoBox = styled.div`
  margin-bottom: 50px;
  @media all and (max-width: 450px) {
    margin-bottom: 10px;
  }
`;

const DeveloperInfoBox = styled.div``;

const CopyrightInfoBox = styled.div`
  color: white;
  font-color: 16px;
  font-family: "KOTRA_GOTHIC";
`;

const TitleText = styled.div`
  color: white;
  font-size: 30px;
  font-weight: 700;
  font-family: "KOTRA_BOLD";
  @media all and (max-width: 450px) {
    font-size: 25px;
  }
`;

const ContentText = styled.div`
  color: white;
  font-size: 16px;
  font-family: "KOTRA_GOTHIC";
`;

export default FooterBar;
