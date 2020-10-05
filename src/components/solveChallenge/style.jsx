import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;

  .title-container {
    margin-top: 40px;
  }

  .content-container {
    padding: 30px;
    margin-bottom: 150px;
    .form-control {
      height: 50px;
    }
  }

  .description-container {
    text-align: center;
    font-family: ${theme.fontFamily.bold};
  }

  .sub-description-container {
    margin-top: 10px;
  }

  .form-group {
    text-align: ${theme.isLTR ? "left" : "right"};
  }

  .sub-description-container,
  .add-member,
  .text-label {
    text-align: ${theme.isLTR ? "left" : "right"};
    font-family: ${theme.fontFamily.bold};
  }

  .add-member {
    cursor: pointer;
  }

  .tab-container {
    margin-top: 20px;
    .tab-sub-container {
      margin-bottom: 1rem;
      min-height: 70px;
    }
  }
  .form-container {
    margin-top: 15px;
    .email-container {
      display: flex;
      align-items: center;
    }
    .form-group {
      flex: auto;
    }
    .remove-button-container {
      margin-bottom: 1rem;
      margin-left: ${theme.isLTR && "10px"};
      margin-right: ${theme.isRTL && "10px"};
    }
  }

  .checkbox-container {
    text-align: ${theme.isLTR ? "left" : "right"};
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .right-container {
    text-align: ${theme.isLTR ? "right" : "left"};
    color: ${theme.colors.gray};
    margin-bottom: 50px;
  }

  .button-container {
    margin-bottom: 20px;
  }

  .button-container,
  .bottom-container {
    button {
      width: 100%;
      padding: 20px 0px;
      .button-text {
        font-size: ${theme.fontSize.semiRegular};
      }
    }
  }

  .link {
    color: ${theme.colors.gray};
    text-decoration: underline;
    &:hover {
      color: ${theme.colors.gray};
    }
    cursor: pointer;
  }

  .switch-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    margin-left: ${theme.isLTR && "1rem"};
    margin-right: ${theme.isRTL && "1rem"};
    .form-group {
      margin-bottom: 0;
    }
  }
  .left-text {
    margin-right: ${theme.isLTR && "10px"};
    margin-left: ${theme.isRTL && "10px"};
  }
`;
