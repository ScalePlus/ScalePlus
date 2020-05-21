import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .ql-editor {
    min-height: 500px;
  }
  .ql-container {
    border: 1px solid ${theme.colors.border_gray};
    border-top: none;
  }
`;
