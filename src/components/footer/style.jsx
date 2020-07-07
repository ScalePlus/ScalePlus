import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  .group-container {
    min-height: 130px;
    background-color: ${theme.colors.whiteSmokeTint2};
    background-image: url("/images/partner-bg.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .groups {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }
  .subscribe-container {
    min-height: 100px;
    background-image: url("/images/subscribe-banner.png");
    background-size: cover;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 70px 0px;
  }
  .content-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .content-container {
    .text {
      font-size: ${theme.fontSize.mediumRegular};
      font-family: ${theme.fontFamily.bold};
      text-align: center;
      @media (min-width: 992px) {
        margin-right: ${theme.isLTR && "40px"};
        margin-left: ${theme.isRTL && "40px"};
      }
    }
    .form-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      flex: 1;
      .form-group {
        flex: 0.7;
        margin-right: ${theme.isLTR && "10px"};
        margin-left: ${theme.isRTL && "10px"};
        .form-control {
          height: 40px;
        }
      }
      button {
        flex: 0.3;
        border: none;
        width: 100%;
        padding: 8px 0px;
        .button-text {
          font-size: ${theme.fontSize.semiRegular};
        }
      }
    }
    .text,
    .form-group,
    button {
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }
  .middle-container {
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 40px;
  }
  .links-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .link {
      margin-bottom: 10px;
      a {
        color: ${theme.colors.gray};
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.mediumRegular};
        :hover {
          text-decoration: none;
        }
      }
    }
  }
  .logo-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .sub-links-container,
  .social-links-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .link {
      margin: 10px;
      a {
        color: ${theme.colors.black};
        font-size: ${theme.fontSize.mediumRegular};
        :hover {
          text-decoration: none;
        }
      }
    }
  }
  .social-links-container {
    .links {
      display: flex;
      .circle-container {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-color: ${theme.colors.black};
        margin-left: ${theme.isLTR && "5px"};
        margin-right: ${theme.isRTL && "5px"};
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .link {
      margin-right: ${theme.isLTR && "30px"};
      margin-left: ${theme.isRTL && "30px"};
    }
  }
`;
