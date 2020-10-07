import styled from "styled-components";
import theme from "../../../theme";

export const MainContainer = styled.div`
  .my-content-container {
    background-color: ${theme.colors.whiteSmokeTint4};
    padding: 65px 0px;
  }
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .header {
      display: flex;
      align-items: center;
      flex: 0.8;
      flex-wrap: wrap;
      .title {
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.mediumLarge};
        margin-right: ${theme.isLTR && "20px"};
        margin-left: ${theme.isRTL && "20px"};
      }
      .circle-container {
        height: 45px;
        width: 45px;
        background-color: ${theme.colors.whisper};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: ${theme.isLTR && "20px"};
        margin-left: ${theme.isRTL && "20px"};
        .count {
          font-family: ${theme.fontFamily.bold};
          font-size: ${theme.fontSize.title};
        }
      }
      .tags-container {
        flex: auto;
        flex-wrap: wrap;
        display: flex;
        align-items: center;

        .tag {
          background-color: ${theme.colors.whisper};
          padding: 5px 10px;
          border-radius: 15px;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          margin-right: ${theme.isLTR && "10px"};
          margin-left: ${theme.isRTL && "10px"};
        }
      }
    }
  }
  .card-list {
    margin-top: 40px;
    .custom-card {
      // padding-right: 15px;
      // padding-left: 15px;
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
        right: ${theme.isLTR && 0};
        left: ${theme.isRTL && 0};
        margin-right: ${theme.isLTR && "25px"};
        margin-left: ${theme.isRTL && "25px"};
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
          border-right: ${theme.isLTR && "1px solid #dfdfdf"};
          border-left: ${theme.isRTL && "1px solid #dfdfdf"};
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
  .box-container {
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    background-color: ${theme.colors.white};
    cursor: pointer;
    margin-bottom: 40px;
    padding: 1.25rem;
    min-height: 410px;
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.semiRegular};
    a {
      color: ${theme.colors.yellow};
    }
  }
`;
