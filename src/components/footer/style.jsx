import styled from "styled-components";
import theme from "../../theme";
export const MainContainer = styled.div`
  .group-container {
    height: 130px;
    background-color: ${theme.colors.whiteSmokeTint2};
    background-image: url("/images/partner-bg.png");
    background-size: cover;
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
        font-family: ${theme.fontFamily.regular};
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
        margin-left: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .link {
      margin-right: 30px;
    }
  }
`;
