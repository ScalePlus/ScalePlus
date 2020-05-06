import styled from "styled-components";
import theme from "../../theme";

export const TitleContainer = styled.span`
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.title};
  font-weight: bold;
  .icon-container {
    color: ${theme.colors.yellow};
    font-weight: bold;
    cursor: pointer;
  }
`;

export const DescriptionContainer = styled.span`
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.regular};
  opacity: 0.5;
  color: ${theme.colors.black};
`;

export const ButtonContainer = styled.div`
  text-align: center;
  .button-text {
    cursor: pointer;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.medium};
    font-weight: bold;
  }
  .icon-container {
    color: ${theme.colors.yellow};
    font-size: ${theme.fontSize.medium};
    font-family: ${theme.fontFamily.bold};
    cursor: pointer;
  }
`;

export const BackButtonContainer = styled.div`
  text-align: left;
  .back-button-text {
    cursor: pointer;
    opacity: 0.4;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.medium};
  }
`;

export const TabContainer = styled.div`
  .tab-sub-container {
    text-align: center;
    border: 1px solid ${theme.colors.black};
    border-radius: 6px;
    background-color: ${theme.colors.white};
    padding: 15px 0px;
    .tab-main-text {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.regular};
    }
    .tab-sub-text {
      opacity: 0.5;
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.small};
    }
  }
`;
