import React, { useState } from "react";
import Stepper from "../stepper";
import { Row, Col } from "react-bootstrap";
import theme from "../../theme";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { MainContainer } from "./style";

function ChallengeMaster() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={6} md={10} sm={12}>
          <Stepper
            steps={[
              {
                onClick: (e) => {
                  e.preventDefault();
                  setActiveStep(0);
                },
              },
              {
                onClick: (e) => {
                  e.preventDefault();
                  setActiveStep(1);
                },
              },
              {
                onClick: (e) => {
                  e.preventDefault();
                  setActiveStep(2);
                },
              },
              {
                onClick: (e) => {
                  e.preventDefault();
                  setActiveStep(3);
                },
              },
            ]}
            activeStep={activeStep}
            activeColor={theme.colors.yellow}
            defaultColor={theme.colors.stepperDefaultColor}
            completeColor={theme.colors.yellow}
            defaultBarColor={theme.colors.stepperDefaultColor}
            completeBarColor={theme.colors.yellow}
            circleTop={40}
            size={32}
            circleFontSize={14}
          />

          {activeStep === 0 ? (
            <Step1></Step1>
          ) : activeStep === 1 ? (
            <Step2></Step2>
          ) : activeStep === 2 ? (
            <Step3></Step3>
          ) : activeStep === 3 ? (
            <Step4></Step4>
          ) : null}
        </Col>
      </Row>
    </MainContainer>
  );
}

export default ChallengeMaster;
