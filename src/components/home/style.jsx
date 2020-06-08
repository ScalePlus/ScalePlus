import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  .home-container {
    padding: 80px 0px;
    background-color: ${theme.colors.white};
  }
  .home-container {
    background-image: url("/images/main-banner.png");
    background-size: cover;
    height: 770px;
  }
  .title {
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.xxLarge};
    line-height: 60px;
    margin-top: 30px;
  }
  .description {
    font-size: ${theme.fontSize.extraMedium};
    line-height: 30px;
    margin-top: 30px;
    a {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.bold};
      :hover {
        text-decoration: none;
      }
    }
  }
  .blocks {
    margin-top: -22%;
  }
  .box-container {
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    background-color: ${theme.colors.white};
    padding: 35px;
    cursor: pointer;
    :hover {
      box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.25);
    }
    .image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 130px;
      object-fit: cover;
    }
    .box-title {
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.large};
      margin-top: 15px;
    }
    .description {
      font-size: ${theme.fontSize.extraMedium};
      margin-top: 10px;
    }
    .button-container {
      margin-top: 20px;
      button {
        width: 100%;
        .button-text {
          font-size: ${theme.fontSize.mediumRegular};
        }
      }
    }
  }
  .challenge-list {
    margin-top: 80px;
  }
`;
