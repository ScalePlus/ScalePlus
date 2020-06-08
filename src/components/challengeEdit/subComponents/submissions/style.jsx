import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .circle-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .elegiable-circle {
      height: 12px;
      width: 12px;
      border-radius: 50%;
      background-color: #7ed321;
    }
  }

  .selected-row-container {
    .inline-block {
      display: flex;
    }
    .block,
    .inline-block {
      padding: 1rem;
      margin-bottom: 1rem;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 6px;
      background-color: ${theme.colors.white};
      .regular-text {
        margin-bottom: 5px;
      }
      .regular-bold {
        font-family: ${theme.fontFamily.bold};
        margin-bottom: 10px;
      }
      .bold-semi-large-text {
        font-size: ${theme.fontSize.mediumRegular};
        font-family: ${theme.fontFamily.bold};
      }
      .download-block {
        width: 100%;
        @media (min-width: 576px) {
          width: 100%;
        }

        @media (min-width: 768px) {
          width: 50%;
        }

        @media (min-width: 992px) {
          width: 50%;
        }

        display: flex;
        align-items: center;
        padding-top: 15px;
        text-align: left;
        .icon-container {
          flex: 0.1;
        }
        .name {
          flex: 0.5;
          font-size: ${theme.fontSize.semiRegular};
        }
        .button-container {
          flex: 0.4;
          button {
            width: 100%;
            .button-text {
              font-size: ${theme.fontSize.semiRegular};
            }
          }
        }
      }
    }
  }
`;
