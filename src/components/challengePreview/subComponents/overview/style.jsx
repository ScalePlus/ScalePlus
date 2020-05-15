import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  text-align: left;
  .left-container {
    height: 400px;
    border: 1px solid ${theme.colors.border_gray};
    border-radius: 6px;
    background-color: ${theme.colors.white};
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right-container {
    height: 400px;
    margin-bottom: 25px;
    overflow: auto;
    h2 {
      margin-bottom: 25px;
      font-size: ${theme.fontSize.semiLarge};
    }
    .tab-container {
      margin-bottom: 25px;
      span {
        padding: 5px 10px;
        margin-right: 5px;
        border-radius: 12px;
        color: ${theme.colors.white};
        font-family: ${theme.fontFamily.regular};
        font-size: ${theme.fontSize.extraSmall};
        background-color: ${theme.colors.black};
      }
    }
    .sub-text-container {
      margin-bottom: 60px;
      span {
        margin-right: 5px;
        color: ${theme.colors.black};
        font-family: ${theme.fontFamily.regular};
        font-size: ${theme.fontSize.medium};
      }
    }
    .bottom-container {
      display: flex;
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.mediumSmall};
      font-weight: 600;
      .stage-container {
        margin-right: 150px;
      }
      .title-text {
        color: ${theme.colors.gray};
      }
      .sub-text {
        color: ${theme.colors.black};
      }
    }
  }
`;

export const ContentContainer = styled.div`
  .description {
    margin-bottom: 40px;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.extraMedium};
  }

  .image-container {
    margin-bottom: 40px;
    height: 500px;
    border: 1px solid ${theme.colors.border_gray};
    border-radius: 6px;
    background-color: ${theme.colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
