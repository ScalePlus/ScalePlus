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
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.mediumRegular};
  }
  .count {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumRegular};
    margin-left: 5px;
  }
  .content-container {
    background: #fafafa;
    padding: 0px 20px;
    .content-title {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.regular};
    }
    .description {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.regular};
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
