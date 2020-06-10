import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  .subscribe-container,
  .time-container,
  .expert-container,
  .expect-container {
    padding: 80px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${theme.colors.white};
  }
  .subscribe-container {
    background-image: url("/images/workflow-subscribe-banner@2x.png");
    background-size: cover;
    min-height: 600px;
  }
  .title {
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.xxLarge};
  }
  .subscribe-container .description {
    padding: 50px 0px;
  }
  .time-container .description {
    padding: 40px 0px;
  }
  .expert-container .description {
    padding: 25px 0px;
  }

  .description {
    font-size: ${theme.fontSize.extraMedium};
  }

  .button-container {
    button {
      .button-text {
        font-size: ${theme.fontSize.medium};
      }
    }
  }

  .subscribe-container .information-text {
    padding: 20px 30px;
    font-family: ${theme.fontFamily.bold};
  }

  .time-container .information-text {
    padding: 20px 35px;
    font-family: ${theme.fontFamily.bold};
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
    height: 340px;
    width: 360px;
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
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
    height: 340px;
    width: 340px;
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
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
    background-image: url("/images/plus-yellow.png");
    background-repeat: no-repeat;
    background-position: 0px -120px;
    background-color: ${theme.colors.yellow};
    min-height: 600px;
    display: flex;
    align-items: center;
  }
  .expert-container .button-container button {
    border: none;
    padding: 20px 50px;
  }
  .expect-container {
    background-image: url("/images/plus.png");
    background-repeat: no-repeat;
    background-position: 100% 35%;
    .title {
      text-align: center;
      padding-bottom: 15px;
    }
    .text {
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.extraMedium};
    }
    .content-bar {
      padding: 15px;
    }
  }
`;
