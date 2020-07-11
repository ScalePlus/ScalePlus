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
  .border-container {
    border: 1px solid ${theme.colors.borderGrey};
    margin: 1.5rem 0rem;
  }

  .switch-container {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    .form-group {
      margin-bottom: 8px;
    }
  }
  .left-text {
    margin-right: ${theme.isLTR && "10px"};
    margin-left: ${theme.isRTL && "10px"};
  }

  .bottom-button-container {
    display: flex;
    float: ${theme.isLTR ? "right" : "left"};
    button:first-child {
      margin-right: ${theme.isLTR && "10px"};
      margin-left: ${theme.isRTL && "10px"};
    }
  }
`;
