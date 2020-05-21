import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .link {
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.regular};
    color: ${theme.colors.black};
    text-decoration: underline;
  }
`;
