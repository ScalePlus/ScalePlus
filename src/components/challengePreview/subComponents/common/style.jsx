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

export const StepperVerticalContainer = styled.div`
  .steps {
    position: relative;
    text-align: left;
  }

  .step {
    padding: 0px 0px 15px 50px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .start-label {
    position: absolute;
    margin-top: -25px;
    left: calc(50px / 2);
    transform: translateX(-45%);
    z-index: 2;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.small};
  }

  .end-label {
    position: absolute;
    margin-top: 25px;
    left: calc(50px / 2);
    transform: translateX(-45%);
    z-index: 2;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.small};
  }

  .outer-oval {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    left: calc(50px / 2);
    transform: translateX(-45%);
    z-index: 2;
  }

  .inner-oval {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #d8d8d8;
  }

  .step::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 2px;
    background-color: #d8d8d8;
    left: calc(50px / 2);
    top: 0;
    z-index: 1;
  }

  .step:first-child::after {
    top: auto;
    height: 50%;
    bottom: 0;
  }

  .step:last-child::after {
    bottom: 0;
    height: 50%;
    top: 0;
  }

  .selected {
    .inner-oval {
      background-color: ${theme.colors.yellow};
    }
  }

  .selected::after {
    background-color: ${theme.colors.yellow};
    height: 140%;
  }

  .active {
    .outer-oval {
      border: 1px solid #ffc000;
      background-color: ${theme.colors.white};
    }
    .inner-oval {
      background-color: ${theme.colors.yellow};
    }
  }

  .active::after {
    top: auto;
    height: 50%;
    bottom: 0;
  }

  .step:first-child.selected::after {
    top: 50%;
    height: 155%;
    bottom: auto;
  }

  .step:last-child.active::after {
    bottom: 0;
    height: 0%;
    top: 0;
  }

  .content {
    text-align: left;
    width: 100%;
    padding: 20px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
    .title {
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.mediumRegular};
      margin-bottom: 5px;
      font-weight: 600;
    }
    .timestamp {
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.mediumRegular};
    }
  }

  .content.active {
    border: 1px solid ${theme.colors.yellow};
    border-radius: 6px;
    background-color: rgba(255, 192, 0, 0.1);
  }
`;
