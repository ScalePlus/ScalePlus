import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;
  .col-lg-4 {
    padding-right: 8px;
    padding-left: 8px;
  }
  .container {
    @media (min-width: 992px) {
      padding: 0px 40px;
    }
  }
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
  .title-container {
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
    :hover {
      box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.14);
    }
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
  }
  .description {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
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
    margin: 35px -15px;
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
  .challenge-completed-container {
    margin-top: 55px;
    .image-container {
      margin: 25px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  }
  .center-component {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
