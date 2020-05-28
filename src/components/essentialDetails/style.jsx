import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;
  .title-container {
    margin-top: 80px;
  }
  .form-container {
    margin-top: 50px;
    margin-bottom: 25px;
  }
  .tab-title {
    text-align: left;
    color: ${theme.colors.gray};
    margin-bottom: 5px;
  }
  .tab-container {
    .tab-main-text {
      color: ${theme.colors.gray};
    }
    .tab-sub-container {
      padding: 20px 0px;
      margin-bottom: 1rem;
    }
  }
  .button-container {
    margin-top: 60px;
    margin-bottom: 60px;
    align-items: center;
  }
`;
