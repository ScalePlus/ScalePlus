import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .box-container {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    background-color: ${theme.colors.white};
    padding: 1rem 1rem 0px 1rem;
    margin-bottom: 1rem;
  }
  .timeline {
    border: 1px solid #000000;
    border-radius: 6px;
    background-color: rgba(255, 192, 0, 0.1);
    padding: 1rem;
    overflow: auto;
  }
`;
