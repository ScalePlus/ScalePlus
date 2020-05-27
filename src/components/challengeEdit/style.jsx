import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  .form-control {
    padding: 10px;
    height: 40px;
  }
  .text-label {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold} !important;
    font-size: ${theme.fontSize.regular};
  }
  textarea.form-control {
    height: auto;
  }
  .banner-input {
    height: 220px;
    cursor: pointer;
  }
  .navbar {
    padding: 0px;
    margin-bottom: 10px;
    border-radius: 8px;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.whiteSmokeTint1};
  }

  .custom-sidebar {
    text-alignt: left;
    .title {
      padding: 15px;
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.semiRegular};
      border-radius: 6px;
      background-color: ${theme.colors.whiteSmokeTint1};
    }
    .navbar-nav {
      padding: 0 20px;
    }
    .nav-item:not(:last-child) {
      border-bottom: 1px solid ${theme.colors.whiteSmokeTint1};
    }
    .nav-link {
      cursor: pointer !important;
      color: ${theme.colors.black} !important;
      font-family: ${theme.fontFamily.regular} !important;
      font-size: ${theme.fontSize.semiRegular} !important;
      padding: 0.5rem 0rem !important;
    }
    .nav-item.show .nav-link,
    .nav-link.active {
      color: ${theme.colors.black} !important;
      font-family: ${theme.fontFamily.bold} !important;
    }
    .nav-link:focus,
    .nav-link:hover {
      text-decoration: none !important;
      outline: none !important;
    }
  }
  .button-container {
    margin: 20px 0px;
    button {
      padding: 15px;
      width: 100%;
      .button-text {
        font-size: ${theme.fontSize.semiRegular};
      }
    }
  }
  .content-container {
  }
`;
