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
  .upload-button {
    position: absolute;
    margin-top: -36px;
    right: ${theme.isLTR && "0"};
    left: ${theme.isRTL && "0"};
    margin-right: ${theme.isLTR && "13px"};
    margin-left: ${theme.isRTL && "13px"};
    border-radius: 6px;
    padding: 3px 30px;
    border-color: rgba(0, 0, 0, 0.5);
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    :hover,
    :focus,
    :not(:disabled):not(.disabled):active,
    :not(:disabled):not(.disabled):active:focus {
      color: ${theme.colors.black};
      border-color: rgba(0, 0, 0, 0.5);
      background-color: ${theme.colors.white};
      box-shadow: none;
    }
  }
  .fileContainer {
    margin-bottom: 1rem;
    .form-group {
      margin-bottom: 0;
    }
    .info-text {
    }
  }
`;
