import styled from "styled-components";
import theme from "../../theme";

export const TitleContainer = styled.span`
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.title};
  font-weight: 600;
  .icon-container {
    color: ${theme.colors.yellow};
    font-weight: 600;
    cursor: pointer;
  }
`;

export const DescriptionContainer = styled.span`
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.regular};
  color: ${theme.colors.gray};
`;

export const ButtonContainer = styled.button`
  text-align: center;
  border: none;
  background: none;
  :focus {
    outline: 0;
  }
  .button-text {
    cursor: pointer;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.medium};
    font-weight: 600;
  }
  .icon-container {
    color: ${theme.colors.yellow};
    font-size: ${theme.fontSize.medium};
    font-family: ${theme.fontFamily.regular};
    font-weight: 600;
    cursor: pointer;
  }
`;

export const PrimaryButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 6px;
  background: ${(props) =>
    props.variant === "primary"
      ? theme.colors.yellow
      : props.variant === "secondary"
      ? "rgba(0, 0, 0, 0.11)"
      : props.variant === "info"
      ? "#5AC8FA"
      : "#5AC8FA"};
  padding: 10px 30px;
  :focus {
    outline: 0;
  }
  .button-text {
    cursor: pointer;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.small};
    font-weight: 600;
  }
`;

export const BackButtonContainer = styled.div`
  text-align: left;
  .back-button-text {
    cursor: pointer;
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.medium};
  }
`;

export const TabContainer = styled.div`
  cursor: pointer;
  .tab-sub-container {
    text-align: center;
    border: 1px solid ${theme.colors.border_gray};
    border-radius: 6px;
    background-color: ${theme.colors.white};
    min-height: 60px;
    position: relative;
    .container {
      margin: 0;
      position: absolute;
      top: 50%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    .tab-main-text {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.regular};
    }
    .tab-sub-text {
      color: ${theme.colors.gray};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.small};
    }
  }
`;

export const LoadingContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: ${theme.colors.lightGray};
  .spinner-border {
    width: 4rem;
    height: 4rem;
  }
`;

export const PageTitleContainer = styled.h2`
  color: ${theme.colors.black};
  font-family: ${theme.fontFamily.bold};
  font-size: ${theme.fontSize.mediumLarge};
`;
