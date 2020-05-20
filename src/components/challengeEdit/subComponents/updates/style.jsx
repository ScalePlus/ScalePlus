import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .box-container {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    background-color: ${theme.colors.white};
    padding: 20px;
    display: flex;
    margin-bottom: 1rem;
    .custom-editor {
      min-height: 100px;
    }
    .remove-container {
      cursor: pointer;
      height: 40px;
      width: 40px;
      border-radius: 6px;
      background-color: #e49393;
      margin-left: 15px;
      justify-content: center;
      align-items: center;
      display: flex;
    }
  }
`;
