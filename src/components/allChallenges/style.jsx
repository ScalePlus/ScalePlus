import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  .subscribe-container {
    text-align: center;
    background-image: url("/images/subscribe-banner.png");
    background-color: ${theme.colors.yellow};
    min-height: 180px;
    padding: 25px;
    .text {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.extraMedium};
    }
    .button-container {
      display: flex;
      justify-content: center;
    }
    button {
      background: ${theme.colors.white};
      padding: 5px 50px;
      .button-text {
        font-size: ${theme.fontSize.mediumRegular};
      }
    }
  }
  .content-container {
    .header-container {
      .title-text {
        color: ${theme.colors.black};
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.mediumLarge};
        line-height: 40px;
      }
    }
    .sub-header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .text {
        color: ${theme.colors.gray};
        font-family: ${theme.fontFamily.regular};
        font-size: ${theme.fontSize.mediumSmall};
      }
      .filter-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        height: 50px;
        width: 140px;
        border: 1px solid #e3e3e3;
        border-radius: 6px;
        background-color: #ffffff;
        padding: 0px 15px;
        cursor: pointer;
        .filter-text {
          color: ${theme.colors.black};
          font-family: ${theme.fontFamily.bold};
          font-size: ${theme.fontSize.mediumRegular};
        }
        .filter-count {
          height: 22px;
          width: 22px;
          background-color: #d8d8d8;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          .count-text {
            color: ${theme.colors.black};
            font-family: ${theme.fontFamily.bold};
            font-size: ${theme.fontSize.small};
          }
        }
      }
    }
    .bottom-button-container {
      display: flex;
      justify-content: center;
      margin-bottom: 80px;
      button {
        padding: 15px 140px;
      }
      .button-text {
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.mediumRegular};
      }
    }
    .card-list {
      .circle-container {
        height: 70px;
        width: 70px;
        border: 1px solid #979797;
        background-color: ${theme.colors.white};
        border-radius: 50%;
        position: absolute;
        top: 142px;
        left: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .card {
        border: 1px solid #e3e3e3;
        border-radius: 6px;
        background-color: ${theme.colors.white};
        cursor: pointer;
        :hover {
          box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.14);
        }
        margin-bottom: 40px;
        .card-img-top {
          height: 200px;
        }
        .card-body {
          padding-bottom: 10px;
        }
        .description {
          height: 60px;
          overflow: hidden;
        }
        .card-title {
          color: ${theme.colors.black};
          font-family: ${theme.fontFamily.bold};
          font-size: ${theme.fontSize.title};
          margin-bottom: 5px;
        }
        .card-text {
          color: ${theme.colors.black};
          font-family: ${theme.fontFamily.regular};
          font-size: ${theme.fontSize.regular};
          margin-bottom: 5px;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: ${theme.colors.white};
          border: none;
          padding-top: 0px;
          .days-container {
            display: flex;
            align-items: center;
          }
          .days-text {
            color: ${theme.colors.gray};
            font-family: ${theme.fontFamily.bold};
            font-size: ${theme.fontSize.regular};
            margin-left: 10px;
          }
          .prize-text {
            color: ${theme.colors.black};
            font-family: ${theme.fontFamily.bold};
            font-size: ${theme.fontSize.regular};
          }
        }
      }
    }
  }
`;
