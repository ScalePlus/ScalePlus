import styled from "styled-components";
import theme from "../../theme";

export const Container = styled.div`
  align-items: center;
  .navbar {
    min-height: 80px;
    background-color: ${theme.colors.white} !important;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.15);
  }

  .navbar-brand {
    margin-right: ${theme.isLTR && "45px"};
    margin-left: ${theme.isRTL && "45px"};
  }

  .nav-link,
  .navbar-text {
    cursor: pointer !important;
    color: ${theme.colors.black} !important;
    font-family: ${theme.fontFamily.bold} !important;
    font-size: ${theme.fontSize.mediumRegular} !important;
    padding: 5px 15px !important;
  }

  .navbar-text {
    padding: 5px !important;
  }

  .notification-container {
    display: flex;
  }

  .bell-img {
    margin-left: ${theme.isLTR && "10px"};
    margin-right: ${theme.isRTL && "10px"};
  }

  .notification-circle {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-right: ${theme.isLTR ? "20px" : "-9px"};
    margin-left: ${theme.isLTR ? "-9px" : "20px"};
    margin-top: 7px;
  }

  .notification-menu {
    width: 100%;
    padding: 0px;
    border-radius: 6px;
    right: ${theme.isLTR ? "auto" : 0};
    left: ${theme.isLTR ? 0 : "auto"};

    @media (min-width: 576px),
      @media (min-width: 768px),
      @media (min-width: 992px) {
      width: 450px;
    }
    @media (min-width: 992px) {
      right: ${theme.isLTR ? 0 : "auto"};
      left: ${theme.isLTR ? "auto" : 0};
    }

    .dropdown-item {
      padding: 0px;
      :active {
        color: ${theme.colors.black};
        text-decoration: none;
        background-color: ${theme.colors.white};
      }
    }
    .dropdown-item:not(:last-child) {
      border-bottom: 1px solid ${theme.colors.black};
    }
  }

  .search-img {
    margin-right: ${theme.isLTR ? "5px" : "10px"};
    margin-left: ${theme.isLTR ? "10px" : "5px"};
    .search-text {
      margin-left: ${theme.isLTR && "5px"};
      margin-right: ${theme.isRTL && "5px"};
      vertical-align: middle;
    }
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
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumRegular};
    padding-left: ${theme.isLTR ? "15px" : "0px"} !important;
    padding-right: ${theme.isLTR ? "0px" : "15px"} !important;
    .nav-link {
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
    .dropdown-menu {
      @media (min-width: 992px) {
        left: ${theme.isLTR && "-75px"};
        right: ${theme.isRTL && "-75px"};
      }
    }
    .dropdown-item,
    .dropdown-item.active,
    .dropdown-item:active {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.regular};
    }
    .dropdown-item.active,
    .dropdown-item:active {
      background-color: ${theme.colors.lightWhite};
    }
    .dropdown-toggle::after {
      display: none;
    }
  }

  .switch-container {
    width: 115px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: ${theme.isLTR && "1rem"};
    margin-right: ${theme.isRTL && "1rem"};
    .form-group {
      margin-bottom: 5px;
    }
    font-size: ${theme.fontSize.mediumRegular};
    font-family: ${theme.fontFamily.bold};
  }
  .left-text {
    margin-right: ${theme.isLTR && "10px"};
    margin-left: ${theme.isRTL && "10px"};
  }
`;
