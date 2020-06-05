import styled from "styled-components";
import theme from "../../../theme";

export const MainContainer = styled.div`
  .my-content-container {
    background-color: ${theme.colors.whiteSmokeTint4};
    padding: 65px 0px;
  }
  .header {
    display: flex;
    align-items: center;
    .title {
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.mediumLarge};
      margin-right: 20px;
    }
    .circle-container {
      height: 45px;
      width: 45px;
      background-color: ${theme.colors.whisper};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .count {
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.title};
      }
    }
  }
  .card-list {
    margin-top: 40px;
    .custom-card {
      padding-right: 15px;
      padding-left: 15px;
      position: relative;

      :hover {
        .hover-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .hover-container {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 25px;
        margin-top: 10px;
        cursor: pointer;
        .content-container {
          display: none;
        }
      }

      .active {
        border-radius: 30px;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.5);
        width: 80%;
        .content-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        .image-container {
          border-radius: 0px;
          border-top-right-radius: 30px;
          border-bottom-right-radius: 30px;
          border: none;
          box-shadow: none;
        }
      }

      .content-container {
        height: 60px;
        width: auto;
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        background-color: ${theme.colors.white};
        .view-tab {
          font-family: ${theme.fontFamily.bold};
          font-size: ${theme.fontSize.semiRegular};
        }
        .border-container {
          border-right: 1px solid #dfdfdf;
          height: 70%;
        }
        .manage-tab {
          font-family: ${theme.fontFamily.bold};
          font-size: ${theme.fontSize.semiRegular};
        }
      }

      .image-container {
        height: 60px;
        width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${theme.colors.white};
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.5);
        border-radius: 50%;
      }
    }
  }
`;
