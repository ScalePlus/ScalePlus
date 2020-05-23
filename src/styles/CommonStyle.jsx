import { createGlobalStyle } from "styled-components";
import theme from "../theme";

export const GlobalStyle = createGlobalStyle`
.col, .col-1, .col-10, .col-11, .col-12, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-auto, .col-lg, .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-auto, .col-md, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-auto, .col-sm, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-auto,.row{
  padding-right: 8px;
  padding-left: 8px;
}

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

.ql-toolbar{
  background-color: #fafafa;
}
.ql-editor {
  min-height: 500px;
}
.ql-container {
  border: 1px solid ${theme.colors.border_gray} !important;
  border-top: none !important;
}

.box-container{
  .form-control,.quill {
    background-color: #F9F9F9;
  }
  .quill {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 6px;
  }
  .ql-editor {
    min-height: 100px;
  }
  .ql-container,
  .ql-toolbar {
    border: none !important;
    border-radius: 6px;
    background-color: #F9F9F9;
  }
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
  margin-right: 13px;
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
  font-size: ${theme.fontSize.title};
  cursor: pointer;
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
