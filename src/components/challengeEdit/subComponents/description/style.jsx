import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div``;

export const ValidationBlockContainer = styled.div`
  .complete-task-dialogue {
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    background-color: ${theme.colors.white};
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.14);
    width: 260px;
    padding: 10px;
    position: absolute;
    z-index: 1;
    right: ${theme.isLTR && "0"};
    left: ${theme.isRTL && "0"};
    margin-top: -55px;
    margin-right: ${theme.isLTR && "-5%"};
    margin-right: ${theme.isRTL && "-5%"};
    .step {
      display: flex;
      margin-bottom: 10px;
      .icon-container {
        margin-right: ${theme.isLTR && "5px"};
        margin-left: ${theme.isRTL && "5px"};
        img {
          margin-top: -8px;
        }
      }
      .title {
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.small};
      }
      .description {
        font-size: ${theme.fontSize.extraSmall};
      }
    }
  }
`;
