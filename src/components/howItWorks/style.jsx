import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  .subscribe-container,
  .time-container,
  .expert-container,
  .expect-container {
    padding: 80px 0px;
    background-color: ${theme.colors.white};
  }
  .subscribe-container {
    background-image: url("/images/workflow-subscribe-banner@2x.png");
    background-size: cover;
    min-height: 600px;
    display: flex;
    align-items: center;
  }
  .title {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.xxLarge};
  }
  .desscription {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.extraMedium};
    padding: 60px 0px;
  }
  .button-container {
    button {
      .button-text {
        font-size: ${theme.fontSize.medium};
      }
    }
  }
  .subscribe-container .button-container button {
    padding: 20px 70px;
  }
  .time-container .button-container button {
    padding: 20px 50px;
  }
  .timer-image-container,
  .image-container,
  .live-image-container {
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .timer-image-container {
    @media (min-width: 576px) {
      justify-content: center;
    }

    @media (min-width: 768px) {
      justify-content: center;
    }

    @media (min-width: 992px) {
      justify-content: flex-start;
    }
  }
  .live-image-container {
    @media (min-width: 576px) {
      justify-content: center;
    }

    @media (min-width: 768px) {
      justify-content: center;
    }

    @media (min-width: 992px) {
      justify-content: flex-end;
    }
  }
  .image-container {
    justify-content: center;
  }
  .expert-container {
    background-image: url("/images/subscribe-banner@2x.png");
    min-height: 600px;
    display: flex;
    align-items: center;
  }
  .expert-container .button-container button {
    background: ${theme.colors.white};
    padding: 20px 50px;
  }
  .expect-container {
    .title {
      text-align: center;
      padding-bottom: 15px;
    }
    .text {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.extraMedium};
    }
    .content-bar {
      padding: 15px 0px;
    }
  }
`;
