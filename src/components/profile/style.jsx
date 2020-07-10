import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  margin-top: 40px;
  padding: 0px 20px;
  .title {
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumLarge};
  }
  .box-container {
    margin-top: 20px;
    border: 1px solid ${theme.colors.lightSilver};
    border-radius: 6px;
    background-color: ${theme.colors.white};
    padding: 1.3rem;
    .form-control {
      height: 40px;
    }
    textarea.form-control {
      height: auto;
    }
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-text {
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.title};
      }
    }
  }

  .avtar-container {
    margin-top: 15px;
    display: flex;
    align-items: center;
    .circule-contaier {
      height: 110px;
      width: 110px;
      background-color: #d4d4d4;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: ${theme.isLTR && "20px"};
      margin-left: ${theme.isRTL && "20px"};
    }
    .replace-link {
      text-decoration: underline;
      font-size: ${theme.fontSize.mediumRegular};
    }
  }
`;
