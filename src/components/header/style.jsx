import styled from "styled-components";
import theme from "../../theme";
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid;
  background-color: ${theme.colors.white};

  .logo-text {
    font-family: ${theme.fontFamily.rockwell_regular};
    font-size: ${theme.fontSize.extraLarge};
  }

  .icon-container {
    color: ${theme.colors.yellow};
    margin-left: -5px;
    font-size: ${theme.fontSize.extraLarge};
  }

  .action-container {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.rockwell_regular};
    font-size: ${theme.fontSize.mediumSmall};
  }
`;
