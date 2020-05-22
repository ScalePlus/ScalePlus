import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .complete-task-dialogue {
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    background-color: ${theme.colors.white};
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.14);
    width: 260px;
    padding: 10px;
    position: absolute;
    z-index: 1;
    right: 0;
    margin-top: -30px;
    margin-right: -5%;
    .step {
      display: flex;
      margin-bottom: 10px;
      .icon-container {
        margin-right: 5px;
        img {
          margin-top: -8px;
        }
      }
      .title {
        color: ${theme.colors.black};
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.small};
      }
      .description {
        color: ${theme.colors.black};
        font-family: ${theme.fontFamily.regular};
        font-size: ${theme.fontSize.extraSmall};
      }
    }
  }
`;
