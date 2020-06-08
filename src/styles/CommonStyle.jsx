import { createGlobalStyle } from "styled-components";
import theme from "../theme";

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  background-color: ${theme.colors.whiteSmokeTint4} !important;
  color: ${theme.colors.black};
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.regular};
}

.col, [class*="col-"] {
  padding-right: 8px;
  padding-left: 8px;
}

.row{
  margin-right: 0px !important;
  margin-left: 0px !important;
}

.main-layout,.modal-content {
  color: ${theme.colors.black};
  font-family: ${theme.fontFamily.regular};
  font-size: ${theme.fontSize.regular};
}

.form-control,.banner-input{
  text-align: left;
  padding: 20px;
  height: 60px;
  border: 1px solid ${theme.colors.borderGrey};
  border-radius: 6px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.gray};
  font-size: ${theme.fontSize.regular};
}

.input-group-append{
  border: 1px solid ${theme.colors.borderGrey};
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  .input-group-text{
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }
}

.ql-toolbar{
  background-color: ${theme.colors.gray98};
}
.ql-editor {
  min-height: 500px;
}
.ql-container {
  border: 1px solid ${theme.colors.borderGrey} !important;
  border-top: none !important;
}

.box-container{
  .form-control,.quill {
    background-color: ${theme.colors.alabaster};
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
    background-color: ${theme.colors.alabaster};
  }
}

.text-muted-description{
  color: ${theme.colors.gray};
  font-size: ${theme.fontSize.small};
  margin-top:5px;
}

.text-label{
  font-size: ${theme.fontSize.regular};
}

.navbar-toggler:focus {
  outline: none;
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
  height: 60px;
  width: 100%;
}

.react-calendar__tile--active{
  background-color: ${theme.colors.yellow} !important;
}
.react-calendar__tile--now{
  background-color: ${theme.colors.whisper};
}

.react-calendar__tile--active:enabled:hover, .react-calendar__tile--active:enabled:focus{
  background-color: ${theme.colors.yellow} !important;
}

.react-calendar__tile--now:enabled:hover, .react-calendar__tile--now:enabled:focus{
  background-color: ${theme.colors.whisper};
}

.custom-date-picker .react-date-picker__wrapper{
  text-align: left;
  padding: 20px;
  border: 1px solid ${theme.colors.borderGrey};
  border-radius: 6px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.gray};
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
  border: 1px solid ${theme.colors.borderGrey};
  box-shadow: none;
}

.form-control.is-invalid:focus, .was-validated .form-control:invalid:focus{
  box-shadow:none;
}

.was-validated .invalid-select__control{
  border: 1px solid ${theme.colors.amaranth} !important;
}

.invalid-feedback{
  font-size: 90%;
}

.is-invalid~.invalid-feedback{
  display:none;
}

.was-validated .is-invalid~.invalid-feedback{
  display:block;
}

.form-control.is-invalid,.form-control.is-invalid:focus{
  border-color: ${theme.colors.borderGrey} !important;
}


.was-validated .form-control.is-invalid,.was-validated .form-control.is-invalid:focus{
  border-color: ${theme.colors.amaranth} !important;
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
  font-size: 90%;
  color: ${theme.colors.amaranth};
}

.form-control.is-valid, .was-validated .form-control:valid,.form-control.is-valid:focus, .was-validated .form-control:valid:focus{
  border-color: ${theme.colors.borderGrey};
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
  border-color: ${theme.colors.yellow} !important;
}

.active-tab .tab-main-text {
  color: ${theme.colors.black} !important;
  font-family: ${theme.fontFamily.semi_bold} !important;
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
  font-size: ${theme.fontSize.regular};
  cursor: pointer;
}


.upload-button {
  position: absolute;
  margin-top: -55px;
  right: 0;
  margin-right: 13px;
  border-radius: 6px;
  padding: 12px 60px;  
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

.large-radio-button .custom-control-input{
  border-radius:50%;
  :checked~.custom-control-label::before,
  :checked~.custom-control-label::after{ 
    border-radius:50%;
    background-color: ${theme.colors.yellow};
  }
}

.large-radio-button .custom-control-label{
  font-size: ${theme.fontSize.regular};
  margin-left:10px;
}

.large-radio-button .custom-control-label::before, 
.large-radio-button .custom-control-label::after {
    width: 25px;
    height: 25px;
    top: -1px;
    left: -35px;
    border-radius:50%;
}

.textarea-count {
  position: absolute;
  margin-top: -30px;
  right: 0;
  margin-right: 35px;
  cursor: pointer;
  background-color: ${theme.colors.white};
  font-size: ${theme.fontSize.regular};
}

.custom-switch {
  padding: 0;
}

.primary_switch{
  padding-left: 2.25rem;
}

.custom-switch .custom-control-label::before {
  height: 36px;
  width: 61px;
  border: 1px solid ${theme.colors.borderGrey};
  border-radius: 18.5px;
}

.primary_switch .custom-control-label::before {
  height: 24px;
  width: 42px;
}

.custom-switch .custom-control-label::after {
  top: 7px;
  left:  -33px;
  height: 30px;
  width: 30px;
  border-radius: 18.5px;
  background-color: ${theme.colors.yellow};
}

.primary_switch .custom-control-label::after {
  top: 5px;
    left: -35px;
    height: 22px;
    width: 22px;
  background-color: #D2D2D2;
}

.custom-control-input:checked~.custom-control-label::before {
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.borderGrey};
  background-color: ${theme.colors.white};
}

.custom-control-input:focus:not(:checked)~.custom-control-label::before {
  border-color: ${theme.colors.borderGrey};
}

.custom-switch .custom-control-input:checked~.custom-control-label::after {
  background-color: ${theme.colors.yellow};
  transform: translateX(1.5rem);
}

.primary_switch .custom-control-input:checked~.custom-control-label::after {
  transform: translateX(1.1rem);
}

.primary_switch .custom-control-label{
  padding-left: 20px;
  padding-top: 8px;
}

.fullscreen-modal,.search-modal,.evaluate-modal {
  max-width: 100%;
  margin:0px !important;
  height: 100vh;
  .modal-content{
    height: 100vh;
  }
  .modal-body{
    background-color: ${theme.colors.white};
  }
}

.user-flow-modal{
  max-width:670px;
  .modal-content{
    border-radius: 10px;
  }
  .modal-header{
    padding:0px;
    background-color: #f1f1f1;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }.modal-body{
    padding:0px;
    background-color: ${theme.colors.white};
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}

.subscribe-modal{
  max-width:670px;
  .modal-content{
    border-radius: 10px;
    border: 1px solid #979797;
  }
  .modal-header,.modal-body{
    padding:0px;
  }
}

.team-agreement-modal{
  max-width:670px;
  .modal-header,.modal-body{
    padding:0px;
  }
}


.search-modal,.evaluate-modal  {
  border:none;
  border-radius:0;
  .modal-header,.modal-body{
    padding:0px;
  }
  .modal-content,.modal-body{
    background-color: ${theme.colors.black};
    border:none;
    border-radius:0;
  }
}



.evaluate-modal{
  .modal-body{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 100px 0px;
    background-color: #4a4a4a;
  }
}

.fade.modal.show{
  padding-left: 0px !important;
}

.checkbox-label{
  margin-left:35px;
  margin-top:-24px;
  .privacy-links{
    font-family: ${theme.fontFamily.bold};
    text-decoration: underline;
  }
  .bold-text{
    font-family: ${theme.fontFamily.bold};
  }
}
`;
