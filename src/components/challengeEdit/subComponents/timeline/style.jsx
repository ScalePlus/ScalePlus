import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .box-container {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    background-color: ${theme.colors.white};
    padding: 1rem 1rem 0px 1rem;
    margin-bottom: 1rem;
    display: flex;
  }
  .left-container {
    flex: auto;
  }
  .right-container {
    margin-left: ${theme.isLTR && "1rem"};
    margin-right: ${theme.isRTL && "1rem"};
  }
  .timeline {
    border: 1px solid ${theme.colors.black};
    border-radius: 6px;
    background-color: rgba(255, 192, 0, 0.1);
    padding: 1rem 1.5rem;
    overflow: auto;
  }
  .file-document-container {
    border-top: 1px solid ${theme.colors.black};
  }
  .header-container {
    flex: 0 100%;
    @media (min-width: 576px) {
      flex: 0 100%;
    }

    @media (min-width: 768px) {
      flex: 0 48%;
    }

    @media (min-width: 992px) {
      flex: 0 45%;
    }

    display: flex;
    align-items: center;
    text-align: ${theme.isLTR ? "left" : "right"};
    .icon-container {
      flex: 0.1;
    }
    .name {
      flex: 0.8;
      font-size: ${theme.fontSize.regular};
      font-family: ${theme.fontFamily.bold};
    }
    .button-container {
      flex: 0.1;
    }
  }
  .attachment-container {
    margin-bottom: 1rem;

    .file-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 10px 0;
      .form-group {
        flex: 1;
        margin-bottom: 0;
        padding: 0 10px;
      }
      .remove-container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }

    .label-title-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 10px 0;

      .field-title {
        opacity: 0.7;
      }

      .form-group {
        margin-bottom: 0;
        flex: 1;
        padding: 0 10px;
      }
    }
  }

  .bottom-block {
    .title {
      padding: 30px 0px;
    }
  }
`;
