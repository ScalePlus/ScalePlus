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
    margin-right: 45px;
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
    margin-left: 10px;
  }

  .notification-circle {
    height: 10px;
    width: 10px;
    background: ${theme.colors.yellow};
    border-radius: 50%;
    margin-right: 20px;
    margin-left: -9px;
    margin-top: 7px;
  }

  .notification-menu {
    width: 100%;
    padding: 0px;
    border-radius: 6px;
    right: auto;
    left: 0;

    @media (min-width: 576px),
      @media (min-width: 768px),
      @media (min-width: 992px) {
      width: 450px;
    }
    @media (min-width: 992px) {
      right: 0;
      left: auto;
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
    margin-right: 5px;
    margin-left: 10px;
    .search-text {
      margin-left: 5px;
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
    padding-left: 15px !important;
    padding-right: 0px !important;
    .nav-link {
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
    .dropdown-menu {
      @media (min-width: 992px) {
        left: -70px;
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
`;
