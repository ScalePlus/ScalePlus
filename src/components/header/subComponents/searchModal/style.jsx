import styled from "styled-components";
import theme from "../../../../theme";

export const HeaderContainer = styled.div`
  min-height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${theme.colors.yellow};
  padding: 0px 20px;
  .header-component {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .left-container {
      flex: 0.8;
      text-align: ${theme.isLTR ? "left" : "right"};
      .form-group {
        margin-bottom: 0px;
      }
      .form-control {
        padding: 0px;
        font-size: ${theme.fontSize.mediumRegular};
        font-family: ${theme.fontFamily.bold};
        color: ${theme.colors.black};
        background-color: transparent;
        border: none;
        ::-webkit-input-placeholder {
          color: ${theme.colors.black};
        }
      }
    }
    .right-container {
      flex: 0.2;
      text-align: ${theme.isLTR ? "right" : "left"};
      font-size: ${theme.fontSize.large};
      font-family: ${theme.fontFamily.bold};
      cursor: pointer;
    }
  }
`;

export const ContentContainer = styled.div`
  color: ${theme.colors.white};
  padding: 0px 20px;
  .title-container {
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumLarge};
    padding-top: 45px;
    padding-bottom: 20px;
  }
  .challenge-container {
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 20px;
    .image-container {
      height: 70px;
      width: 120px;
      border-radius: 6px;
      margin-right: ${theme.isLTR && "20px"};
      margin-left: ${theme.isRTL && "20px"};
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
        border-radius: 6px;
      }
    }
    .name {
      font-size: ${theme.fontSize.regular};
    }
    .description {
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.title};
    }
    .circle-container {
      height: 70px;
      width: 70px;
      border: 1px solid #979797;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${theme.colors.white};
      margin-right: ${theme.isLTR && "20px"};
      margin-left: ${theme.isRTL && "20px"};
    }
  }
  .sub-title-container {
    cursor: pointer;
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumRegular};
    color: ${theme.colors.yellow};
    padding-top: 30px;
    padding-bottom: 20px;
  }
`;
