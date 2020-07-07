import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  textarea.form-control {
    min-height: 100px;
  }
  .danger-button-container {
    top: 5.5rem;
    position: absolute;
    right: ${theme.isLTR && "0"};
    left: ${theme.isRTL && "0"};
    margin-right: ${theme.isLTR && "20px"};
    margin-left: ${theme.isRTL && "20px"};
  }
`;
