import { createGlobalStyle } from "styled-components";
import theme from "../theme";

export const GlobalStyle = createGlobalStyle`
.main-layout,.modal-content {
  font-family: ${theme.fontFamily.regular};
}

.form-control,.banner-input{
  text-align: left;
  padding: 20px;
  height: 70px;
  border: 1px solid ${theme.colors.border_gray};
  border-radius: 6px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.gray};
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.regular};
}

.text-muted-description{
  color: ${theme.colors.gray};
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.small};
  margin-top:5px;
}

.text-label{
  color: ${theme.colors.black};
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.regular};
}

.react-datepicker-wrapper,.react-datepicker-wrapper input{
  width: 100%;
  :focus {
    outline-offset: 0px;
    outline: none;
  }
}

.react-datepicker__day--selected,.react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected{
  background-color: ${theme.colors.yellow};
  :hover{
    background-color: ${theme.colors.yellow};
  }
  :focus {
    outline-offset: 0px;
    outline: none;
  }
}

.react-datepicker__day ,.react-datepicker__day--disabled,.react-datepicker button{
  :focus {
    outline-offset: 0px;
    outline: none;
  }
}

.Toastify__toast button{
 color: ${theme.colors.white} !important;
 opacity:1 !important;
}

.custom-date-picker{
  height: 70px;
  width: 100%;
}

.react-calendar__tile--active{
  background-color: ${theme.colors.yellow} !important;
}
.react-calendar__tile--now{
  background-color: #e6e6e6;
}

.react-calendar__tile--active:enabled:hover, .react-calendar__tile--active:enabled:focus{
  background-color: ${theme.colors.yellow} !important;
}

.react-calendar__tile--now:enabled:hover, .react-calendar__tile--now:enabled:focus{
  background-color: #e6e6e6;
}

.custom-date-picker .react-date-picker__wrapper{
  text-align: left;
  padding: 20px;
  border: 1px solid ${theme.colors.border_gray};
  border-radius: 6px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.gray};
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.regular};
}

.custom-date-picker .react-date-picker__wrapper input{
  color: ${theme.colors.gray};
  :focus {
    outline-offset: 0px;
    outline: none;
  }
}

.custom-date-picker .react-date-picker__wrapper button{
  display: none;
}

.form-control:focus{
  color: ${theme.colors.gray};
  border: 1px solid ${theme.colors.border_gray};
  box-shadow: none;
}

.form-control.is-invalid:focus, .was-validated .form-control:invalid:focus{
  box-shadow:none;
}

.was-validated .invalid-select__control{
  border: 1px solid #dc3545 !important;
}

.is-invalid~.invalid-feedback{
  display:none;
}

.was-validated .is-invalid~.invalid-feedback{
  display:block;
}

.form-control.is-invalid,.form-control.is-invalid:focus{
  border-color: ${theme.colors.border_gray} !important;
}


.was-validated .form-control.is-invalid,.was-validated .form-control.is-invalid:focus{
  border-color: #dc3545 !important;
}

.form-control.is-invalid, .was-validated .form-control:invalid{
  background-image:none;
}

.invalid-text{
  display:none;
}

.was-validated .invalid-text{
  display:block;
  text-align:left;
  width: 100%;
  margin-top: .25rem;
  font-size: 80%;
  color: #dc3545;
}

.form-control.is-valid, .was-validated .form-control:valid,.form-control.is-valid:focus, .was-validated .form-control:valid:focus{
  border-color: ${theme.colors.border_gray};
  background-image:none;
  box-shadow: none;
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
  background-color: ${theme.colors.yellow} !important;
}

.active-tab .tab-main-text {
  color: ${theme.colors.black} !important;
  font-family: ${theme.fontFamily.regular} !important;
  font-weight: 600 !important;
}

.active-tab .tab-sub-text {
  color: ${theme.colors.black} !important;
  font-family: ${theme.fontFamily.regular} !important;
}

.upload-container{
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  margin-top: -130px;
  color: ${theme.colors.gray};
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.regular};
  cursor: pointer;
}


.upload-button {
  position: absolute;
  margin-top: -66px;
  right: 0;
  margin-right: 20px;
  border-radius: 6px;
  padding: 18px 60px;  
  border-color: ${theme.colors.mediumgray};
  background-color: ${theme.colors.mediumgray};
  :hover,:focus,:not(:disabled):not(.disabled):active,:not(:disabled):not(.disabled):active:focus {
    color: ${theme.colors.black};
    border-color: ${theme.colors.mediumgray};
    background-color: ${theme.colors.mediumgray};
    box-shadow:none;
  }
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

.search-icon{
  position: absolute;
  margin-top: -25px;
  right: 0;
  margin-right: 25px;
  cursor: pointer;
}

.calendar-icon {
  position: absolute;
  right: 0;
  margin-right: 25px;
  font-size: ${theme.fontSize.title};
  cursor: pointer;
}

.custom-editor-wrapper {
  border: 1px solid ${theme.colors.border_gray};
  border-radius: 6px;
}
.custom-editor,
.custom-editor-toolbar {
  border: none;
  border-radius: 6px;
}

.custom-editor-toolbar{
  margin-bottom:0px;
}

.custom-editor{
  border-top : none;
  background-color: ${theme.colors.white};
  padding:10px;
}

.large-checkbox .custom-control-input{
  border-radius:6px;
  :checked~.custom-control-label::before,
  :checked~.custom-control-label::after{ 
    border-radius:6px;
    background-color: ${theme.colors.yellow};
  }
}

.large-checkbox .custom-control-label{
  color: ${theme.colors.black};
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.regular};
  margin-left:10px;
}

.large-checkbox .custom-control-label::before, 
.large-checkbox .custom-control-label::after {
    width: 25px;
    height: 25px;
    top: -1px;
    left: -35px;
    border-radius:6px;
}

.textarea-count {
  position: absolute;
  margin-top: -30px;
  right: 0;
  margin-right: 35px;
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
  border: 1px solid ${theme.colors.border_gray};
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
  border: 1px solid ${theme.colors.border_gray};
  background-color: ${theme.colors.white};
}

.custom-control-input:focus:not(:checked)~.custom-control-label::before {
  border-color: ${theme.colors.border_gray};
}

.custom-switch .custom-control-input:checked~.custom-control-label::after {
  background-color: ${theme.colors.yellow};
  transform: translateX(1.5rem);
}
`;
