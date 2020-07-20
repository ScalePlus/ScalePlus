import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .alert-danger {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold};
  }
  .thankyou-text {
    text-align: ${theme.isLTR ? "left" : "right"};
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
          margin-right: ${theme.isLTR && "10px"};
          margin-left: ${theme.isRTL && "10px"};
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
        text-align: ${theme.isLTR ? "left" : "right"};
        .icon-container {
          flex: auto;
        }
        .name {
          flex: auto;
          font-size: ${theme.fontSize.semiRegular};
        }
        .button-container {
          flex: auto;
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

  .filter-container {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 2px solid #979797;
    .controll-container {
      flex: 1;
      align-items: center;
      @media (min-width: 576px) {
        flex: 1;
      }
      @media (min-width: 768px) {
        flex: 0.8;
      }
      @media (min-width: 992px) {
        flex: 0.5;
      }
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 1rem;

      .form-group:first-child {
        flex: 0.3;
        margin-right: ${theme.isLTR && "20px"};
        margin-left: ${theme.isRTL && "20px"};
        margin-bottom: 0px;
      }
      .form-group:nth-child(2) {
        flex: 0.5;
        margin-right: ${theme.isLTR && "20px"};
        margin-left: ${theme.isRTL && "20px"};
        margin-bottom: 0px;
        .form-control {
          height: 40px;
        }
      }
      .text {
        flex: 0.1;
        color: ${theme.colors.gray};
        cursor: pointer;
      }
    }
  }

  .new-block {
    text-align: ${theme.isLTR ? "left" : "right"};
    cursor: pointer;
    border: 1px solid ${theme.colors.mediumgray};
    padding: 1rem;
    border-radius: 6px;
    background-color: ${theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    .basic-information {
      display: flex;
      align-items: center;
      .user-name {
        margin-right: ${theme.isLTR && "1rem"};
        margin-left: ${theme.isRTL && "1rem"};
      }
    }
    .challenge-name {
      font-family: ${theme.fontFamily.bold};
    }
    .status-container {
      padding: 2px 8px;
      border: 1px solid;
      border-radius: 6px;
      font-size: ${theme.fontSize.extraSmall};
      font-family: ${theme.fontFamily.bold};
    }
  }
`;
