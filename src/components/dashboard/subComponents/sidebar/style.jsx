import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  min-height: 450px;
  background-color: #f6f6f6;
  padding: 25px;
  margin-bottom: 25px;
  .nav-item:not(:last-child) {
    border-bottom: 1px solid #f3f3f3;
  }
  .nav-link {
    cursor: pointer;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.mediumSmall};
    padding: 0.5rem 0rem;
  }
  .nav-item.show .nav-link,
  .nav-link.active {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold};
  }
  .nav-link.active:after {
    content: ">";
    margin-left: 5px;
    color: ${theme.colors.yellow};
  }
  .nav-link:focus,
  .nav-link:hover {
    text-decoration: none;
    outline: none;
  }
`;
