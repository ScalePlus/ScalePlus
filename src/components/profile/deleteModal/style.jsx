import styled from "styled-components";
import theme from "../../../theme";

export const HeaderContainer = styled.div`
  min-height: 60px;
  border-radius: 6px 6px 0 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: ${theme.fontFamily.bold};
  font-size: ${theme.fontSize.mediumRegular};
`;

export const ContentContainer = styled.div`
  text-align: center;
  .bold-text {
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumRegular};
    margin-top: 10px;
  }
  .small-text {
    font-size: ${theme.fontSize.small};
    margin-top: 15px;
  }
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 20px;

    button {
      :first-child {
        margin-right: ${theme.isLTR && "10px"};
        margin-left: ${theme.isRTL && "10px"};
      }
      min-width: 170px;
    }
  }
`;
