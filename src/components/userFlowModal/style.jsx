import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  .header-container {
    width: 100%;
    height: 80px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .challenge-title {
      font-size: ${theme.fontSize.mediumRegular};
    }
    .challenge-name {
      font-size: ${theme.fontSize.mediumRegular};
      font-family: ${theme.fontFamily.bold};
      text-align: ${theme.isLTR ? "left" : "right"};
    }
  }
  .title-container {
    margin-top: 0;
    padding-top: 40px;
    background-color: transparent;
  }
  .content-container {
    border: none;
    border-radius: 0;
    margin-top: 0;
    margin-bottom: 0px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: transparent;
    box-shadow: none;
  }
`;
