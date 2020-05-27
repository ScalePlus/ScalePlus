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
    background: ${theme.colors.gray98};
  }
  .header {
    padding: 10px 0px;
    background-color: ${theme.colors.lightWhite};
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
    font-size: ${theme.fontSize.semiRegular};
  }
  .count {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.semiRegular};
    margin-left: 5px;
  }
  .content-container {
    padding-top: 25px;
  }
  .content {
    padding: 0px 10px;
    margin-top: 7px;
    margin-bottom: 33px;
  }
  .outer-content {
    padding: 7px 10px;
  }
  .inner-content {
    margin-top: 5px;
  }
  .name {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
    line-height: 16px;
  }
  .sub-name {
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.small};
    letter-spacing: 0;
    line-height: 14px;
  }
  .grey-button {
    cursor: pointer;
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.small};
    letter-spacing: 0;
    line-height: 14px;
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
