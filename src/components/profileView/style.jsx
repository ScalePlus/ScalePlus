import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  margin-top: 40px;
  padding: 0px 20px;
  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      display: flex;
      align-items: center;
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.mediumLarge};
      .title-label {
        margin-right: ${theme.isLTR && "1rem"};
        margin-left: ${theme.isRTL && "1rem"};
        cursor: pointer;
      }
    }
    .button-container {
      display: flex;
      align-items: center;
      button:first-child {
        margin-right: ${theme.isLTR && "1rem"};
        margin-left: ${theme.isRTL && "1rem"};
      }
    }
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
    .circule-contaier {
      flex: 0.1;
      height: 110px;
      width: 110px;
      background-color: #d4d4d4;
      border: 1px solid #d4d4d4;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: ${theme.isLTR && "20px"};
      margin-left: ${theme.isRTL && "20px"};
    }
  }
  .info-container {
    flex: 0.9;
    .field-container {
      margin-bottom: 0.5rem;
    }
    .bold-text {
      font-family: ${theme.fontFamily.bold};
    }
    .border-container {
      border: 1px solid ${theme.colors.borderGrey};
      margin: 1.5rem 0rem;
    }
  }
  .status-container {
    padding: 2px 8px;
    border: 1px solid;
    border-radius: 6px;
    font-size: ${theme.fontSize.extraSmall};
    font-family: ${theme.fontFamily.bold};
  }
`;
