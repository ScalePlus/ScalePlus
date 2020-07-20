import styled from "styled-components";
import theme from "../../../theme";

export const MainContainer = styled.div`
  margin-bottom: 3rem;
  border: 1px solid #e3e3e3;
  border-radius: 6px;
  background-color: ${theme.colors.white};
  padding: 1rem;
  .title-container {
    font-size: ${theme.fontSize.title};
    font-family: ${theme.fontFamily.bold};
    text-align: center;
    margin-bottom: 1rem;
  }
`;
