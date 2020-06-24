import styled from "styled-components";
import theme from "../../../../../theme";

export const MainContainer = styled.div`
  .block {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 20px;
    background-color: ${theme.colors.white};
    .left-container {
      min-width: 30rem;
      .title {
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.title};
        margin-bottom: 10px;
      }
      .description {
        font-size: ${theme.fontSize.small};
      }
    }
    .right-container {
      .label-bold {
        font-family: ${theme.fontFamily.bold};
      }
      .label-regular {
        font-family: ${theme.fontFamily.regular};
      }
      .form-control {
        height: 40px;
      }
      textarea.form-control {
        height: auto;
      }
    }
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
    .save-button {
      margin-right: 10px;
      button {
        background-color: #cfcfcf;
        padding: 10px 40px;
      }
    }
  }
`;
