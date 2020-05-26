import styled from "styled-components";
import theme from "../../theme";
export const Container = styled.div`
  align-items: center;
  .navbar {
    min-height: 80px;
    border-bottom: 1px solid ${theme.colors.border_gray} !important;
    background-color: ${theme.colors.white} !important;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.15);
    padding: 0 !important;
  }

  .navbar-brand {
    margin-right: 45px;
  }

  .nav-link,
  .navbar-text {
    cursor: pointer !important;
    color: ${theme.colors.black} !important;
    font-family: ${theme.fontFamily.bold} !important;
    font-size: ${theme.fontSize.mediumSmall} !important;
    padding: 5px 15px !important;
  }

  .navbar-text {
    padding: 5px !important;
  }

  .search-img {
    margin-right: 5px;
    margin-left: 10px;
  }

  .nav-link {
    margin-top: 5px;
    border-bottom: 5px solid transparent;
  }
  .nav-item.show .nav-link,
  .nav-link.active {
    color: ${theme.colors.black} !important;
    font-family: ${theme.fontFamily.bold} !important;
    border-bottom: 5px solid ${theme.colors.yellow};
  }
  .nav-link:focus,
  .nav-link:hover {
    text-decoration: none !important;
    outline: none !important;
  }

  .action-container .nav-item.show .nav-link,
  .action-container .nav-link.active {
    border-bottom: 5px solid transparent;
  }

  .action-container {
    cursor: pointer;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumSmall};
    .nav-link {
      padding-left: 15px !important;
      padding-right: 0px !important;
    }
    .dropdown-menu {
      @media (min-width: 992px) {
        left: -70px;
      }
    }
    .dropdown-item {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.regular};
    }
    .dropdown-item.active,
    .dropdown-item:active {
      background-color: ${theme.colors.lightGray};
    }
    .dropdown-toggle::after {
      display: none;
    }
  }
`;
