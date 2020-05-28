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
  }
`;
