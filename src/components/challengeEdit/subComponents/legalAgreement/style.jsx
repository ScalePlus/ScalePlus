import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .bold-text {
    font-family: ${theme.fontFamily.bold};
    margin-left: ${theme.isLTR && "5px"};
    margin-right: ${theme.isRTL && "5px"};
  }
`;
