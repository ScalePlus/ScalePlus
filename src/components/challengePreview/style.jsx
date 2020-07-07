import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;
  .preview-container {
    border-radius: 6px;
    background-color: ${theme.colors.whiteSmokeTint5};
    margin-bottom: 25px;
    padding: 5px;
    h2 {
      opacity: 0.3;
      margin-bottom: 0px;
    }
  }

  .full-width-cotainer {
    margin-bottom: 30px;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    background-color: ${theme.colors.alabaster};
  }
`;

export const TabContainer = styled.div`
  border: none;
  .nav {
    float: ${theme.isLTR ? "right" : "left"};
  }
  .nav-tabs {
    border: none;
  }
  .nav-item {
    margin-left: ${theme.isLTR && "25px"};
    margin-right: ${theme.isRTL && "25px"};
  }
  .nav-link {
    border-bottom: 8px solid transparent;
    cursor: pointer;
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumRegular};
    padding: 1rem 1.2rem 0.5rem 1.2rem;
  }
  .nav-item.show .nav-link,
  .nav-link.active {
    color: ${theme.colors.black};
    background: transparent;
    border-bottom: 8px solid ${theme.colors.yellow};
  }
  .nav-link:focus,
  .nav-link:hover {
    text-decoration: none;
    outline: none;
  }
  .count-container {
    height: 20px;
    width: 20px;
    background-color: ${theme.colors.yellow};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: ${theme.isLTR ? "10px" : "95px"};
    position: absolute;
    margin-top: -50px;
    margin-left: ${theme.isLTR ? "95px" : "10px"};
    span {
      color: ${theme.colors.white};
      font-size: ${theme.fontSize.small};
    }
  }
`;
