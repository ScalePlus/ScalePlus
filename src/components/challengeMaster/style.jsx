import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;
  .form-control {
    padding: 10px;
    height: 40px;
  }
  textarea.form-control {
    height: auto;
  }
  .banner-input {
    height: 220px;
    cursor: pointer;
  }
  .sub-container {
    margin-top: 50px;
    text-align: left;
  }
  .title {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.mediumLarge};
    font-weight: 600;
    margin: 10px -15px;
  }
  .sub-title {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.mediumSmall};
  }
  .tabs-container {
    margin-top: 35px;
  }
  .box-container {
    min-height: 300px;
    margin-bottom: 1rem;
    background-color: ${theme.colors.white};
    text-align: center;
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    cursor: pointer;
    padding: 10px;
    .image-container {
      margin: 25px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    .tab-title {
      margin-bottom: 20px;
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.mediumSmall};
      font-weight: 600;
    }
    .description {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.regular};
    }
  }
  .right-content-container {
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.extraSmall};
    text-align: right;
    margin: 35px -15px;
  }
  .button-container {
    text-align: center;
  }
  .bottom-container {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.small};
    text-align: left;
    margin: 45px -15px;
    .contact-link {
      font-weight: 600;
      cursor: pointer;
    }
  }
  .form-container {
    margin-top: 35px;
  }
`;
