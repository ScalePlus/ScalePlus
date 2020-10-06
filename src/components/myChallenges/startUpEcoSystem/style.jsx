import styled from "styled-components";
import theme from "../../../theme";

export const MainContainer = styled.div`
  background-color: ${theme.colors.whiteSmokeTint4};
  margin-bottom: 3rem;
  .title-text {
    font-size: ${theme.fontSize.large};
    font-family: ${theme.fontFamily.bold};
  }
  .sub-title-text {
    font-size: ${theme.fontSize.title};
    font-family: ${theme.fontFamily.bold};
  }
  .list-container {
    margin-top: 1rem;
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    background-color: ${theme.colors.white};
    padding: 1rem;
    .block {
      cursor: pointer;
      border-bottom: 1px solid ${theme.colors.mediumgray};
      padding: 0.5rem;
      display: flex;
      align-items: center;
      .avtar-container {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #979797;
        background-color: ${theme.colors.white};
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: ${theme.isRTL && "0.5rem"};
        margin-right: ${theme.isLTR && "0.5rem"};
        .default_img {
          height: 15px;
          width: 15px;
        }
        .user_img {
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
      }
      .user-name {
        font-family: ${theme.fontFamily.semi_bold};
      }
    }
  }
`;
