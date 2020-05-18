import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;
  .preview-container {
    border-radius: 6px;
    background-color: #efefef;
    margin-bottom: 25px;
    padding: 5px;
    h2 {
      opacity: 0.3;
      margin-bottom: 0px;
    }
  }
  .left-continer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .oval-container {
    height: 35px;
    width: 35px;
    border: 1px solid #979797;
    background-color: ${theme.colors.white};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }
  .organization-name {
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumSmall};
  }
  .right-continer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .progress-oval-container {
    height: 35px;
    width: 35px;
  }
  .full-width-cotainer {
    margin-bottom: 30px;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    background-color: #f9f9f9;
  }
`;

export const WarningContainer = styled.div`
  margin: 5px;
  padding: 15px;
  border-radius: 6px;
  background-color: #f8d9a6;
  span {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }
  .read-more-text {
    text-decoration: underline;
  }
  .bold-text {
    font-family: ${theme.fontFamily.bold};
  }
`;

export const TabContainer = styled.div`
  border: none;
  .nav {
    float: right;
  }
  .nav-tabs {
    border: none;
  }
  .nav-item {
    margin-left: 25px;
  }
  .nav-link {
    border-bottom: 8px solid transparent;
    cursor: pointer;
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumSmall};
    padding: 1rem 1.2rem 0.5rem 1.2rem;
  }
  .nav-item.show .nav-link,
  .nav-link.active {
    color: ${theme.colors.black};
    background: transparent;
    border-bottom: 8px solid ${theme.colors.yellow};
  }
  .nav-link:focus,
  .nav-link:hover {
    text-decoration: none;
    outline: none;
  }
  .count-container {
    height: 20px;
    width: 20px;
    background-color: ${theme.colors.yellow};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    position: absolute;
    margin-top: -50px;
    margin-left: 95px;
    span {
      color: ${theme.colors.white};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.small};
    }
  }
`;
