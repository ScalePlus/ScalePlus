import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  text-align: ${theme.isLTR ? "left" : "right"};
  .image-box-container {
    margin-bottom: 20px;
  }
  .left-container {
    height: 400px;
    border-radius: 6px;
    background-color: ${theme.colors.white};
    margin-bottom: 25px;
    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
      border-radius: 6px;
    }
  }
  .right-container {
    margin-bottom: 25px;
    h2 {
      margin-bottom: 25px;
      font-size: ${theme.fontSize.semiLarge};
    }
    .tab-container {
      margin-bottom: 25px;
      span {
        padding: 5px 10px;
        margin-right: ${theme.isLTR && "5px"};
        margin-left: ${theme.isRTL && "5px"};
        border-radius: 12px;
        color: ${theme.colors.white};
        font-size: ${theme.fontSize.extraSmall};
        background-color: ${theme.colors.black};
      }
    }
    .sub-text-container {
      overflow: auto;
      span {
        margin-right: ${theme.isLTR && "5px"};
        margin-left: ${theme.isRTL && "5px"};
        font-size: ${theme.fontSize.medium};
      }
    }
    .bottom-container {
      display: flex;
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.mediumRegular};

      .stage-container {
        margin-right: ${theme.isLTR && "120px"};
        margin-left: ${theme.isRTL && "120px"};
      }
      .title-text {
        color: ${theme.colors.gray};
      }
    }
    .button-container {
      margin-top: 20px;
      button {
        width: 100%;
        padding: 15px;
        .button-text {
          font-size: ${theme.fontSize.semiRegular};
        }
      }
    }
  }
`;

export const ContentContainer = styled.div`
  .description {
    font-size: ${theme.fontSize.medium};
  }

  .header-container {
    align-items: center;
    margin-bottom: 45px;
  }

  .video-container {
    margin-top: 45px;
    height: 500px;
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: 6px;
    background-color: ${theme.colors.white};
  }

  .button-container {
    margin-top: 45px;
    button {
      width: 100%;
      padding: 15px;
      .button-text {
        font-size: ${theme.fontSize.semiRegular};
      }
    }
  }
`;
