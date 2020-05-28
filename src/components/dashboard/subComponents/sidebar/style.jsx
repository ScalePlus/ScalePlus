import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  margin-bottom: 25px;
  .navbar {
    padding: 0px;
    background-color: ${theme.colors.whiteSmokeTint3} !important;
  }

  .navbar-nav {
    min-height: 450px;
    padding: 15px 20px;
    flex: auto !important;
  }
  .nav-item:not(:last-child) {
    border-bottom: 1px solid ${theme.colors.whiteSmokeTint1};
  }
  .nav-link {
    cursor: pointer !important;
    color: ${theme.colors.black} !important;
    font-family: ${theme.fontFamily.regular} !important;
    font-size: ${theme.fontSize.mediumRegular} !important;
    padding: 0.5rem 0rem !important;
  }
  .nav-item.show .nav-link,
  .nav-link.active {
    color: ${theme.colors.black};!important;
    font-family: ${theme.fontFamily.bold}!important;
  }
  .nav-link.active:after {
    content: ">";
    margin-left: 5px;
    color: ${theme.colors.yellow};
  }
  .nav-link:focus,
  .nav-link:hover {
    text-decoration: none;
    outline: none;
  }
`;
