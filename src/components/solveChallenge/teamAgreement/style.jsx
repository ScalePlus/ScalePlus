import styled from "styled-components";
import theme from "../../../theme";

export const HeaderContainer = styled.div`
  border-radius: 10px 10px 0 0;
  min-height: 80px;
  background-color: #f1f1f1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${theme.fontFamily.bold};
  font-size: ${theme.fontSize.extraLarge};
`;

export const ContentContainer = styled.div`
  padding: 30px 50px;
  border-radius: 0 0 10px 10px;
  .description-container {
    font-size: ${theme.fontSize.mediumRegular};
    font-family: ${theme.fontFamily.bold};
    text-align: center;
  }
  button {
    width: 100%;
    margin-top: 30px;
    padding: 18px 0px;
    .button-text {
      font-size: ${theme.fontSize.semiRegular};
    }
  }
`;
