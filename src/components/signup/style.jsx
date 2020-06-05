import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;

  .title-container {
    margin-top: 40px;
  }

  .content-container {
    margin-top: 20px;
    border: 1px solid #979797;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 12px 10px 0 rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin-bottom: 150px;
    .form-control {
      height: 50px;
    }
    .password-icon {
      margin-top: -35px;
    }
  }

  .social-button-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 30px;
    .google-button {
      margin-right: 5px;
      flex: 0.5;
    }
    .linkedin-button {
      margin-left: 5px;
      flex: 0.5;
    }
  }

  .devided-container {
    margin-bottom: 20px;
  }

  .description-container {
    text-align: left;
  }
  .tab-container {
    margin-top: 10px;
    .tab-sub-container {
      margin-bottom: 1rem;
      min-height: 70px;
    }
  }
  .form-container {
    margin-top: 15px;
  }

  .password-feedback {
    color: ${theme.colors.gray};
    text-align: left;
    margin-top: -10px;
    padding: 0px 10px;
  }

  .checkbox-container {
    text-align: left;
    padding: 0px 10px;
    margin-top: 20px;
    margin-bottom: 30px;
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
