import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;

  .active-tab {
    box-shadow: 0 6px 5px 0 rgba(160, 121, 0, 0.5);
    border-color: transparent !important;
  }

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

  .sub-description-container,
  .add-member {
    text-align: left;
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
  }

  .checkbox-container {
    text-align: left;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .right-container {
    text-align: right;
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
`;
