import styled from "styled-components";
import theme from "../../theme";
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid ${theme.colors.border_gray};
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
    cursor: pointer;
    a {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.rockwell_regular};
      font-size: ${theme.fontSize.mediumSmall};
    }
    .nav-link {
      padding: 0;
    }
    .dropdown-item {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.rockwell_regular};
      font-size: ${theme.fontSize.regular};
    }
    .dropdown-item.active,
    .dropdown-item:active {
      background-color: ${theme.colors.lightGray};
    }
    .dropdown-toggle::after {
      display: none;
    }
  }
`;
