import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  align-items: center;
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  .row > [class*="col-"] {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
  }
  .block,
  .content-container {
    height: 100%;
  }
  .header {
    background: transparent;
    margin-bottom: 20px;
  }
  .title {
    color: ${theme.colors.gray};
    font-size: ${theme.fontSize.semiRegular};
  }
  .count {
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.semiRegular};
    margin-left: ${theme.isLTR && "5px"};
    margin-right: ${theme.isRTL && "5px"};
  }
  .content-container {
    background: ${theme.colors.gray98};
    padding: 0px 20px;
    .content-title {
      font-family: ${theme.fontFamily.bold};
    }
    .description {
    }
    .border-cotainer {
      padding: 10px 0px;
      :not(:last-child) {
        border-bottom: 1px solid #e9e9e9;
      }
    }
    .bottom-button-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0px;
    }
  }
`;
