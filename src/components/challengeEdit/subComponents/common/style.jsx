import styled from "styled-components";
import theme from "../../../../theme";

export const InformationBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  background-color: #dcf2ff;
  padding: 10px;
  button {
    padding: 5px 15px;
  }
  .title {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }
`;
