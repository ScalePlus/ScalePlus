import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .center-alignment {
    align-items: center;
  }
  .header-container {
    margin-bottom: 40px;
  }
`;

export const TableContainer = styled.div`
  .table-header-container {
    border-bottom: 1px solid #979797;
    padding-bottom: 10px;
    span {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.mediumRegular};
    }
  }
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
