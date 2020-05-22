import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .table-body-container {
    display: flex;
    justify-content: center;
    padding: 100px;
    span {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.semiLarge};
    }
  }
`;
