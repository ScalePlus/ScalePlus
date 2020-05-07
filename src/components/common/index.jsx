import React from "react";
import { Form, Button } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import {
  TitleContainer,
  DescriptionContainer,
  ButtonContainer,
  BackButtonContainer,
  TabContainer,
} from "./style";
import theme from "../../theme";

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

function Input({ type, placeholder, value, onChange, max }) {
  return (
    <Form.Group>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={max}
        onChange={onChange ? onChange : () => {}}
      />
    </Form.Group>
  );
}

function TextArea({ rows, placeholder, value, onChange }) {
  return (
    <Form.Group>
      <Form.Control
        as="textarea"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? onChange : () => {}}
        maxLength={1000}
      />
      <span className="textarea-count">
        {value && value.length ? value.length : 0}|1000 letters
      </span>
    </Form.Group>
  );
}

function FileInput({ placeholder, value, onChange }) {
  let fileUploader;
  return (
    <Form.Group>
      <Form.Control
        type={"text"}
        placeholder={placeholder}
        value={value && value.name ? value.name : ""}
        onClick={() => {
          fileUploader.click();
        }}
        onChange={() => {}}
        readOnly
      />
      <input
        type="file"
        ref={(ref) => (fileUploader = ref)}
        style={{ display: "none" }}
        onChange={onChange}
        accept="image/*"
      />
      <Button variant="secondary" className="upload-button">
        <span className="upload-button-text">Upload</span>
      </Button>
    </Form.Group>
  );
}

function PassInput({ showPass, placeholder, iconClick, value, onChange }) {
  return (
    <Form.Group>
      <Form.Control
        type={showPass ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? onChange : () => {}}
      />

      <img
        src={showPass ? "/images/eyeSlash.svg" : "/images/eye.svg"}
        className="password-icon"
        height="25px"
        width="25px"
        alt=""
        onClick={iconClick}
      ></img>
    </Form.Group>
  );
}

function DropDown({ options, placeholder, value, onChange }) {
  const customStyle = {
    indicatorSeparator: () => ({
      display: "none",
    }),
    control: (provided, state) => ({
      ...provided,
      padding: "10px 20px",
      minHeight: "70px",
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
          height="25px"
          width="25px"
          alt=""
        ></img>
      );
    },
  };
  return (
    <Form.Group>
      <CreatableSelect
        isMulti
        placeholder={placeholder}
        isValidNewOption={(inputValue, selectValue) => {
          return inputValue.length > 0 && selectValue.length < 3;
        }}
        value={value}
        onChange={(newValue, actionMeta) => {
          // console.log(newValue, actionMeta);
          if ((newValue && newValue.length <= 3) || !newValue) {
            onChange(newValue);
          }
        }}
        options={options}
        styles={customStyle}
        components={customComponent}
      />
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

function PrimaryButton({ text, onClick }) {
  return (
    <ButtonContainer onClick={onClick}>
      <span className="button-text">{text}</span>
      <span className="icon-container">></span>
    </ButtonContainer>
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

export {
  Title,
  Description,
  Input,
  TextArea,
  FileInput,
  PassInput,
  DropDown,
  Switch,
  PrimaryButton,
  BackButton,
  Tab,
};
