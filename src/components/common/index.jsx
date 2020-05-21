import React, { useState } from "react";
import { Form, Button, Spinner, Row, Col } from "react-bootstrap";
import Select, { components } from "react-select";
import DatePicker from "react-datepicker";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Editor } from "react-draft-wysiwyg";
import {
  TitleContainer,
  DescriptionContainer,
  ButtonContainer,
  PrimaryButtonContainer,
  BackButtonContainer,
  TabContainer,
  LoadingContainer,
  PageTitleContainer,
  WarningContainer,
  ChallengeHeaderContainer,
} from "./style";
import theme from "../../theme";
import "react-datepicker/dist/react-datepicker.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function Title({ text }) {
  return (
    <TitleContainer>
      {text}
      <span className="icon-container">+</span>
    </TitleContainer>
  );
}

function Description({ children }) {
  return <DescriptionContainer>{children}</DescriptionContainer>;
}

function Input({ max, description, errorMessage, label, ...props }) {
  return (
    <Form.Group>
      {label && <Form.Label className="text-label">{label}</Form.Label>}
      <Form.Control {...props} maxLength={max} />
      {errorMessage && (
        <Form.Control.Feedback className="text-left" type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
      {description && (
        <Form.Text className="text-muted-description">{description}</Form.Text>
      )}
    </Form.Group>
  );
}

function EditorInput({ description, errorMessage, label, ...props }) {
  return (
    <Form.Group>
      {label && <Form.Label className="text-label">{label}</Form.Label>}
      <Editor
        {...props}
        wrapperClassName="custom-editor-wrapper"
        toolbarClassName="custom-editor-toolbar"
        editorClassName="custom-editor"
      />
      {errorMessage && (
        <Form.Control.Feedback className="text-left" type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
      {description && (
        <Form.Text className="text-muted-description">{description}</Form.Text>
      )}
    </Form.Group>
  );
}

function CheckBox({
  description,
  errorMessage,
  label,
  checkBoxText,
  ...props
}) {
  return (
    <Form.Group>
      {label && <Form.Label className="text-label">{label}</Form.Label>}
      <Form.Check
        custom
        className="large-checkbox"
        type="checkbox"
        id={`checkbox`}
        label={checkBoxText}
        {...props}
      />
      {errorMessage && (
        <Form.Control.Feedback className="text-left" type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
      {description && (
        <Form.Text className="text-muted-description">{description}</Form.Text>
      )}
    </Form.Group>
  );
}

function SearchInput({
  placeholder,
  value,
  onChange,
  max,
  label,
  description,
}) {
  return (
    <Form.Group>
      {label && <Form.Label className="text-label">{label}</Form.Label>}
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        maxLength={max}
        onChange={onChange ? onChange : () => {}}
      />
      <img
        src={"/images/search.svg"}
        className="search-icon"
        height="15px"
        width="15px"
        alt=""
        onClick={(e) => {}}
      ></img>
      {description && (
        <Form.Text className="text-muted-description">{description}</Form.Text>
      )}
    </Form.Group>
  );
}

function TextArea({
  rows,
  value,
  label,
  description,
  showCount,
  errorMessage,
  ...props
}) {
  return (
    <Form.Group>
      {label && <Form.Label className="text-label">{label}</Form.Label>}
      <Form.Control
        as="textarea"
        rows={rows}
        value={value}
        maxLength={showCount}
        {...props}
      />
      {showCount && (
        <span className="textarea-count">
          {value && value.length ? value.length : 0}|{showCount} letters
        </span>
      )}
      {errorMessage && (
        <Form.Control.Feedback className="text-left" type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
      {description && (
        <Form.Text className="text-muted-description">{description}</Form.Text>
      )}
    </Form.Group>
  );
}

function FileInput({
  placeholder,
  label,
  value,
  errorMessage,
  onChange,
  buttonText,
  ...props
}) {
  let fileUploader;
  return (
    <Form.Group>
      {label && <Form.Label className="text-label">{label}</Form.Label>}
      <Form.Control
        type={"text"}
        placeholder={placeholder}
        value={value && value.name ? value.name : value}
        onChange={() => {}}
        onClick={() => {
          fileUploader.click();
        }}
        // readOnly
        {...props}
      />
      <input
        type="file"
        ref={(ref) => (fileUploader = ref)}
        style={{ display: "none" }}
        onClick={(event) => {
          event.target.value = null;
        }}
        onChange={onChange}
        accept="image/*"
      />
      <Button
        className="upload-button"
        onClick={() => {
          fileUploader.click();
        }}
      >
        <span className="upload-button-text">{buttonText}</span>
      </Button>
      {errorMessage && (
        <Form.Control.Feedback className="text-left" type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

function BannerInput({ value, onChange, label, description }) {
  let fileUploader;
  return (
    <Form.Group>
      {label && <Form.Label className="text-label">{label}</Form.Label>}
      <div
        className="banner-input"
        // value={value && value.name ? value.name : value}
        onClick={() => {
          fileUploader.click();
        }}
      />
      <div
        className="upload-container"
        onClick={() => {
          fileUploader.click();
        }}
      >
        <img src={"/images/image.svg"} height="35px" width="35px" alt=""></img>
        <div>Upload image</div>
      </div>
      <input
        type="file"
        ref={(ref) => (fileUploader = ref)}
        style={{ display: "none" }}
        onClick={(event) => {
          event.target.value = null;
        }}
        onChange={onChange}
        accept="image/*"
      />
      {description && (
        <Form.Text className="text-muted-description">{description}</Form.Text>
      )}
    </Form.Group>
  );
}

function PassInput({ errorMessage, ...props }) {
  const [showPass, changeToggle] = useState(false);
  return (
    <Form.Group>
      <Form.Control type={showPass ? "text" : "password"} {...props} />
      <img
        src={showPass ? "/images/eyeSlash.svg" : "/images/eye.svg"}
        className="password-icon"
        height="25px"
        width="25px"
        alt=""
        onClick={(e) => {
          e.preventDefault();
          changeToggle(!showPass);
        }}
      ></img>
      {errorMessage && (
        <Form.Control.Feedback className="text-left" type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

function DateInput({
  value,
  onChange,
  placeholder,
  minDate,
  maxDate,
  openToDate,
  label,
  description,
  required,
  errorMessage,
}) {
  return (
    <Form.Group>
      {label && <Form.Label className="text-label">{label}</Form.Label>}
      <DatePicker
        dateFormat="dd/MM/yyyy"
        showPopperArrow={false}
        selected={value}
        onChange={onChange}
        placeholderText={placeholder}
        showMonthDropdown
        showYearDropdown
        className="form-control"
        minDate={minDate}
        maxDate={maxDate}
        openToDate={openToDate}
        withPortal
        required={required}
      />
      <img
        src={"/images/interface.svg"}
        className="calendar-icon"
        style={{ marginTop: label ? "-32px" : "-48px" }}
        height="25px"
        width="25px"
        alt=""
      ></img>
      {!value && errorMessage && (
        <Form.Text className="invalid-text">{errorMessage}</Form.Text>
      )}
      {description && (
        <Form.Text className="text-muted-description">{description}</Form.Text>
      )}
    </Form.Group>
  );
}

function DropDown({
  options,
  placeholder,
  value,
  onChange,
  label,
  description,
  isInvalid,
  errorMessage,
}) {
  const customStyle = {
    indicatorSeparator: () => ({
      display: "none",
    }),
    control: (provided, state) => ({
      ...provided,
      padding: label ? "0px 10px 0px 0px" : "10px 20px",
      minHeight: label ? "40px" : "70px",
      border: `1px solid ${theme.colors.border_gray}`,
      borderColor: theme.colors.border_gray,
      borderRadius: "6px",
      backgroundColor: theme.colors.white,
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.regular,
      boxShadow: 0,
      "&:hover": {
        border: `1px solid ${theme.colors.border_gray}`,
        borderColor: theme.colors.border_gray,
        boxShadow: 0,
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      textAlign: "left",
      backgroundColor: "#fafafa",
    }),
    option: (provided, state) => ({
      ...provided,
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.regular,
      paddingLeft: "35px",
      color: theme.colors.black,
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      fontFamily: theme.fontFamily.regular,
      fontSize: theme.fontSize.regular,
      color: theme.colors.black,
    }),
  };
  const customComponent = {
    DropdownIndicator: (props) => {
      return (
        <img
          src={
            props.selectProps.menuIsOpen
              ? "/images/chevronUp.png"
              : "/images/chevronDown.png"
          }
          height={label ? "15px" : "25px"}
          width={label ? "15px" : "25px"}
          alt=""
        ></img>
      );
    },
    Menu: (props) => {
      const optionSelectedLength = props.getValue().length || 0;
      return (
        <components.Menu {...props}>
          {optionSelectedLength < 3 ? (
            props.children
          ) : (
            <div
              style={{
                fontFamily: theme.fontFamily.regular,
                fontSize: theme.fontSize.regular,
                padding: "10px 35px",
                color: theme.colors.black,
              }}
            >
              <span>Max limit achieved</span>
            </div>
          )}
        </components.Menu>
      );
    },
  };
  return (
    <Form.Group>
      {label && <Form.Label className="text-label">{label}</Form.Label>}
      <Select
        isMulti
        placeholder={placeholder}
        // isValidNewOption={(inputValue, selectValue) => {
        //   return inputValue.length > 0 && selectValue.length < 3;
        // }}
        value={value}
        onChange={(newValue, actionMeta) => {
          if ((newValue && newValue.length <= 3) || !newValue) {
            onChange(newValue);
          }
        }}
        options={options}
        classNamePrefix={isInvalid ? "invalid-select" : ""}
        styles={customStyle}
        components={customComponent}
      />
      {isInvalid && errorMessage && (
        <Form.Text className="invalid-text">{errorMessage}</Form.Text>
      )}
      {description && (
        <Form.Text className="text-muted-description">{description}</Form.Text>
      )}
    </Form.Group>
  );
}

function Switch({ checked, onChange }) {
  return (
    <Form.Group>
      <Form.Check
        type="switch"
        label=""
        id={`switch-${new Date().getTime()}`}
        checked={checked}
        onChange={onChange}
      />
    </Form.Group>
  );
}

function IconButton({ text, onClick, disabled, type }) {
  return (
    <ButtonContainer onClick={onClick} disabled={disabled} type={type}>
      <span className="button-text">{text}</span>
      <span className="icon-container">></span>
    </ButtonContainer>
  );
}

function PrimaryButton({ text, onClick, disabled, variant, type }) {
  return (
    <PrimaryButtonContainer
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      type={type ? type : "button"}
    >
      <span className="button-text">{text}</span>
    </PrimaryButtonContainer>
  );
}

function BackButton({ text, onClick }) {
  return (
    <BackButtonContainer onClick={onClick}>
      <span className="back-button-text">{text}</span>
    </BackButtonContainer>
  );
}

function Tab({ text, subText, isActive }) {
  return (
    <TabContainer>
      <div
        className={
          isActive ? "tab-sub-container active-tab" : "tab-sub-container"
        }
      >
        <div className={"container"}>
          <div className="tab-main-text">{text}</div>
          {subText && <div className="tab-sub-text">{subText}</div>}
        </div>
      </div>
    </TabContainer>
  );
}

function Loading() {
  return (
    <LoadingContainer>
      <Spinner animation="border" />
    </LoadingContainer>
  );
}

function PageTitle({ text }) {
  return <PageTitleContainer>{text}</PageTitleContainer>;
}

function WarningBlock() {
  return (
    <WarningContainer>
      <span>
        The challenge is not published yet. Before you can publish, you will
        need to request an invoice to pay the platform fee and have Scale+ team
        review the content of your page.{" "}
        <b className="read-more-text bold-text">Read more.</b> <br /> If you
        have any questions, please contact us by emailing{" "}
        <b className="bold-text">help@scaleplus.co</b>
      </span>
    </WarningContainer>
  );
}

function ChallengeHeader({
  primaryButtonText,
  primaryButtonClick,
  secondaryButtonText,
  secondaryButtonClick,
}) {
  return (
    <ChallengeHeaderContainer>
      <Row style={{ alignItems: "center" }}>
        <Col lg={6} md={6} sm={6} xs={12}>
          <div className="left-continer">
            <div className="oval-container">
              <img
                src={"/images/image.svg"}
                height="20px"
                width="20px"
                alt=""
              ></img>
            </div>
            <div className="organization-name">
              <span>Organization Name Here</span>
            </div>
          </div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <div className="right-continer">
            <CircularProgressbar
              value={20}
              text={`${20}%`}
              className="progress-oval-container"
              background={true}
              styles={buildStyles({
                textSize: "30px",
                pathColor: "#4CD964",
                textColor: theme.colors.black,
                trailColor: "#d7d7d7",
                backgroundColor: theme.colors.white,
              })}
            />
            <div style={{ margin: "0px 10px" }}>
              <PrimaryButton
                variant="secondary"
                text={secondaryButtonText}
                onClick={secondaryButtonClick}
              ></PrimaryButton>
            </div>
            <PrimaryButton
              variant="primary"
              text={primaryButtonText}
              onClick={primaryButtonClick}
            ></PrimaryButton>
          </div>
        </Col>
      </Row>
    </ChallengeHeaderContainer>
  );
}

export {
  Title,
  Description,
  Input,
  EditorInput,
  CheckBox,
  SearchInput,
  TextArea,
  FileInput,
  BannerInput,
  PassInput,
  DateInput,
  DropDown,
  Switch,
  IconButton,
  PrimaryButton,
  BackButton,
  Tab,
  Loading,
  PageTitle,
  WarningBlock,
  ChallengeHeader,
};
