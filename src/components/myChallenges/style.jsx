import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  .my-content-container {
    background-color: #f7f7f7;
    padding: 65px 0px;
  }
  .header {
    display: flex;
    align-items: center;
    .title {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.mediumLarge};
      margin-right: 20px;
    }
    .circle-container {
      height: 45px;
      width: 45px;
      background-color: #eeeeee;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .count {
        color: ${theme.colors.black};
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.title};
      }
    }
  }

  .card-list {
    margin-top: 40px;
  }
`;
