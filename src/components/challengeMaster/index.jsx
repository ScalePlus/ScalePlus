import React, { useState, useEffect, useCallback } from "react";
import Stepper from "../stepper";
import { Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createChallengeAction, challengeCategoriesListAction } from "./action";
import Api from "../challengeMaster/api";
import theme from "../../theme";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { MainContainer } from "./style";
import { Loading } from "../common";

const ChallengeMaster = () => {
  const dispatch = useDispatch();
  const createChallengeMethod = (data) => dispatch(createChallengeAction(data));
  const challengeCategoriesListMethod = useCallback(
    () => dispatch(challengeCategoriesListAction()),
    [dispatch]
  );

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const [activeStep, setActiveStep] = useState(0);
  const [typeOfSolution, setTypeOfSolution] = useState(null);
  const [title, setTitle] = useState("");
  const [prize, setPrize] = useState("");
  const [categories, selectCategories] = useState([]);
  const [shortDescription, setSortDescription] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [problemStatement, changeProblemStatement] = useState("");
  const [currentSolution, changeCurrentSolution] = useState("");
  const [painPoint, changePainPoint] = useState("");
  const [launchDate, changeLaunchDate] = useState(null);
  const [dueDate, changeDueDate] = useState(null);
  const [biginDate, changeBiginDate] = useState(null);
  const [endDate, changeEndDate] = useState(null);
  const [anounceDate, changeAnounceDate] = useState(null);
  const [timeline, changeTimeline] = useState([
    {
      _id: `timeline-1`,
      startDate: "",
      endDate: "",
      state: "",
      description: "",
      adminAttachments: [],
    },
  ]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    challengeCategoriesListMethod();
  }, [challengeCategoriesListMethod]);

  useEffect(() => {
    const { error } = challengeReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [challengeReducer]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  const createChallenge = async () => {
    let file = bannerImage;
    setLoading(true);

    if (file && file.name) {
      let fileResult = await Api.uploadFile({
        file: file,
      });
      if (fileResult && fileResult.result && fileResult.result.imageKey) {
        file = fileResult.result.imageKey;
      }
    }

    setLoading(false);
    createChallengeMethod({
      typeOfSolution,
      title,
      prize,
      categories,
      shortDescription,
      bannerImage: file,
      videoURL,
      problemStatement,
      currentSolution,
      painPoint,
      timeline,
    });
  };

  return (
    <MainContainer>
      {(challengeReducer.loading || loading) && <Loading />}
      <Row className="justify-content-center">
        <Col lg={7} md={10} sm={12} className="container">
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
            defaultColor={theme.colors.lightSilver}
            completeColor={theme.colors.yellow}
            defaultBarColor={theme.colors.lightSilver}
            completeBarColor={theme.colors.yellow}
            circleTop={40}
            size={32}
            circleFontSize={14}
            showNumber={true}
            showStartEndLabel={false}
          />

          {errors && errors.length ? (
            <Alert
              variant={"danger"}
              className="text-left"
              style={{
                marginTop: "50px",
                marginBottom: "0px",
              }}
            >
              {errors.map((each, index) => {
                return <div key={index}>{each}</div>;
              })}
            </Alert>
          ) : null}

          {activeStep === 0 ? (
            <Step1
              setActiveStep={setActiveStep}
              typeOfSolution={typeOfSolution}
              setTypeOfSolution={setTypeOfSolution}
            ></Step1>
          ) : activeStep === 1 ? (
            <Step2
              setActiveStep={setActiveStep}
              title={title}
              setTitle={setTitle}
              prize={prize}
              setPrize={setPrize}
              categories={categories}
              selectCategories={selectCategories}
              shortDescription={shortDescription}
              setSortDescription={setSortDescription}
              bannerImage={bannerImage}
              setBannerImage={setBannerImage}
              videoURL={videoURL}
              setVideoURL={setVideoURL}
            ></Step2>
          ) : activeStep === 2 ? (
            <Step3
              setActiveStep={setActiveStep}
              problemStatement={problemStatement}
              changeProblemStatement={changeProblemStatement}
              currentSolution={currentSolution}
              changeCurrentSolution={changeCurrentSolution}
              painPoint={painPoint}
              changePainPoint={changePainPoint}
            ></Step3>
          ) : activeStep === 3 ? (
            <Step4
              launchDate={launchDate}
              changeLaunchDate={changeLaunchDate}
              dueDate={dueDate}
              changeDueDate={changeDueDate}
              biginDate={biginDate}
              changeBiginDate={changeBiginDate}
              endDate={endDate}
              changeEndDate={changeEndDate}
              anounceDate={anounceDate}
              changeAnounceDate={changeAnounceDate}
              createChallenge={createChallenge}
              timeline={timeline}
              changeTimeline={changeTimeline}
            ></Step4>
          ) : null}
        </Col>
      </Row>
    </MainContainer>
  );
};

export default ChallengeMaster;
