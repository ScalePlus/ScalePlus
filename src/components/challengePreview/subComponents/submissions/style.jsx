import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .alert-danger {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold};
  }

  button {
    padding: 10px 60px;
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
    border: 1px solid #d9d9d9;
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
  .not-valid {
    border: 2px solid #d86e6e;
  }
`;
