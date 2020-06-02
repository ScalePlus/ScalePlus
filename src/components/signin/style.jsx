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
    margin-bottom: 30px;
    .google-button {
      margin-right: 10px;
      flex: 0.5;
    }
    .linkedin-button {
      margin-left: 10px;
      flex: 0.5;
    }
  }

  .devided-container {
    margin-bottom: 20px;
  }

  .form-container {
  }

  .remember-container {
    text-align: left;
    padding: 0px 10px;
    margin-top: -18px;
    margin-bottom: 30px;
  }

  .button-container {
    margin-bottom: 20px;
  }

  .bottom-container,
  .button-container {
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

  .reset-link {
    cursor: pointer;
    text-align: right;
    color: ${theme.colors.gray};
    margin-top: -10px;
    margin-bottom: 30px;
  }
`;
