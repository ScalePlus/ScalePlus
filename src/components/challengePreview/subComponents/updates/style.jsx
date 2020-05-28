import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .center-alignment {
    align-items: center;
  }
  .header-container {
    margin-bottom: 40px;
  }
`;

export const ContentContainer = styled.div`
  margin-bottom: 15px;
  .collapse-container {
    text-align: left;
    padding: 15px 10px;
    min-height: 90px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background-color: ${theme.colors.white};
  }
  .content-container {
    margin-bottom: 10px;
    .title {
      font-family: ${theme.fontFamily.bold};
      margin-right: 30px;
    }
    .timestamp {
      color: ${theme.colors.gray};
      font-size: ${theme.fontSize.small};
    }
    span {
      vertical-align: middle;
    }
  }
`;
