import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .header-container {
    .title-text {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.mediumLarge};
      line-height: 40px;
    }
  }
  .tab-title-text,
  .tab-main-text,
  .active-tab .tab-main-text {
    color: ${theme.colors.black} !important;
    font-family: ${theme.fontFamily.bold} !important;
    font-size: ${theme.fontSize.regular} !important;
  }
  .active-tab {
    border-color: ${theme.colors.yellow};
  }
  .custom-tab-container {
    margin-top: 10px;
    margin-bottom: 15px;
  }
  .custom-tab {
    margin-right: 15px;
    margin-bottom: 15px;
    float: left;
  }
  button {
    padding: 10px 20px;
  }
  .button-text {
    font-size: ${theme.fontSize.semiRegular};
  }
  .close-button-container {
    height: 50px;
    width: 140px;
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    background-color: ${theme.colors.white};
    position: absolute;
    right: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.extraLarge};
    top: 0px;

    @media (min-width: 768px), @media (min-width: 992px) {
      top: 130px;
    }
  }
`;
