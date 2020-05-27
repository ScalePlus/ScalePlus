import styled from "styled-components";
import theme from "../../../../theme";

export const InformationBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  background-color: ${theme.colors.aliceBlue};
  padding: 0px 15px;
  button {
    padding: 5px 15px;
  }
  .title {
    padding: 15px 0px;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }
`;
