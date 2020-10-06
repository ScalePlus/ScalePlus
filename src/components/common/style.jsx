import styled from "styled-components";
import theme from "../../theme";

export const SocialLoginContainer = styled.div`
  width: 100%;
  color: ${theme.colors.white};
  background: ${(props) => props.background};
  font-size: ${theme.fontSize.semiRegular};
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.border};
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  .text-container {
    margin-left: ${theme.isLTR && "10px"} !important;
    margin-right: ${theme.isRTL && "10px"} !important;
    span {
      vertical-align: middle;
    }
  }
  .icon-container {
    margin-right: ${theme.isLTR && "10px"} !important;
    margin-left: ${theme.isRTL && "10px"} !important;
  }
  ::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 2px;
    background-color: ${(props) => props.border};
    margin-left: ${theme.isLTR && "35px"};
    margin-right: ${theme.isRTL && "35px"};
    z-index: 1;
  }
  :disabled {
    opacity: 0.5;
  }
`;

export const ORDeviderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fontSize.mediumRegular};
  font-family: ${theme.fontFamily.bold};
  .left-border {
    border-top: 1px solid #979797;
    flex: 0.45;
  }
  .right-border {
    border-top: 1px solid #979797;
    flex: 0.45;
  }
  span {
    flex: 0.1;
  }
`;

export const TitleContainer = styled.span`
  font-size: ${theme.fontSize.extraLarge};
  font-family: ${theme.fontFamily.bold};
  .icon-container {
    color: ${theme.colors.yellow};
    font-family: ${theme.fontFamily.bold};
    cursor: pointer;
  }
`;

export const DescriptionContainer = styled.span`
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
    font-size: ${theme.fontSize.medium};
    font-family: ${theme.fontFamily.bold};
  }
  .icon-container {
    color: ${theme.colors.yellow};
    font-size: ${theme.fontSize.medium};
    font-family: ${theme.fontFamily.bold};
    cursor: pointer;
  }
  :disabled {
    opacity: 0.5;
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
      : props.variant === "success_light"
      ? "#66E397"
      : props.variant === "danger"
      ? "#FF3B30"
      : props.variant === "danger_light"
      ? "#F18989"
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
  :disabled {
    opacity: 0.5;
  }
`;

export const BackButtonContainer = styled.div`
  text-align: ${theme.isLTR ? "left" : "right"};
  .back-button-text {
    cursor: pointer;
    color: ${theme.colors.gray};
    font-size: ${theme.fontSize.medium};
  }
`;

export const TabContainer = styled.div`
  cursor: pointer;
  .tab-sub-container {
    text-align: center;
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: 6px;
    background-color: ${theme.colors.white};
    min-height: 60px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 100px;
    padding: 0 1.5rem;
    .tab-main-text {
      color: ${theme.colors.black};
    }
    .tab-sub-text {
      color: ${theme.colors.gray};
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
  background-color: ${theme.colors.lightWhite};
  .spinner-border {
    width: 4rem;
    height: 4rem;
  }
  .file-upload-label {
    text-align: center;
    margin-bottom: 1rem;
    font-size: ${theme.fontSize.mediumRegular};
    font-family: ${theme.fontFamily.bold};
  }
  .progress {
    height: 1.5rem;
    min-width: 25rem;
    font-size: ${theme.fontSize.regular};
    border: 1px solid;
  }
`;

export const PageTitleContainer = styled.h2`
  font-family: ${theme.fontFamily.bold};
  font-size: ${theme.fontSize.mediumLarge};
`;

export const WarningContainer = styled.div`
  margin: 5px;
  padding: 15px;
  border-radius: 6px;
  background-color: ${theme.colors.peachYellow};
  text-align: center;
  span {
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
    margin-right: ${theme.isLTR && "10px"};
    margin-left: ${theme.isRTL && "10px"};
    img {
      max-width: 35px;
      max-height: 35px;
      border-radius: 50%;
    }
  }
  .organization-name {
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumRegular};
  }
  .right-continer {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .privacy-switch {
      margin-right: ${theme.isRTL && "0.5rem"};
      margin-left: ${theme.isLTR && "0.5rem"};
      .form-group {
        margin-bottom: 0;
      }
    }
  }
  .progress-oval-container {
    height: 35px;
    width: 35px;
  }
`;

export const ChallengeViewHeaderContainer = styled.div`
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
    margin-right: ${theme.isLTR && "10px"};
    margin-left: ${theme.isRTL && "10px"};
    img {
      max-width: 35px;
      max-height: 35px;
      border-radius: 50%;
    }
  }
  .organization-name {
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumRegular};
  }
  .right-continer {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .view-container {
      margin-right: ${theme.isLTR && "30px"};
      margin-left: ${theme.isRTL && "30px"};
      display: flex;
      align-items: center;
      .view-icon-container {
        margin-right: ${theme.isLTR && "10px"};
        margin-left: ${theme.isRTL && "10px"};
      }
      .view-count {
        font-size: ${theme.fontSize.semiRegular};
      }
    }
    .share-container {
      button {
        display: flex;
        align-items: center;
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.semiRegular};
        border-radius: 6px;
        padding: 10px 15px;
        border: 1px solid #e3e3e3;
        background-color: ${theme.colors.white};
        .icon-container {
          margin-right: ${theme.isLTR && "10px"};
          margin-left: ${theme.isRTL && "10px"};
        }
        .text span {
          vertical-align: middle;
        }
        :focus {
          outline: 0;
        }
      }
    }
    .button-text {
      font-size: ${theme.fontSize.semiRegular};
    }
  }

  .menu-items {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    box-shadow: 0 5px 14px 0 rgba(0, 0, 0, 0.24);
    .menu-text {
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.small};
      padding: 5px 0px;
    }
    .dropdown-item {
      padding: 0px 10px;
      :active {
        color: ${theme.colors.black};
        text-decoration: none;
        background-color: ${theme.colors.white};
      }
      :not(:last-child) div {
        border-bottom: 1px solid ${theme.colors.black};
      }
    }
  }
`;

export const RemoveButtonContainer = styled.div`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 6px;
  background-color: ${theme.colors.sweetPink};
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const AddButtonContainer = styled.div`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 6px;
  background-color: #4cd964;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const UpdateCountButtonContainer = styled.div`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 6px;
  background-color: ${theme.colors.grey};
  justify-content: center;
  margin-bottom: 10px;
  text-align: center;
`;

export const TableContainer = styled.div`
  thead {
    font-family: ${theme.fontFamily.bold};
    th {
      border: none;
      border-bottom: 2px solid #979797;
    }
  }
  tbody {
    tr {
      border: none;
      border-bottom: 1px solid #e9e9e9;
      cursor: pointer;
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

export const CardContainer = styled.div`
  .circle-container.disable {
    opacity: 0.5;
  }
  .circle-container {
    height: 70px;
    width: 70px;
    border: 1px solid #979797;
    background-color: ${theme.colors.white};
    border-radius: 50%;
    position: absolute;
    top: 142px;
    left: ${theme.isLTR && "25px"};
    right: ${theme.isRTL && "25px"};
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 70px;
      max-height: 70px;
      border-radius: 50%;
    }
  }
  .card.disable {
    opacity: 0.5;
    :hover {
      box-shadow: none;
    }
  }
  .card {
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    background-color: ${theme.colors.white};
    cursor: pointer;
    :hover {
      box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.14);
    }
    margin-bottom: 40px;
    .card-img-top {
      height: 200px;
    }
    .card-body {
      padding-bottom: 10px;
    }
    .description {
      height: 60px;
      overflow: hidden;
    }
    .card-title {
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.title};
      margin-bottom: 5px;
    }
    .card-text {
      margin-bottom: 5px;
    }
    .card-footer {
      background-color: ${theme.colors.white};
      border: none;
      padding-top: 0px;
      .days-price-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .days-container {
          display: flex;
          align-items: center;
        }
        .days-text {
          color: ${theme.colors.gray};
          font-family: ${theme.fontFamily.semi_bold};
          margin-left: ${theme.isLTR && "10px"};
          margin-right: ${theme.isRTL && "10px"};
        }
        .prize-text {
          font-family: ${theme.fontFamily.semi_bold};
        }
      }
      .count-container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        .left-container {
          flex: 0.5;
          padding-right: ${theme.isLTR && "5px"};
          padding-left: ${theme.isRTL && "5px"};
          border-right: ${theme.isLTR && "1px solid #e9e9e9"};
          border-left: ${theme.isRTL && "1px solid #e9e9e9"};
        }
        .right-container {
          margin-left: ${theme.isLTR && "20px"};
          margin-right: ${theme.isRTL && "20px"};
          flex: 0.5;
        }
      }
      .bordered-container {
        padding: 10px 0px;
        :not(:last-child) {
          border-bottom: 1px solid #e9e9e9;
        }
      }
      .heading-text {
        font-family: ${theme.fontFamily.bold};
        margin-bottom: 8px;
      }
      .sub-heading-text {
      }
      .progress {
        height: 25px;
        .bg-warning {
          background-color: ${theme.colors.yellow} !important;
        }
        .bg-success {
          background-color: ${theme.colors.mediumAquamarine} !important;
        }
        .progress-bar {
          color: ${theme.colors.black};
          font-size: ${theme.fontSize.regular};
          // text-align: left;
          // padding-left: 5px;
        }
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .of-text {
    padding: 0px 5px;
  }
  .next-page,
  .previous-page {
    padding: 0rem 0.5rem;
    cursor: pointer;
  }
  .last-page,
  .first-page {
    cursor: pointer;
  }
`;
