import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  padding: 40px 20px;
  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      display: flex;
      align-items: center;
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.mediumLarge};
      cursor: pointer;
    }
  }
  .right-container {
    display: flex;
    align-items: center;
    .input-container {
      flex: auto;
      margin-right: ${theme.isLTR && "1rem"};
      margin-left: ${theme.isRTL && "1rem"};
      .form-group {
        margin-bottom: 0;
        .form-control {
          height: 50px;
        }
      }
    }
  }
`;
