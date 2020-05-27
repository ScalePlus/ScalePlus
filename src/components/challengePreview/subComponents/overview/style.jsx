import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  text-align: left;
  .image-box-container {
    margin-bottom: 20px;
  }
  .left-container {
    height: 400px;
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: 6px;
    background-color: ${theme.colors.white};
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right-container {
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
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.mediumRegular};

      .stage-container {
        margin-right: 120px;
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
    margin-bottom: 45px;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.medium};
  }

  .header-container {
    align-items: center;
    margin-bottom: 45px;
  }

  .image-container {
    margin-bottom: 45px;
    height: 500px;
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: 6px;
    background-color: ${theme.colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
