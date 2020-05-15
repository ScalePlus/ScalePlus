import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div``;

export const ContentContainer = styled.div`
  margin-bottom: 15px;
  .collapse-container {
    text-align: left;
    padding: 10px;
    min-height: 90px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }
  .content-container {
    margin-bottom: 5px;
    .title {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.regular};
      margin-right: 30px;
      font-weight: 600;
    }
    .timestamp {
      color: ${theme.colors.gray};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.small};
    }
  }
`;
