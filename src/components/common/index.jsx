import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Form,
  Button,
  Spinner,
  Table,
  Card,
  ProgressBar,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import { components } from "react-select";
import Creatable from "react-select/creatable";
import DatePicker from "react-datepicker";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  getChallengeAction,
  updateChallengeAction,
} from "../challengeMaster/action";
import ReactQuill from "react-quill";
import CropImage from "../cropImage";
import {
  SocialLoginContainer,
  ORDeviderContainer,
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
  ChallengeViewHeaderContainer,
  RemoveButtonContainer,
  AddButtonContainer,
  UpdateCountButtonContainer,
  TableContainer,
  CardContainer,
} from "./style";
import ShareAsEmail from "../shareLinkModal";
import theme from "../../theme";
import { Constants } from "../../lib/constant";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";

export const SocialLoginButton = React.memo(
  ({ text, icon, svgIcon, background, border, onClick, disabled }) => {
    return (
      <SocialLoginContainer
        background={background}
        border={border}
        onClick={onClick}
        disabled={disabled}
      >
        {icon && (
          <div className="icon-container">
            <img src={icon} alt="" height={25} width={25} />{" "}
          </div>
        )}
        {svgIcon && <div className="icon-container">{svgIcon}</div>}
        <div className="text-container">
          <span>{text}</span>
        </div>
      </SocialLoginContainer>
    );
  }
);

export const OrDevider = React.memo(({ t }) => {
  return (
    <ORDeviderContainer>
      <div className="left-border"></div>
      <span>{t("or")}</span>
      <div className="right-border"></div>
    </ORDeviderContainer>
  );
});

export const Title = React.memo(({ text, icon }) => {
  return (
    <TitleContainer>
      {text}
      {icon && <span className="icon-container">+</span>}
    </TitleContainer>
  );
});

export const Description = React.memo(({ children }) => {
  return <DescriptionContainer>{children}</DescriptionContainer>;
});

export const Input = React.memo(
  ({
    max,
    minNumber,
    maxNumber,
    description,
    errorMessage,
    label,
    ...props
  }) => {
    return (
      <Form.Group>
        {label && <Form.Label className="text-label">{label}</Form.Label>}
        <Form.Control
          {...props}
          maxLength={max}
          min={minNumber}
          max={maxNumber}
          onKeyDown={(e) => {
            // prevent: "e", "=", ",", "-"
            if (
              props.type === "number" &&
              [69, 187, 188, 189].includes(e.keyCode)
            ) {
              e.preventDefault();
            }
          }}
        />
        {errorMessage && (
          <Form.Control.Feedback className="text-left" type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        )}
        {description && (
          <Form.Text className="text-muted-description">
            {description}
          </Form.Text>
        )}
      </Form.Group>
    );
  }
);

export const EditorInput = React.memo(
  ({ description, errorMessage, label, isInvalid, ...props }) => {
    return (
      <Form.Group>
        {label && <Form.Label className="text-label">{label}</Form.Label>}
        <ReactQuill
          className={isInvalid ? "invalid-react-quill" : ""}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              [
                "align",
                "link",
                "image",
                "video",
                "background",
                "color",
                "code",
                "direction",
              ],
              ["clean"],
            ],
            clipboard: {
              matchVisual: false,
            },
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
            "video",
            "background",
            "color",
            "code",
            "align",
            "direction",
          ]}
          {...props}
        />
        {isInvalid && errorMessage && (
          <Form.Control.Feedback className="text-left" type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        )}
        {description && (
          <Form.Text className="text-muted-description">
            {description}
          </Form.Text>
        )}
      </Form.Group>
    );
  }
);

export const CheckBox = React.memo(
  ({ description, errorMessage, label, checkBoxText, ...props }) => {
    return (
      <Form.Group>
        {label && <Form.Label className="text-label">{label}</Form.Label>}
        <Form.Check
          custom
          className="large-checkbox"
          type="checkbox"
          label={""}
          {...props}
        />
        <div className="checkbox-label">{checkBoxText}</div>
        {errorMessage && (
          <Form.Control.Feedback className="text-left" type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        )}
        {description && (
          <Form.Text className="text-muted-description">
            {description}
          </Form.Text>
        )}
      </Form.Group>
    );
  }
);

export const RadioButton = React.memo(
  ({ description, errorMessage, label, checkBoxText, ...props }) => {
    return (
      <Form.Group>
        {label && <Form.Label className="text-label">{label}</Form.Label>}
        <Form.Check
          custom
          className="large-radio-button"
          type="radio"
          label={""}
          {...props}
        />
        <div className="checkbox-label">{checkBoxText}</div>
        {errorMessage && (
          <Form.Control.Feedback className="text-left" type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        )}
        {description && (
          <Form.Text className="text-muted-description">
            {description}
          </Form.Text>
        )}
      </Form.Group>
    );
  }
);

export const SearchInput = React.memo(
  ({ placeholder, value, onChange, max, label, description }) => {
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
          src={"/images/search.png"}
          className="search-icon"
          height="15px"
          width="15px"
          alt=""
          onClick={(e) => {}}
        ></img>
        {description && (
          <Form.Text className="text-muted-description">
            {description}
          </Form.Text>
        )}
      </Form.Group>
    );
  }
);

export const TextArea = React.memo(
  ({ rows, value, label, description, showCount, errorMessage, ...props }) => {
    const { t } = useTranslation();
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
            {value && value.length ? value.length : 0}|{showCount}{" "}
            {t("letters")}
          </span>
        )}
        {errorMessage && (
          <Form.Control.Feedback className="text-left" type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        )}
        {description && (
          <Form.Text className="text-muted-description">
            {description}
          </Form.Text>
        )}
      </Form.Group>
    );
  }
);

export const FileInput = React.memo(
  ({
    placeholder,
    label,
    value,
    errorMessage,
    onChange,
    buttonText,
    prependButtonText,
    description,
    acceptTypes,
    progress,
    maxMB,
    onCropDone,
    aspectRatio,
    ...props
  }) => {
    let fileUploader;
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    return (
      <Form.Group>
        {label && <Form.Label className="text-label">{label}</Form.Label>}
        {prependButtonText ? (
          <>
            <InputGroup>
              <div
                className="form-control"
                style={{
                  padding: progress ? 0 : 10,
                  alignItems: "center",
                  display: "flex",
                  cursor: "text",
                }}
                onClick={() => {
                  fileUploader.click();
                }}
              >
                {/* <Form.Control
                  type={"text"}
                  placeholder={placeholder}
                  value={value && value.name ? value.name : value}
                  onChange={() => {}}
                  onClick={() => {
                    fileUploader.click();
                  }}
                  // readOnly
                  {...props}
                /> */}
                {progress ? (
                  <div
                    style={{
                      position: "absolute",
                      color: theme.colors.black,
                      backgroundColor: theme.colors.yellow,
                      transition: "width .6s ease",
                      borderTopLeftRadius: theme.isLTR && "6px",
                      borderBottomLeftRadius: theme.isLTR && "6px",
                      borderTopRightRadius: theme.isRTL && "6px",
                      borderBottomRightRadius: theme.isRTL && "6px",
                      width: `${progress}%`,
                      maxWidth: "100%",
                      height: "100%",
                      alignItems: "center",
                      display: "flex",
                      padding: "10px",
                    }}
                  >
                    {value && value.name ? value.name : value}
                  </div>
                ) : value ? (
                  value.name ? (
                    value.name
                  ) : (
                    value
                  )
                ) : (
                  placeholder
                )}
              </div>
              {prependButtonText && (
                <InputGroup.Append>
                  <InputGroup.Text>{prependButtonText}</InputGroup.Text>
                </InputGroup.Append>
              )}
              <input
                type="file"
                ref={(ref) => (fileUploader = ref)}
                style={{ display: "none" }}
                onClick={(event) => {
                  event.target.value = null;
                }}
                onChange={(e) => {
                  if (maxMB) {
                    if (
                      e.target.files &&
                      e.target.files.length &&
                      e.target.files[0].size < 1000 * 1000 * maxMB
                    ) {
                      onChange(e);
                      if (e.target.files[0].type.split("/")[0] === "image") {
                        setShow(true);
                      }
                    } else {
                      alert(`${t("You can upload up to")} ${maxMB}MB`);
                    }
                  } else {
                    onChange(e);
                    if (e.target.files[0].type.split("/")[0] === "image") {
                      setShow(true);
                    }
                  }
                }}
                accept={acceptTypes ? acceptTypes : "image/*"}
              />
              <CropImage
                aspectRatio={aspectRatio}
                show={show}
                setShow={setShow}
                file={value}
                onFileChange={(file) => {
                  setShow(false);
                  onCropDone(file);
                }}
              />
              {errorMessage && (
                <Form.Control.Feedback className="text-left" type="invalid">
                  {errorMessage}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            {description && (
              <Form.Text className="text-muted-description">
                {description}
              </Form.Text>
            )}
          </>
        ) : (
          <>
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
              onChange={(e) => {
                if (maxMB) {
                  if (
                    e.target.files &&
                    e.target.files.length &&
                    e.target.files[0].size < 1000 * 1000 * maxMB
                  ) {
                    onChange(e);
                    if (e.target.files[0].type.split("/")[0] === "image") {
                      setShow(true);
                    }
                  } else {
                    alert(`${t("You can upload up to")} ${maxMB}MB`);
                  }
                } else {
                  onChange(e);
                  if (e.target.files[0].type.split("/")[0] === "image") {
                    setShow(true);
                  }
                }
              }}
              accept={acceptTypes ? acceptTypes : "image/*"}
            />
            <CropImage
              aspectRatio={aspectRatio}
              show={show}
              setShow={setShow}
              file={value}
              onFileChange={(file) => {
                setShow(false);
                onCropDone(file);
              }}
            />
            {buttonText && (
              <Button
                className="upload-button"
                onClick={() => {
                  fileUploader.click();
                }}
              >
                <span className="upload-button-text">{buttonText}</span>
              </Button>
            )}
            {errorMessage && (
              <Form.Control.Feedback className="text-left" type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            )}
            {description && (
              <Form.Text className="text-muted-description">
                {description}
              </Form.Text>
            )}
          </>
        )}
      </Form.Group>
    );
  }
);

export const BannerInput = React.memo(
  ({
    value,
    cropedBannerImage,
    onChange,
    label,
    description,
    acceptTypes,
    maxMB,
    onCropDone,
  }) => {
    const { t } = useTranslation();
    let fileUploader;
    const [show, setShow] = useState(false);
    return (
      <Form.Group>
        {label && <Form.Label className="text-label">{label}</Form.Label>}
        <div
          className={`banner-input ${value && "have-image"}`}
          onClick={() => {
            !value && fileUploader.click();
          }}
        >
          {value ? (
            <img
              src={
                cropedBannerImage && cropedBannerImage.name
                  ? URL.createObjectURL(cropedBannerImage)
                  : value && value.name
                  ? URL.createObjectURL(value)
                  : value
              }
              alt=""
              className="selected-img"
              onClick={() => {
                fileUploader.click();
              }}
            ></img>
          ) : (
            <div
              className="upload-container"
              onClick={() => {
                fileUploader.click();
              }}
            >
              <img
                src={"/images/image.svg"}
                height="35px"
                width="35px"
                alt=""
              ></img>
              {!value && <div>{t("Upload image")}</div>}
            </div>
          )}
          {value && (
            <div className="crop-icon" onClick={() => setShow(true)}>
              <img
                src={"/images/crop.png"}
                height="25px"
                width="25px"
                alt=""
              ></img>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={(ref) => (fileUploader = ref)}
          style={{ display: "none" }}
          onClick={(event) => {
            event.target.value = null;
          }}
          onChange={(e) => {
            if (maxMB) {
              if (
                e.target.files &&
                e.target.files.length &&
                e.target.files[0].size < 1000 * 1000 * maxMB
              ) {
                onChange(e);
                if (e.target.files[0].type.split("/")[0] === "image") {
                  setShow(true);
                }
              } else {
                alert(`${t("You can upload up to")} ${maxMB}MB`);
              }
            } else {
              onChange(e);
              if (e.target.files[0].type.split("/")[0] === "image") {
                setShow(true);
              }
            }
          }}
          accept={acceptTypes ? acceptTypes : "image/*"}
        />
        {description && (
          <Form.Text className="text-muted-description">
            {description}
          </Form.Text>
        )}
        <CropImage
          aspectRatio={16 / 9}
          show={show}
          setShow={setShow}
          file={value}
          onFileChange={(file) => {
            setShow(false);
            onCropDone(file);
          }}
        />
      </Form.Group>
    );
  }
);

export const PassInput = React.memo(({ errorMessage, label, ...props }) => {
  const [showPass, changeToggle] = useState(false);
  return (
    <Form.Group>
      {label && <Form.Label className="text-label">{label}</Form.Label>}
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
});

export const DateInput = React.memo(
  ({
    value,
    onChange,
    placeholder,
    minDate,
    maxDate,
    minTime,
    maxTime,
    openToDate,
    label,
    description,
    required,
    errorMessage,
    isSmall,
    showTime,
    isInvalid,
  }) => {
    return (
      <Form.Group>
        {label && <Form.Label className="text-label">{label}</Form.Label>}
        <DatePicker
          dateFormat={showTime ? "dd/MM/yyyy h:mm aa" : "dd/MM/yyyy"}
          showTimeSelect={showTime}
          timeFormat="HH:mm"
          timeIntervals={15}
          // timeCaption="time"
          showPopperArrow={false}
          selected={value}
          onChange={onChange}
          placeholderText={placeholder}
          showMonthDropdown
          showYearDropdown
          className={`form-control ${isInvalid && "is-invalid"}`}
          minDate={minDate}
          maxDate={maxDate}
          minTime={minTime}
          maxTime={maxTime}
          openToDate={openToDate}
          withPortal
          required={required}
        />
        <img
          src={"/images/interface.svg"}
          className="calendar-icon"
          style={{
            marginTop: isSmall ? "-32px" : "-42px",
            marginRight: theme.isLTR && (isSmall ? "15px" : "20px"),
            marginLeft: theme.isRTL && (isSmall ? "15px" : "20px"),
          }}
          height="25px"
          width="25px"
          alt=""
        ></img>
        {(!value || isInvalid) && errorMessage && (
          <Form.Text className="invalid-text">{errorMessage}</Form.Text>
        )}
        {description && (
          <Form.Text className="text-muted-description">
            {description}
          </Form.Text>
        )}
      </Form.Group>
    );
  }
);

export const DropDown = React.memo(
  ({
    isSmall,
    inBox,
    options,
    placeholder,
    value,
    onChange,
    label,
    description,
    isInvalid,
    errorMessage,
    isSingle,
    isSelectOnly,
    isDisabled,
  }) => {
    const { t } = useTranslation();
    const customStyle = {
      indicatorSeparator: () => ({
        display: "none",
      }),
      control: (provided, state) => ({
        ...provided,
        padding: isSmall
          ? theme.isLTR
            ? "0px 10px 0px 0px"
            : "0px 0px 0px 10px"
          : "10px 20px",
        minHeight: isSmall ? "40px" : "60px",
        border: `1px solid ${theme.colors.borderGrey}`,
        borderColor: theme.colors.borderGrey,
        borderRadius: "6px",
        backgroundColor: inBox ? theme.colors.alabaster : theme.colors.white,
        fontFamily: theme.fontFamily.regular,
        fontSize: theme.fontSize.regular,
        boxShadow: 0,
        "&:hover": {
          border: `1px solid ${theme.colors.borderGrey}`,
          borderColor: theme.colors.borderGrey,
          boxShadow: 0,
        },
      }),
      menu: (provided, state) => ({
        ...provided,
        textAlign: theme.isLTR ? "left" : "right",
        backgroundColor: theme.colors.gray98,
      }),
      option: (provided, state) => ({
        ...provided,
        fontFamily: theme.fontFamily.regular,
        fontSize: theme.fontSize.regular,
        paddingLeft: theme.isLTR && "35px",
        paddingRight: theme.isRTL && "35px",
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
            height={isSmall ? "15px" : "25px"}
            width={isSmall ? "15px" : "25px"}
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
                <span>{t("Max limit achieved")}</span>
              </div>
            )}
          </components.Menu>
        );
      },
    };
    return (
      <Form.Group>
        {label && <Form.Label className="text-label">{label}</Form.Label>}
        <Creatable
          isDisabled={isDisabled}
          isMulti={isSingle ? false : true}
          formatCreateLabel={(userInput) => `${t("Create")} "${userInput}"`}
          placeholder={placeholder}
          isValidNewOption={(inputValue, selectValue) => {
            return (
              inputValue.length > 0 &&
              selectValue.length < 3 &&
              !options.find(
                (each) =>
                  each.label.toLocaleLowerCase().trim() ===
                  inputValue.toLocaleLowerCase().trimEnd()
              ) &&
              !isSelectOnly
            );
          }}
          value={value ? value : ""}
          onChange={
            isSingle
              ? onChange
              : (newValue, actionMeta) => {
                  if ((newValue && newValue.length <= 3) || !newValue) {
                    onChange(newValue);
                  }
                }
          }
          options={options}
          classNamePrefix={isInvalid ? "invalid-select" : ""}
          styles={customStyle}
          components={customComponent}
        />
        {isInvalid && errorMessage && (
          <Form.Text className="invalid-text">{errorMessage}</Form.Text>
        )}
        {description && (
          <Form.Text className="text-muted-description">
            {description}
          </Form.Text>
        )}
      </Form.Group>
    );
  }
);

export const Switch = React.memo(
  ({ id, checked, onChange, variant, label }) => {
    return (
      <Form.Group>
        <Form.Check
          type="switch"
          label={label}
          id={id ? id : `switch-${new Date().getTime()}`}
          checked={checked}
          onChange={onChange}
          className={variant === "primary" && "primary_switch"}
        />
      </Form.Group>
    );
  }
);

export const IconButton = React.memo(({ text, onClick, disabled, type }) => {
  return (
    <ButtonContainer onClick={onClick} disabled={disabled} type={type}>
      <span className="button-text">{text}</span>
      <span className="icon-container">&gt;</span>
    </ButtonContainer>
  );
});

export const PrimaryButton = React.memo(
  ({ text, onClick, disabled, variant, type }) => {
    return (
      text && (
        <PrimaryButtonContainer
          onClick={onClick}
          disabled={disabled}
          variant={variant}
          type={type ? type : "button"}
        >
          <span className="button-text">{text}</span>
        </PrimaryButtonContainer>
      )
    );
  }
);

export const BackButton = React.memo(({ text, onClick }) => {
  return (
    <BackButtonContainer onClick={onClick}>
      <span className="back-button-text">{text}</span>
    </BackButtonContainer>
  );
});

export const Tab = React.memo(({ text, subText, isActive }) => {
  return (
    <TabContainer>
      <div
        className={
          isActive ? "tab-sub-container active-tab" : "tab-sub-container"
        }
      >
        <div className="tab-main-text">{text}</div>
        {subText && <div className="tab-sub-text">{subText}</div>}
      </div>
    </TabContainer>
  );
});

export const Loading = ({ uploadPercentage }) => {
  // const { t } = useTranslation();
  return (
    <LoadingContainer>
      {uploadPercentage ? (
        <div>
          <div className="file-upload-label">
            {/* {t("Uploading")} {uploadPercentage.name} */}
            {uploadPercentage.message}
            {uploadPercentage.name && <div>({uploadPercentage.name})</div>}
          </div>
          {uploadPercentage.progress ? (
            <ProgressBar
              now={parseInt(uploadPercentage.progress, 10)}
              label={`${parseInt(uploadPercentage.progress, 10)}%`}
            />
          ) : null}
        </div>
      ) : (
        <div>
          <Spinner animation="border" />
        </div>
      )}
    </LoadingContainer>
  );
};

export const PageTitle = React.memo(({ text }) => {
  return <PageTitleContainer>{text}</PageTitleContainer>;
});

export const WarningBlock = ({ t }) => {
  return (
    <WarningContainer>
      <span>
        {t("warning_block_part1")}
        <b className="read-more-text bold-text">
          {t("Read more")}.
        </b> <br /> {t("warning_block_part2")}{" "}
        <b className="bold-text">help@scaleplus.co</b>
      </span>
    </WarningContainer>
  );
};

export const ChallengeHeader = React.memo(
  ({
    primaryButtonText,
    primaryButtonClick,
    primaryButtonDisable,
    secondaryButtonText,
    secondaryButtonClick,
    challengeData,
    organisationId,
    progress,
  }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const getChallengeMethod = useCallback(
      (challengeId) => dispatch(getChallengeAction(challengeId)),
      [dispatch]
    );

    const updateChallengeMethod = (data) =>
      dispatch(updateChallengeAction(data));

    const challengeReducer = useSelector((state) => {
      return state.challengeReducer;
    });

    useEffect(() => {
      if (challengeReducer.success) {
        getChallengeMethod(challengeData._id);
      }
    }, [getChallengeMethod, challengeData, challengeReducer]);

    return (
      <ChallengeHeaderContainer>
        <div className="left-continer">
          <div className="oval-container">
            <img
              src={
                organisationId &&
                organisationId.details &&
                organisationId.details.logo
                  ? organisationId.details.logo
                  : "/images/image.svg"
              }
              height={
                organisationId &&
                organisationId.details &&
                organisationId.details.logo
                  ? "100%"
                  : "20px"
              }
              width={
                organisationId &&
                organisationId.details &&
                organisationId.details.logo
                  ? "100%"
                  : "20px"
              }
              alt=""
            ></img>
          </div>
          <div className="organization-name">
            <span>
              {organisationId &&
                organisationId.details &&
                organisationId.details.name}
            </span>
          </div>
        </div>
        <div className="right-continer">
          {progress && (
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
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
          )}
          {localStorage.getItem("userRole") === Constants.ROLES.ADMIN ||
          localStorage.getItem("userId").toString() ===
            organisationId._id.toString() ? (
            <div className="privacy-switch">
              <Switch
                checked={challengeData && challengeData.isPrivate}
                onChange={() => {
                  updateChallengeMethod({
                    _id: challengeData._id,
                    isPrivate: !challengeData.isPrivate,
                  });
                }}
                variant="primary"
                label={t("Make Private")}
              ></Switch>
            </div>
          ) : null}
          {secondaryButtonText && (
            <div style={{ margin: "0px 10px" }}>
              <PrimaryButton
                variant="secondary"
                text={secondaryButtonText}
                onClick={secondaryButtonClick}
              ></PrimaryButton>
            </div>
          )}
          {primaryButtonText && (
            <PrimaryButton
              variant="primary"
              text={primaryButtonText}
              onClick={primaryButtonClick}
              disabled={primaryButtonDisable}
            ></PrimaryButton>
          )}
        </div>
      </ChallengeHeaderContainer>
    );
  }
);

export const ChallengeViewHeader = React.memo(
  ({ buttonText, buttonClick, buttonVariant, organisationId, viewCount }) => {
    const [show, setShow] = useState(false);
    return (
      <ChallengeViewHeaderContainer>
        <div className="left-continer">
          <div className="oval-container">
            <img
              src={
                organisationId &&
                organisationId.details &&
                organisationId.details.logo
                  ? organisationId.details.logo
                  : "/images/image.svg"
              }
              height={
                organisationId &&
                organisationId.details &&
                organisationId.details.logo
                  ? "100%"
                  : "20px"
              }
              width={
                organisationId &&
                organisationId.details &&
                organisationId.details.logo
                  ? "100%"
                  : "20px"
              }
              alt=""
            ></img>
          </div>
          <div className="organization-name">
            <span>
              {organisationId &&
                organisationId.details &&
                organisationId.details.name}
            </span>
          </div>
        </div>
        <div className="right-continer">
          <div className="view-container">
            <div className="view-icon-container">
              <img
                src={"/images/eye-yellow.svg"}
                height="35px"
                width="35px"
                alt=""
              ></img>
            </div>
            <div className="view-count">
              <span>{viewCount}</span>
            </div>
          </div>
          <div
            className="share-container"
            style={
              theme.isLTR
                ? buttonText
                  ? { marginRight: "30px" }
                  : { marginRight: "0px" }
                : buttonText
                ? { marginLeft: "30px" }
                : { marginLeft: "0px" }
            }
          >
            <Dropdown>
              <Dropdown.Toggle
                as={React.forwardRef(({ children, onClick }, ref) => (
                  <div
                    style={
                      theme.isLTR ? { marginRight: 10 } : { marginLeft: 10 }
                    }
                    ref={ref}
                  >
                    <button onClick={onClick}>
                      <div className="icon-container">
                        <img
                          src={"/images/share-yellow.svg"}
                          height="20px"
                          width="25px"
                          alt=""
                        ></img>
                      </div>
                      <div className="text">
                        <span>Share</span>
                      </div>
                    </button>
                  </div>
                ))}
                id="add-item-menu"
              ></Dropdown.Toggle>

              <Dropdown.Menu alignRight={true} className="menu-items">
                <Dropdown.Item
                  key={1}
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <div className="menu-text">Share as Email</div>
                </Dropdown.Item>
                <CopyToClipboard
                  text={window.location.href}
                  onCopy={() => {
                    alert("Copied");
                  }}
                >
                  <Dropdown.Item key={2}>
                    <div className="menu-text">Copy Link</div>
                  </Dropdown.Item>
                </CopyToClipboard>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {buttonText && (
            <PrimaryButton
              variant={buttonVariant}
              text={buttonText}
              onClick={buttonClick}
            ></PrimaryButton>
          )}
        </div>
        <ShareAsEmail show={show} setShow={setShow} />
      </ChallengeViewHeaderContainer>
    );
  }
);

export const RemoveButton = React.memo(({ onClick }) => {
  return (
    <RemoveButtonContainer onClick={onClick}>
      <img src={"/images/trash.svg"} height="20px" width="20px" alt=""></img>
    </RemoveButtonContainer>
  );
});

export const AddButton = React.memo(({ onClick }) => {
  return (
    <AddButtonContainer onClick={onClick}>
      <img src={"/images/more.png"} height="20px" width="20px" alt=""></img>
    </AddButtonContainer>
  );
});

export const UpdateCountButton = React.memo(({ onClick }) => {
  return (
    <UpdateCountButtonContainer onClick={onClick}>
      <div style={{ height: "12px" }}>
        <img
          src={"/images/uparrow.svg"}
          height="12px"
          width="12px"
          alt=""
        ></img>
      </div>
      <div style={{ height: "12px" }}>
        <img
          src={"/images/downarrow.svg"}
          height="12px"
          width="12px"
          alt=""
        ></img>
      </div>
    </UpdateCountButtonContainer>
  );
});

export const CommonTable = React.memo(
  ({ columns, data, filters, onRowClick }) => {
    return (
      <TableContainer>
        {filters}
        <Table responsive>
          <thead>
            <tr>
              {columns && columns.length
                ? columns.map((column, index) => {
                    return (
                      <th
                        key={index}
                        width={column.width ? column.width : "auto"}
                      >
                        {column.HeaderCell
                          ? column.HeaderCell()
                          : column.Header}
                      </th>
                    );
                  })
                : null}
            </tr>
          </thead>
          <tbody>
            {data && data.length
              ? data.map((each, index) => {
                  return (
                    <tr key={index}>
                      {columns && columns.length
                        ? columns.map((column, index) => {
                            return (
                              <td
                                key={index}
                                onClick={() =>
                                  onRowClick && !column.standAlone
                                    ? onRowClick(each)
                                    : {}
                                }
                              >
                                {column.Cell
                                  ? column.Cell(each[column.accessor], each)
                                  : each[column.accessor]}
                              </td>
                            );
                          })
                        : null}
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </TableContainer>
    );
  }
);

export const CardComponent = React.memo(
  ({
    t,
    showProgress,
    organisationId,
    descriptionId,
    judgesId,
    participantsId,
    timelineId,
    applications,
    qualified,
  }) => {
    const [participantCount, setCount] = useState(0);
    const [progressPer, setProgressPer] = useState(0);
    const [currentMilestone, setCurrentMilestone] = useState("");
    const [leftDuration, setLeftDuration] = useState("");
    const [challengeStarted, setChallengeStart] = useState(false);

    useEffect(() => {
      let selectedData = null,
        perByPart;
      if (timelineId && timelineId.data && timelineId.data.length) {
        const { data } = timelineId;
        perByPart = 100 / data.length;
        for (let i = 0; i < data.length; i++) {
          const each = data[i];
          if (selectedData) {
            selectedData =
              new Date(each.startDate).getTime() <= new Date().getTime() &&
              new Date(each.endDate).getTime() >= new Date().getTime() &&
              new Date(each.endDate).getTime() >=
                new Date(selectedData.endDate).getTime()
                ? each
                : selectedData;
          } else {
            selectedData =
              new Date(each.startDate).getTime() <= new Date().getTime() &&
              new Date(each.endDate).getTime() >= new Date().getTime()
                ? each
                : selectedData;
          }
        }
        if (selectedData && selectedData.state && selectedData.state.name) {
          const index = data.findIndex(
            (each) => each._id.toString() === selectedData._id.toString()
          );
          if (index >= 0) {
            setProgressPer((index + 1) * perByPart);
          }
          setCurrentMilestone(selectedData.state.name);
        }
      }
    }, [timelineId]);

    useEffect(() => {
      if (timelineId && timelineId.data && timelineId.data.length) {
        const { data } = timelineId;
        for (let i = 0; i < data.length; i++) {
          const each = data[i];
          if (each.state.name === "Start") {
            const currentDate = new Date().getTime();
            const startDate = new Date(each.startDate).getTime();
            if (currentDate > startDate) {
              setChallengeStart(true);
            } else {
              setChallengeStart(false);
            }
          }
          if (each.state.name === "Closing") {
            const currentDate = new Date().getTime();
            const closingEndDate = new Date(each.endDate).getTime();
            const diffTime = Math.abs(closingEndDate - currentDate);
            if (closingEndDate > currentDate) {
              const diffDays = Math.floor(diffTime / 86400000); // days
              const diffHrs = Math.floor((diffTime % 86400000) / 3600000); // hours
              const diffMins = Math.round(
                ((diffTime % 86400000) % 3600000) / 60000
              ); // minutes

              if (diffDays || diffHrs || diffMins) {
                let leftduration = "";
                if (diffDays) {
                  leftduration = `${diffDays} ${t("day")} `;
                }
                if (diffHrs) {
                  leftduration += `${diffHrs} ${t("hour")} `;
                }
                if (diffMins) {
                  leftduration += `${diffMins} ${t("minute")} `;
                }
                leftduration += `${t("left")}`;
                setLeftDuration(leftduration);
              }
            }
          }
        }
      }
    }, [timelineId, t]);

    useEffect(() => {
      let count = 0;
      if (participantsId && participantsId.data) {
        const { data } = participantsId;
        for (let i = 0; i < data.length; i++) {
          const each = data[i];
          count += each.team.length;
        }
      }
      setCount(count);
    }, [participantsId]);

    return (
      <CardContainer>
        <Card
          className={
            !leftDuration ||
            (organisationId &&
              organisationId.status === Constants.STATUS.INACTIVE)
              ? "disable"
              : ""
          }
        >
          <Card.Img
            variant="top"
            src={
              descriptionId && descriptionId.bannerImage
                ? descriptionId.bannerImage
                : "/images/image.svg"
            }
          />
          <Card.Body>
            <Card.Text>
              {t("By")}{" "}
              {organisationId &&
                organisationId.details &&
                organisationId.details.name}
            </Card.Text>
            <Card.Title>{descriptionId && descriptionId.title}</Card.Title>
            <Card.Text className="description">
              {descriptionId && descriptionId.shortDescription}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div className="days-price-container bordered-container">
              <div className="days-container">
                <img
                  src={"/images/interface.svg"}
                  height="25px"
                  width="25px"
                  alt=""
                ></img>
                <div className="days-text">
                  {leftDuration ? (
                    !challengeStarted ? (
                      <span>{t("Comming soon")}</span>
                    ) : currentMilestone ? (
                      <span>{leftDuration}</span>
                    ) : (
                      <span>{t("In progress")}</span>
                    )
                  ) : (
                    <span>{t("Completed")}</span>
                  )}
                </div>
              </div>
              <div className="prize-text">
                <span>
                  {t("Prize")} {descriptionId && descriptionId.prize}{" "}
                </span>
                {/* <span>Prize AED 50K </span> */}
              </div>
            </div>
            {showProgress && (
              <>
                <div className="bordered-container">
                  <div className="heading-text">
                    <span>{t("Current Milestone")}</span>
                  </div>
                  <div
                    className={`sub-heading-text ${
                      leftDuration
                        ? progressPer && currentMilestone
                          ? `${currentMilestone}-progress`
                          : "Comming-progress"
                        : "Completed-progress"
                    }`}
                  >
                    {leftDuration ? (
                      progressPer && currentMilestone ? (
                        <ProgressBar
                          now={progressPer}
                          label={currentMilestone}
                        />
                      ) : !challengeStarted ? (
                        <ProgressBar now={100} label={t("Comming soon")} />
                      ) : (
                        <ProgressBar now={100} label={t("In progress")} />
                      )
                    ) : (
                      <ProgressBar now={100} label={t("Completed")} />
                    )}
                  </div>
                </div>
                <div className="count-container">
                  <div className="left-container">
                    <div className="sub-heading-text">
                      <span>{t("Participants/Matches")}</span>
                    </div>
                    <div className="heading-text">
                      <span>{participantCount}</span>
                    </div>
                  </div>
                  <div className="right-container">
                    <div className="sub-heading-text">
                      <span>{t("Judges")}</span>
                    </div>
                    <div className="heading-text">
                      <span>
                        {judgesId && judgesId.data && judgesId.data.length
                          ? judgesId.data.length
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="count-container">
                  <div className="left-container">
                    <div className="sub-heading-text">
                      <span>{t("Applications")}</span>
                    </div>
                    <div className="heading-text">
                      <span>{applications}</span>
                    </div>
                  </div>
                  <div className="right-container">
                    <div className="sub-heading-text">
                      <span>{t("Qualified")}</span>
                    </div>
                    <div className="heading-text">
                      <span>{qualified}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card.Footer>
        </Card>
        <div
          className={`circle-container ${
            !leftDuration ||
            (organisationId &&
              organisationId.status === Constants.STATUS.INACTIVE)
              ? "disable"
              : ""
          }`}
        >
          <img
            src={
              organisationId &&
              organisationId.details &&
              organisationId.details.logo
                ? organisationId.details.logo
                : "/images/image.svg"
            }
            height={
              organisationId &&
              organisationId.details &&
              organisationId.details.logo
                ? "100%"
                : "40px"
            }
            width={
              organisationId &&
              organisationId.details &&
              organisationId.details.logo
                ? "100%"
                : "40px"
            }
            alt=""
          ></img>
        </div>
      </CardContainer>
    );
  }
);
