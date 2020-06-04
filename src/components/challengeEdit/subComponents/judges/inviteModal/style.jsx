import styled from "styled-components";
import theme from "../../../../../theme";

export const ContentContainer = styled.div`
  .form-control {
    padding: 10px;
    height: 40px;
  }
  .text-label {
    font-family: ${theme.fontFamily.bold} !important;
  }
  textarea.form-control {
    height: auto;
  }

  .bottom-button-container {
    display: flex;
    float: right;
    button:first-child {
      margin-right: 10px;
    }
  }
`;
