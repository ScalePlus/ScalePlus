import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
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
  .custom-sidebar {
    text-alignt: left;
    border: 1px solid #f3f3f3;
    border-radius: 8px;
    background-color: ${theme.colors.white};
    .title {
      padding: 0.7rem 0.5rem;
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.mediumRegular};
      border-radius: 6px;
      background-color: #f3f3f3;
    }
    .nav {
      padding: 0rem 0.5rem;
    }
    .nav-item:not(:last-child) {
      border-bottom: 1px solid #f3f3f3;
    }
    .nav-link {
      cursor: pointer;
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.mediumRegular};
      padding: 0.5rem 0rem;
    }
    .nav-item.show .nav-link,
    .nav-link.active {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.bold};
    }
    .nav-link:focus,
    .nav-link:hover {
      text-decoration: none;
      outline: none;
    }
  }
  .button-container {
    margin-top: 40px;
    button {
      padding: 15px;
      width: 100%;
      .button-text {
        font-size: ${theme.fontSize.mediumRegular};
      }
    }
  }
  .content-container {
  }
`;
