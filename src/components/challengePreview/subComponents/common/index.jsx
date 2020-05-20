import React, { useState } from "react";
import { Collapse, Row, Col } from "react-bootstrap";

import { SearchInput, PrimaryButton } from "../../../common";
import {
  TitleContainer,
  TitleContainerWithSearchBox,
  ExpandCollapseContainer,
  StepperVerticalContainer,
} from "./style";

export function HeaderComponent({
  titleText,
  buttonText,
  buttonVariant,
  buttonType,
  infoButtonText,
  infoButtonVariant,
  infoButtonType,
  infoButtonClick,
}) {
  return (
    <TitleContainer>
      <Row>
        <Col lg={8} md={8} sm={8} xs={6}>
          <div className={"title"}>
            <span>{titleText}</span>
          </div>
        </Col>
        <Col lg={4} md={4} sm={4} xs={6}>
          <div className="float-right" style={{ display: "flex" }}>
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
            <div>
              <PrimaryButton
                variant={buttonVariant}
                type={buttonType}
                text={buttonText}
                onClick={() => {}}
              ></PrimaryButton>
            </div>
          </div>
        </Col>
      </Row>
    </TitleContainer>
  );
}

export function HeaderComponentWithSearchBox({ titleText, buttonText }) {
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
        </Row>
      </div>
    </TitleContainerWithSearchBox>
  );
}

export function ExpandCollapse({ title, timestamp, link, description }) {
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
            {link && (
              <div className="link">
                <a href="/">{link}</a>
              </div>
            )}
            {description && <div className="description">{description}</div>}
          </div>
        </div>
      </Collapse>
    </ExpandCollapseContainer>
  );
}

export function VeticalStepper({ steps }) {
  const activeIndex = steps.findIndex((each) => {
    return each.active;
  });

  return (
    <StepperVerticalContainer>
      <div className="steps">
        {steps &&
          steps.length &&
          steps.map((each, index) => {
            return (
              <div
                className={
                  each.active
                    ? "step active"
                    : index < activeIndex
                    ? "step selected"
                    : "step"
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
                </div>
              </div>
            );
          })}
      </div>
    </StepperVerticalContainer>
  );
}
