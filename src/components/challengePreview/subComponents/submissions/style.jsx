import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .alert-danger {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold};
  }
  .thankyou-text {
    text-align: left;
    font-size: ${theme.fontSize.extraMedium};
    a {
      font-family: ${theme.fontFamily.bold};
      color: ${theme.colors.black};
      text-decoration: underline;
    }
  }
  .content-container {
    min-height: 500px;
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.semiLarge};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .center-alignment {
    align-items: center;
  }
  .header-container {
    margin-bottom: 40px;
  }
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
  .box-container {
    border: 2px solid #d9d9d9;
    border-radius: 6px;
    background-color: ${theme.colors.white};
    padding: 1rem;
    margin-bottom: 1rem;
    .form-group {
      margin-bottom: 0;
    }
    .text-label {
      font-family: ${theme.fontFamily.bold};
      margin-bottom: 20px;
    }
    .form-control {
      background-color: ${theme.colors.white};
      height: 40px;
    }
    textarea.form-control {
      height: auto;
    }
    .question-button-container {
      display: flex;
      button {
        :first-child {
          margin-right: 10px;
        }
        padding: 10px 15px;
      }
    }
    .checkbox-container {
      .form-group {
        margin-bottom: 1rem;
      }
      .checkbox-label {
        font-size: ${theme.fontSize.semiRegular};
      }
    }
  }
  .was-validated .not-valid {
    border-color: #d86e6e;
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
