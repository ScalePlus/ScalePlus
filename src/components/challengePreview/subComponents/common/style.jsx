import styled from "styled-components";
import theme from "../../../../theme";

export const TitleContainer = styled.div`
  .row {
    align-items: center;
  }
  text-align: left;
  .title {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.semiLarge};

    span {
      padding-bottom: 5px;
      padding-right: 5px;
      border-bottom: 5px solid ${theme.colors.yellow};
    }
  }
`;

export const TitleContainerWithSearchBox = styled.div`
  text-align: left;
  .title {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.semiLarge};

    margin-bottom: 35px;
    span {
      padding-bottom: 5px;
      padding-right: 5px;
      border-bottom: 5px solid ${theme.colors.yellow};
    }
  }
  .search-container {
    align-items: center;
    .form-group {
      margin-bottom: 0;
    }
    .form-control {
      height: 35px;
      padding: 10px;
    }
  }
`;

export const ExpandCollapseContainer = styled.div`
  margin-bottom: 15px;
  text-align: left;
  cursor: pointer;
  .main-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    min-height: 50px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    background-color: #fbfbfb;
  }
  .content-container {
    .title {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.regular};
      margin-right: 30px;
    }
    .timestamp {
      color: ${theme.colors.gray};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.small};
    }
    span {
      vertical-align: middle;
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
      font-family: ${theme.fontFamily.bold};
      margin-bottom: 10px;
      text-decoration: underline;
      a {
        color: ${theme.colors.black};
      }
      cursor: pointer;
    }
  }
`;

export const StepperVerticalContainer = styled.div`
  .steps {
    position: relative;
    text-align: left;
  }

  .step {
    padding: 0px 0px 15px 45px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .start-label {
    position: absolute;
    top: 25px;
    left: calc(20px / 2);
    transform: translateX(-45%);
    z-index: 2;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.small};
  }

  .end-label {
    position: absolute;
    bottom: 30px;
    left: calc(20px / 2);
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
    left: calc(20px / 2);
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
    left: calc(20px / 2);
    top: 0;
    z-index: 1;
  }

  .step:first-child::after {
    top: 50%;
    height: 50%;
  }

  .step:last-child::after {
    bottom: 50%;
    height: 50%;
  }

  .selected {
    .inner-oval {
      background-color: ${theme.colors.yellow};
    }
  }

  .selected::after {
    background-color: ${theme.colors.yellow};
  }

  .active {
    .outer-oval {
      border: 1px solid #ffc000;
      background-color: #fdfdfd;
    }
    .inner-oval {
      background-color: ${theme.colors.yellow};
    }
  }

  .step:not(:first-child).active::before {
    content: "";
    position: absolute;
    height: 50%;
    width: 2px;
    background-color: ${theme.colors.yellow};
    left: calc(20px / 2);
    top: 0;
    z-index: 1;
  }

  .active::after {
    top: 50%;
    height: 50%;
  }

  .step:last-child.active::after {
    top: 0;
    bottom: 50%;
    height: 50%;
    background-color: ${theme.colors.yellow};
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
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.mediumRegular};
      margin-bottom: 10px;
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
