import styled from "styled-components";
import theme from "../../../../theme";

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  text-align: left;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.semiLarge};

    .back-arrow {
      margin-right: 1rem;
      cursor: pointer;
      img {
        margin-bottom: 15px;
      }
    }

    span {
      padding-bottom: 5px;
      padding-right: 5px;
      border-bottom: 5px solid ${theme.colors.yellow};
    }
  }
  .submission-menu-items {
    width: 260px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    box-shadow: 0 5px 14px 0 rgba(0, 0, 0, 0.24);
    .menu-text {
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.small};
      padding: 5px 0px;
    }
    .dropdown-item {
      padding: 5px 10px;
      :active {
        color: ${theme.colors.black};
        text-decoration: none;
        background-color: ${theme.colors.white};
      }
      :not(:last-child) div {
        border-bottom: 1px solid ${theme.colors.black};
      }
    }
  }
  .progress-oval-container {
    height: 45px;
    width: 45px;
  }
`;

export const TitleContainerWithSearchBox = styled.div`
  text-align: left;
  .title {
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
    background-color: ${theme.colors.snow};
  }
  .content-container {
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
    font-size: ${theme.fontSize.small};
  }

  .end-label {
    position: absolute;
    bottom: 30px;
    left: calc(20px / 2);
    transform: translateX(-45%);
    z-index: 2;
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
    background-color: ${theme.colors.lightSilver};
  }

  .step::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 2px;
    background-color: ${theme.colors.lightSilver};
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
      border: 1px solid ${theme.colors.yellow};
      background-color: ${theme.colors.lightWhite};
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
    .title {
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.semiRegular};
      margin-bottom: 10px;
    }
    .timestamp {
      font-size: ${theme.fontSize.semiRegular};
    }
    .download-files-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #979797;
      margin-top: 15px;
      .download-block {
        flex: 0 100%;
        @media (min-width: 576px) {
          flex: 0 100%;
        }

        @media (min-width: 768px) {
          flex: 0 48%;
        }

        @media (min-width: 992px) {
          flex: 0 45%;
        }

        display: flex;
        align-items: center;
        padding-top: 15px;
        text-align: left;
        .icon-container {
          flex: 0.1;
        }
        .name {
          flex: 0.5;
          font-size: ${theme.fontSize.semiRegular};
        }
        .button-container {
          flex: 0.4;
          button {
            width: 100%;
            .button-text {
              font-size: ${theme.fontSize.semiRegular};
            }
          }
        }
      }
    }
    .upload-files-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #979797;
      margin-top: 15px;
      .upload-block {
        flex: 0 100%;
        @media (min-width: 576px) {
          flex: 0 100%;
        }

        @media (min-width: 768px) {
          flex: 0 48%;
        }

        @media (min-width: 992px) {
          flex: 0 45%;
        }
        padding-top: 15px;
        text-align: left;
        .name {
          font-size: ${theme.fontSize.regular};
          font-family: ${theme.fontFamily.bold};
          margin-bottom: 10px;
        }
        .file-container {
          display: flex;
          align-items: center;
          .form-group {
            margin-bottom: 0;
            flex: 1;
            .form-control {
              height: 35px;
            }
          }
        }
        .input-group-text {
          background: ${theme.colors.yellow};
          font-family: ${theme.fontFamily.bold};
        }
      }
    }
  }

  .content.active {
    border: 1px solid ${theme.colors.yellow};
    border-radius: 6px;
    background-color: rgba(255, 192, 0, 0.1);
  }
`;
