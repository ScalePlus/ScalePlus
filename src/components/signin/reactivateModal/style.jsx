import styled from "styled-components";
import theme from "../../../theme";

export const HeaderContainer = styled.div`
  min-height: 80px;
  background-image: url("/images/subscribe-banner.png");
  background-size: cover;
  border-radius: 10px 10px 0 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${theme.fontFamily.bold};
  font-size: ${theme.fontSize.extraMedium};
`;

export const ContentContainer = styled.div`
  padding: 30px 40px;
  .form-control {
    height: 40px;
  }
  .subscribed-text {
    color: ${theme.colors.black};
    font-size: ${theme.fontSize.semiRegular};
    margin-bottom: 58px;
  }
  .help-text {
    opacity: 0.4;
    color: ${theme.colors.black};
    font-size: ${theme.fontSize.semiRegular};
  }
  button {
    width: 100%;
    margin-top: 30px;
    padding: 18px 0px;
    .button-text {
      font-size: ${theme.fontSize.semiRegular};
    }
  }
`;
