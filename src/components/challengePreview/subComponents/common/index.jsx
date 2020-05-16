import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { PrimaryButton } from "../../../common";
import {
  TitleContainer,
  ExpandCollapseContainer,
  StepperVerticalContainer,
} from "./style";

export function HeaderComponent({ titleText, buttonText }) {
  return (
    <TitleContainer>
      <div>
        <div className={"title"}>
          <span>{titleText}</span>
          <div className="title-border"></div>
        </div>
      </div>
      <div>
        <PrimaryButton
          variant="info"
          text={buttonText}
          onClick={() => {}}
        ></PrimaryButton>
      </div>
    </TitleContainer>
  );
}

export function ExpandCollapse({ title, timestamp, link, description }) {
  const [open, setOpen] = useState(false);
  return (
    <ExpandCollapseContainer>
      <div className="main-container">
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
            onClick={() => setOpen(!open)}
          ></img>
        </div>
      </div>
      <Collapse in={open}>
        <div className="collapse-container">
          {link && (
            <div className="link">
              <a href="/">{link}</a>
            </div>
          )}
          {description && <div className="description">{description}</div>}
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
