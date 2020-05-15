import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;
  .preview-container {
    border-radius: 6px;
    background-color: #efefef;
    margin-bottom: 25px;
    padding: 5px;
    span {
      opacity: 0.3;
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.mediumLarge};
      font-weight: 600;
    }
  }
  .left-continer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .oval-container {
    height: 45px;
    width: 45px;
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
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.mediumSmall};
    font-weight: 600;
  }
  .right-continer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .progress-oval-container {
    height: 50px;
    width: 50px;
  }
  .full-width-cotainer {
    margin-bottom: 25px;
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
`;

export const TabContainer = styled.div`
  .tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
  }
  .tab {
    margin-top: 15px;
    cursor: pointer;
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.mediumSmall};
    font-weight: 600;
    margin-left: 70px;
  }
  .tab-border {
    height: 8px;
    margin-top: 10px;
    margin-left: -25px;
    margin-right: -25px;
    background-color: none;
  }
  .selected-tab {
    color: ${theme.colors.black};
    .tab-border {
      background-color: ${theme.colors.yellow};
    }
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
    margin-top: -55px;
    margin-left: 145px;
    span {
      color: ${theme.colors.white};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.small};
    }
  }
`;
