import styled from "styled-components";
import theme from "../../theme";

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
      .hover-circle-container {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 25px;
        margin-top: 10px;
        height: 60px;
        min-width: 60px;
        border: 1px solid ${theme.colors.white};
        background-color: ${theme.colors.white};
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        cursor: pointer;
      }
      :hover {
        .hover-circle-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
`;
