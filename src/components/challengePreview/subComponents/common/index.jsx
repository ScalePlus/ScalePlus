import React, { useState } from "react";
import { Collapse, Row, Col, Dropdown } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { SearchInput, PrimaryButton, FileInput } from "../../../common";
import {
  TitleContainer,
  TitleContainerWithSearchBox,
  ExpandCollapseContainer,
  StepperVerticalContainer,
} from "./style";
import theme from "../../../../theme";

export const HeaderComponent = React.memo(
  ({
    titleText,
    buttonText,
    buttonVariant,
    buttonType,
    buttonClick,
    infoButtonText,
    infoButtonVariant,
    infoButtonType,
    infoButtonClick,
    menuButtonText,
    menuButtonVariant,
    menuList,
    haveProgressBar,
    progress,
    backButton,
    onBackButtonClick,
  }) => {
    return (
      <TitleContainer>
        <div className={"title"} style={{ marginBottom: 10 }}>
          {backButton && (
            <div onClick={onBackButtonClick} className="back-arrow">
              <img src="/images/back.png" alt="" height={25} width={25} />
            </div>
          )}
          <span>{titleText}</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          {haveProgressBar && (
            <div style={{ marginRight: 10 }}>
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
            </div>
          )}
          {infoButtonText && (
            <div style={{ marginRight: 10 }}>
              <PrimaryButton
                variant={infoButtonVariant}
                type={infoButtonType}
                text={infoButtonText}
                onClick={infoButtonClick}
              ></PrimaryButton>
            </div>
          )}
          {menuButtonText && (
            <Dropdown>
              <Dropdown.Toggle
                as={React.forwardRef(({ children, onClick }, ref) => (
                  <div style={{ marginRight: 10 }} ref={ref}>
                    <PrimaryButton
                      variant={menuButtonVariant}
                      text={menuButtonText}
                      onClick={(e) => {
                        e.preventDefault();
                        onClick(e);
                      }}
                    ></PrimaryButton>
                  </div>
                ))}
                id="add-item-menu"
              ></Dropdown.Toggle>

              <Dropdown.Menu
                alignRight={true}
                className="submission-menu-items"
              >
                {menuList &&
                  menuList.map((each, index) => {
                    return (
                      <Dropdown.Item
                        eventKey={index}
                        key={index}
                        onClick={each.onClick}
                      >
                        <div className="menu-text"> {each.title}</div>
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
          )}
          {buttonText && (
            <div>
              <PrimaryButton
                variant={buttonVariant}
                type={buttonType}
                text={buttonText}
                onClick={buttonClick}
              ></PrimaryButton>
            </div>
          )}
        </div>
      </TitleContainer>
    );
  }
);

export const HeaderComponentWithSearchBox = React.memo(
  ({ titleText, buttonText }) => {
    return (
      <TitleContainerWithSearchBox>
        <div className={"title"}>
          <span>{titleText}</span>
        </div>
        <div className="search-container">
          <Row>
            <Col lg={3} md={3} sm={6} xs={6}>
              <SearchInput placeholder="Search Forum"></SearchInput>
            </Col>
            {buttonText && (
              <Col
                lg={{ span: 4, offset: 5 }}
                md={{ span: 4, offset: 4 }}
                sm={6}
                xs={6}
              >
                <div className="float-right">
                  <PrimaryButton
                    variant="info"
                    text={buttonText}
                    onClick={() => {}}
                  ></PrimaryButton>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </TitleContainerWithSearchBox>
    );
  }
);

export const ExpandCollapse = React.memo(
  ({ title, timestamp, attachmentLink, link, description }) => {
    const [open, setOpen] = useState(false);
    return (
      <ExpandCollapseContainer>
        <div className="main-container" onClick={() => setOpen(!open)}>
          <div className="content-container">
            {title && <span className="title">{title}</span>}
            {timestamp && <span className="timestamp">{timestamp}</span>}
          </div>
          <div className="icon-container">
            <img
              src={open ? "/images/chevronUp.png" : "/images/chevronDown.png"}
              height={"20px"}
              width={"20px"}
              alt=""
            ></img>
          </div>
        </div>
        <Collapse in={open}>
          <div>
            <div className="collapse-container">
              {attachmentLink && (
                <div className="link">
                  <a
                    href={attachmentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {attachmentLink}
                  </a>
                </div>
              )}
              {link && (
                <div className="link">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </div>
              )}
              {description && <div className="description">{description}</div>}
            </div>
          </div>
        </Collapse>
      </ExpandCollapseContainer>
    );
  }
);

export const VeticalStepper = React.memo(({ steps, is_startup_Individual }) => {
  // const activeIndex =
  //   steps && steps.length
  //     ? steps.findIndex((each) => {
  //         return each.active;
  //       })
  //     : 0;

  return (
    <StepperVerticalContainer>
      <div className="steps">
        {steps && steps.length
          ? steps.map((each, index) => {
              return (
                <div
                  className={
                    // each.active
                    //   ? "step active"
                    //   : each.completed
                    //   ? "step selected"
                    //   : index < activeIndex
                    // ? "step selected"
                    `step ${each.active ? "active" : ""} ${
                      each.completed ? "selected" : ""
                    } ${steps.length === 1 ? "single-child" : ""}`
                  }
                  key={index}
                >
                  {index === 0 && (
                    <div className="start-label">
                      <span>Start</span>
                    </div>
                  )}
                  {index === steps.length - 1 && (
                    <div className="end-label">
                      <span>Finish</span>
                    </div>
                  )}
                  <div className="outer-oval">
                    <div className="inner-oval" />
                  </div>
                  <div className={each.active ? "content active" : "content"}>
                    {each.timestamp && (
                      <div className="timestamp"> {each.timestamp}</div>
                    )}
                    {each.title && <div className="title">{each.title}</div>}
                    {each.description && (
                      <div className="description">{each.description}</div>
                    )}
                    {is_startup_Individual &&
                    each.downloadFiles &&
                    each.downloadFiles.length ? (
                      <div className="download-files-container">
                        {each.downloadFiles.map((fileData, index) => {
                          return (
                            <div className="download-block" key={index}>
                              <div className="icon-container">
                                <img
                                  src="/images/attach.png"
                                  alt=""
                                  height="25px"
                                  width="25px"
                                />
                              </div>
                              <div className="name">{fileData.label}</div>
                              <div className="button-container">
                                <PrimaryButton
                                  variant="success_light"
                                  text={"Download attachment"}
                                  onClick={() => {
                                    if (fileData && fileData.fileURL) {
                                      window.open(fileData.fileURL);
                                    } else {
                                      alert("No file found.");
                                    }
                                  }}
                                ></PrimaryButton>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                    {is_startup_Individual &&
                    each.uploadFiles &&
                    each.uploadFiles.length ? (
                      <div className="upload-files-container">
                        {each.uploadFiles.map((name, index) => {
                          return (
                            <div className="upload-block" key={index}>
                              <div className="name">{name}</div>
                              <div className="file-container">
                                <FileInput
                                  placeholder="file name……word"
                                  prependButtonText="Browse"
                                ></FileInput>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </StepperVerticalContainer>
  );
});
