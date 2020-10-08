import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .box-container {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    background-color: ${theme.colors.white};
    padding: 1rem 1rem 0px 1rem;
    margin-bottom: 1rem;
    display: flex;
  }
  .left-container {
    flex: auto;
  }
  .right-container {
    margin-left: ${theme.isLTR && "1rem"};
    margin-right: ${theme.isRTL && "1rem"};
  }
  .form-control,
  .quill {
    background-color: ${theme.colors.alabaster};
  }
  .quill {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 6px;
  }
  .ql-editor {
    min-height: 100px;
  }
  .ql-container,
  .ql-toolbar {
    border: none !important;
    border-radius: 6px;
    background-color: ${theme.colors.alabaster};
  }
`;
