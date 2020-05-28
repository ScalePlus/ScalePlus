import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;
  .title-container {
    margin-top: 80px;
  }
  .description-container {
    margin-top: 25px;
  }
  .tab-container {
    margin-top: 35px;
    .tab-sub-container {
      margin-bottom: 1rem;
      min-height: 70px;
    }
  }
  .form-container {
    margin-top: 15px;
  }
  .button-container {
    margin-top: 20px;
  }
  .bottom-container {
    margin: 80px 0px;
    color: ${theme.colors.gray};
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
