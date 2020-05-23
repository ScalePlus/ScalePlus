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
  border-radius: 6px;
  border: ${(props) =>
    props.variant === "light" ? "1px solid #aeaeae" : "none"};
  background: ${(props) =>
    props.variant === "primary"
      ? theme.colors.yellow
      : props.variant === "secondary"
      ? "rgba(0, 0, 0, 0.11)"
      : props.variant === "info"
      ? "#5AC8FA"
      : props.variant === "light"
      ? theme.colors.white
      : props.variant === "success"
      ? "#4CD964"
      : props.variant === "danger"
      ? "#FF3B30"
      : "#5AC8FA"};
  padding: 10px 15px;
  min-width: 100px;
  color: ${(props) =>
    props.variant === "danger" ? theme.colors.white : theme.colors.black};
  :focus {
    outline: 0;
  }
  .button-text {
    cursor: pointer;

    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.small};
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

export const WarningContainer = styled.div`
  margin: 5px;
  padding: 15px;
  border-radius: 6px;
  background-color: #f8d9a6;
  text-align: center;
  span {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }
  .read-more-text {
    text-decoration: underline;
  }
  .bold-text {
    font-family: ${theme.fontFamily.bold};
  }
`;

export const ChallengeHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .left-continer {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .oval-container {
    height: 35px;
    width: 35px;
    border: 1px solid #979797;
    background-color: ${theme.colors.white};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }
  .organization-name {
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumSmall};
  }
  .right-continer {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .progress-oval-container {
    height: 35px;
    width: 35px;
  }
`;

export const RemoveButtonContainer = styled.div`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 6px;
  background-color: #e49393;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const UpdateCountButtonContainer = styled.div`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 6px;
  background-color: #818181;
  justify-content: center;
  margin-bottom: 10px;
  text-align: center;
`;

export const TableContainer = styled.div`
  thead {
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.regular};
    color: ${theme.colors.black};
    th {
      border: none;
      border-bottom: 2px solid #979797;
    }
  }
  tbody {
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
    color: ${theme.colors.black};
    tr {
      border: none;
      border-bottom: 1px solid #e9e9e9;
    }
  }

  td:focus,
  th:focus {
    outline: 0;
  }
  .table > tbody > tr > td {
    vertical-align: middle;
  }
`;
