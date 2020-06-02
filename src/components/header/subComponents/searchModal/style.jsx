import styled from "styled-components";
import theme from "../../../../theme";

export const HeaderContainer = styled.div`
  min-height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .header-component {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .left-container {
      flex: 0.5;
      text-align: left;
      .form-group {
        margin-bottom: 0px;
      }
      .form-control {
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
      flex: 0.5;
      text-align: right;
      font-size: ${theme.fontSize.large};
      font-family: ${theme.fontFamily.bold};
      cursor: pointer;
    }
  }
`;

export const ContentContainer = styled.div`
  color: ${theme.colors.white};
  .title-container {
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumLarge};
    padding-top: 45px;
    padding-bottom: 20px;
  }
  .challenge-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 20px;
    .image-container {
      height: 70px;
      width: 120px;
      border-radius: 6px;
      margin-right: 20px;
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
      margin-right: 20px;
    }
  }
  .sub-title-container {
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumRegular};
    color: ${theme.colors.yellow};
    padding-top: 30px;
    padding-bottom: 20px;
  }
`;
