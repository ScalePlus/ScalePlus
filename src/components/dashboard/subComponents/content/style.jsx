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
    margin-bottom: 20px;
  }
  .block {
    height: 100%;
    background: #fafafa;
  }
  .header {
    padding: 10px 0px;
    background-color: #fdfdfd;
  }
  .header,
  .content,
  .inner-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  .content {
    padding: 20px 20px;
  }
  .outer-content {
    padding: 10px 20px;
  }
  .name {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }
  .sub-name {
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.small};
  }
  .grey-button {
    cursor: pointer;
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.small};
  }
`;

export const AddButton = styled.button`
  text-align: center;
  border: none;
  background: none;
  padding: 0;
  :focus {
    outline: 0;
  }
  .button-text {
    cursor: pointer;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.regular};
  }
  :after {
    content: "+";
    color: ${theme.colors.yellow};
    font-family: ${theme.fontFamily.bold};
  }
`;
