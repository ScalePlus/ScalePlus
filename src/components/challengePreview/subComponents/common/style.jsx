import styled from "styled-components";
import theme from "../../../../theme";

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.semiLarge};
    font-weight: 600;
  }
  .title-border {
    height: 8px;
    margin-top: 5px;
    background-color: ${theme.colors.yellow};
  }
`;

export const ExpandCollapseContainer = styled.div`
  margin-bottom: 15px;
  .main-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    height: 50px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background-color: #fbfbfb;
  }
  .content-container {
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
  .icon-container {
    cursor: pointer;
  }
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
    .link {
      font-weight: 600;
      margin-bottom: 5px;
      text-decoration: underline;
      a {
        color: ${theme.colors.black};
      }
    }
  }
`;

export const UpdateTabContainer = styled.div`
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

export const StepperContainer = styled.div`
  .main-container {
    display: flex;
    align-items: center;
    .side-border {
      position: absolute;
      left: 24px;
      top: 0;
      height: 100%;
      width: 1px;
      background-color: ${theme.colors.yellow};
    }
    .step-circle {
      height: 20px;
      width: 20px;
      background-color: ${theme.colors.yellow};
      border-radius: 50%;
      margin-right: 20px;
    }
    .content {
      text-align: left;
      padding: 20px;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      background-color: ${theme.colors.white};
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.regular};
      margin-bottom: 15px;
      .title {
        font-family: ${theme.fontFamily.regular};
        font-size: ${theme.fontSize.mediumSmall};
        font-weight: 600;
      }
      .timestamp {
        font-family: ${theme.fontFamily.regular};
        font-size: ${theme.fontSize.mediumSmall};
      }
    }
  }
`;
