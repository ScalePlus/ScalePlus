import { createGlobalStyle } from "styled-components";
import theme from "../theme";

export const GlobalStyle = createGlobalStyle`
.main-layout {
  font-family: ${theme.fontFamily.regular};
}

.form-control{
  text-align: left;
  padding: 10px 20px;
  height: 70px;
  border: 1px solid ${theme.colors.black};
  border-radius: 6px;
  background-color: ${theme.colors.white};
  color: #979797;
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.regular};
}

.form-control[readonly]{
   background-color: ${theme.colors.white};
}

#verify-email-form .form-control{
  text-align: center;
}

@media (min-width: 992px) {
.outer-tab-container {
    margin-right: -15px;
  }
}


.arrow-class {
  top: auto;
}

.active-tab {
  background-color: ${theme.colors.yellow}!important;
}

.active-tab .tab-main-text {
  color: ${theme.colors.black} !important;
  font-family: ${theme.fontFamily.bold}!important;
  opacity: 1 !important;
}

.active-tab .tab-sub-text {
  color: ${theme.colors.black}; !important;
  opacity: 1 !important;
}


.upload-button {
  position: absolute;
  margin-top: -66px;
  right: 0;
  margin-right: 20px;
  border-color: ${theme.colors.mediumgray};
  border-radius: 6px;
  background-color: ${theme.colors.mediumgray};
  padding: 18px 60px;
}

.upload-button-text {
  opacity: 0.6;
  color: ${theme.colors.black};
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.regular};
}


.password-icon {
  position: absolute;
  margin-top: -45px;
  right: 0;
  margin-right: 25px;
  font-size: ${theme.fontSize.title};
  cursor: pointer;
}

.textarea-count {
  position: absolute;
  margin-top: -25px;
  right: 0;
  margin-right: 25px;
  cursor: pointer;
  color: ${theme.colors.black};
  background-color: ${theme.colors.white};
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.regular};
}

.custom-switch {
  padding: 0;
}

.custom-switch .custom-control-label::before {
  height: 36px;
  width: 61px;
  border: 1px solid ${theme.colors.black};
  border-radius: 18.5px;
}

.custom-switch .custom-control-label::after {
  top: 7px;
  left:  -33px;
  height: 30px;
  width: 30px;
  border-radius: 18.5px;
  background-color: ${theme.colors.yellow};
}

.custom-control-input:checked~.custom-control-label::before {
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.black};
  background-color: ${theme.colors.white};
}

.custom-control-input:focus:not(:checked)~.custom-control-label::before {
  border-color: ${theme.colors.black};
}

.custom-switch .custom-control-input:checked~.custom-control-label::after {
  background-color: ${theme.colors.yellow};
  transform: translateX(1.5rem);
}
`;
