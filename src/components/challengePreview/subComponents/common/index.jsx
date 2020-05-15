import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { PrimaryButton } from "../../../common";
import {
  TitleContainer,
  ExpandCollapseContainer,
  StepperContainer,
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

export function Stepper({ steps }) {
  return (
    <StepperContainer>
      {steps &&
        steps.length &&
        steps.map((each, index) => {
          return (
            <div className="main-container" key={index}>
              <div className="side-border" active={index}></div>
              <div className="step-circle"></div>
              <div className="content">
                <div className="timestamp"> April 9, 2020, 9 a.m. +04</div>
                <div className="title">Date Launched</div>
                <div className="description">
                  Give a tiny bot a new set of tools to explore the moon. Share
                  your ideas for a mini payload to make lunar exploration more
                  effective.
                </div>
              </div>
            </div>
          );
        })}
    </StepperContainer>
  );
}
