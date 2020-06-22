import React, { useState } from "react";
import {
  Form,
  Button,
  Spinner,
  Table,
  Card,
  ProgressBar,
  InputGroup,
} from "react-bootstrap";
import Select, { components } from "react-select";
import DatePicker from "react-datepicker";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ReactQuill from "react-quill";
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
import theme from "../../theme";
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

export const OrDevider = React.memo(() => {
  return (
    <ORDeviderContainer>
      <div className="left-border"></div>
      <span>or</span>
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
    ...props
  }) => {
    let fileUploader;
    return (
      <Form.Group>
        {label && <Form.Label className="text-label">{label}</Form.Label>}
        {prependButtonText ? (
          <>
            <InputGroup>
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
                onChange={onChange}
                accept={acceptTypes ? acceptTypes : "image/*"}
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
              onChange={onChange}
              accept={acceptTypes ? acceptTypes : "image/*"}
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
  ({ value, onChange, label, description, acceptTypes }) => {
    let fileUploader;
    return (
      <Form.Group>
        {label && <Form.Label className="text-label">{label}</Form.Label>}
        <div
          className="banner-input"
          onClick={() => {
            fileUploader.click();
          }}
        >
          {value ? (
            <img
              src={value && value.name ? URL.createObjectURL(value) : value}
              alt=""
              className="selected-img"
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
              {!value && <div>Upload image</div>}
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
          onChange={onChange}
          accept={acceptTypes ? acceptTypes : "image/*"}
        />
        {description && (
          <Form.Text className="text-muted-description">
            {description}
          </Form.Text>
        )}
      </Form.Group>
    );
  }
);

export const PassInput = React.memo(({ errorMessage, ...props }) => {
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
});

export const DateInput = React.memo(
  ({
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
    isSmall,
  }) => {
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
          style={{
            marginTop: isSmall ? "-32px" : "-42px",
            marginRight: isSmall ? "15px" : "20px",
          }}
          height="25px"
          width="25px"
          alt=""
        ></img>
        {!value && errorMessage && (
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
  }) => {
    const customStyle = {
      indicatorSeparator: () => ({
        display: "none",
      }),
      control: (provided, state) => ({
        ...provided,
        padding: isSmall ? "0px 10px 0px 0px" : "10px 20px",
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
        textAlign: "left",
        backgroundColor: theme.colors.gray98,
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
          isMulti={isSingle ? false : true}
          placeholder={placeholder}
          // isValidNewOption={(inputValue, selectValue) => {
          //   return inputValue.length > 0 && selectValue.length < 3;
          // }}
          value={value}
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

export const Switch = React.memo(({ checked, onChange, variant, label }) => {
  return (
    <Form.Group>
      <Form.Check
        type="switch"
        label={label}
        id={`switch-${new Date().getTime()}`}
        checked={checked}
        onChange={onChange}
        className={variant === "primary" && "primary_switch"}
      />
    </Form.Group>
  );
});

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

export const Loading = () => {
  return (
    <LoadingContainer>
      <Spinner animation="border" />
    </LoadingContainer>
  );
};

export const PageTitle = React.memo(({ text }) => {
  return <PageTitleContainer>{text}</PageTitleContainer>;
});

export const WarningBlock = () => {
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
};

export const ChallengeHeader = React.memo(
  ({
    primaryButtonText,
    primaryButtonClick,
    secondaryButtonText,
    secondaryButtonClick,
    organisationId,
    progress,
  }) => {
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
            ></PrimaryButton>
          )}
        </div>
      </ChallengeHeaderContainer>
    );
  }
);

export const ChallengeViewHeader = React.memo(
  ({ primaryButtonText, primaryButtonClick, shareClick, organisationId }) => {
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
              <span>2000</span>
            </div>
          </div>
          <div
            className="share-container"
            style={
              primaryButtonText
                ? { marginRight: "30px" }
                : { marginRight: "0px" }
            }
          >
            <button onClick={shareClick}>
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
          {primaryButtonText && (
            <PrimaryButton
              variant="primary"
              text={primaryButtonText}
              onClick={primaryButtonClick}
            ></PrimaryButton>
          )}
        </div>
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
        {filters && (
          <div className="filter-container">
            <div className="controll-container">
              <DropDown
                isSmall={true}
                isSingle={true}
                placeholder="Filter Results"
                options={[]}
              />
              <Input type="text" placeholder="Search" />
              <div className="text">Search</div>
            </div>
          </div>
        )}
        <Table responsive>
          <thead>
            <tr>
              {columns &&
                columns.length &&
                columns.map((column, index) => {
                  return (
                    <th
                      key={index}
                      width={column.width ? column.width : "auto"}
                    >
                      {column.HeaderCell ? column.HeaderCell() : column.Header}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length &&
              data.map((each, index) => {
                return (
                  <tr key={index}>
                    {columns &&
                      columns.length &&
                      columns.map((column, index) => {
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
                      })}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </TableContainer>
    );
  }
);

export const CardComponent = React.memo(
  ({ variant, progress, label, organisationId, descriptionId, judgesId }) => {
    return (
      <CardContainer>
        <Card>
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
              By{" "}
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
                  <span>30 days left</span>
                </div>
              </div>
              <div className="prize-text">
                <span>Prize AED 50K </span>
              </div>
            </div>
            {variant && progress && label && (
              <>
                <div className="bordered-container">
                  <div className="heading-text">
                    <span>Current Milestone</span>
                  </div>
                  <div className="sub-heading-text">
                    <ProgressBar
                      variant={variant}
                      now={progress}
                      label={label}
                    />
                  </div>
                </div>
                <div className="count-container">
                  <div className="left-container">
                    <div className="sub-heading-text">
                      <span>Participants/Matches</span>
                    </div>
                    <div className="heading-text">
                      <span>0</span>
                    </div>
                  </div>
                  <div className="right-container">
                    <div className="sub-heading-text">
                      <span>Judges</span>
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
              </>
            )}
          </Card.Footer>
        </Card>
        <div className="circle-container">
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
