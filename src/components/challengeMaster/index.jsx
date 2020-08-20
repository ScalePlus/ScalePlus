import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { useTranslation } from "react-i18next";
import Stepper from "../stepper";
import { Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createChallengeAction,
  challengeCategoriesListAction,
  getCurrencyListAction,
} from "./action";
// import Api from "../challengeMaster/api";
import theme from "../../theme";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { MainContainer } from "./style";
import { Loading } from "../common";
import { Constants } from "../../lib/constant";

const ChallengeMaster = ({ match, history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const createChallengeMethod = (data) => dispatch(createChallengeAction(data));
  const challengeCategoriesListMethod = useCallback(
    () => dispatch(challengeCategoriesListAction()),
    [dispatch]
  );
  const getCurrencyList = useCallback(() => dispatch(getCurrencyListAction()), [
    dispatch,
  ]);

  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const [activeStep, setActiveStep] = useState(0);
  const [typeOfSolution, setTypeOfSolution] = useState(null);
  const [title, setTitle] = useState("");
  const [prize, setPrize] = useState("");
  const [categories, selectCategories] = useState([]);
  const [currency, selectCurrency] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [shortDescription, setSortDescription] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [cropedBannerImage, setCropedBannerImage] = useState("");
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
  const [uploadPercentage, setUploadPercentage] = useState(null);

  useEffect(() => {
    if (match && match.params && match.params.step) {
      setActiveStep(parseFloat(match.params.step) - 1);
    }
  }, [match]);

  useEffect(() => {
    challengeCategoriesListMethod();
  }, [challengeCategoriesListMethod]);

  useEffect(() => {
    getCurrencyList();
  }, [getCurrencyList]);

  useEffect(() => {
    const { error, currencyList } = challengeReducer;

    if (currencyList) {
      if (currencyList.length) {
        setCurrencyList(currencyList);
      } else {
        setCurrencyList([]);
      }
    }

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
    let file = cropedBannerImage ? cropedBannerImage : bannerImage;
    setLoading(true);

    if (file && file.name) {
      // let fileResult = await Api.uploadFile({
      //   file: file,
      // });
      // if (fileResult && fileResult.result && fileResult.result.imageKey) {
      //   file = fileResult.result.imageKey;
      // }

      let formData = new FormData();

      formData.append("file", file);

      let fileResult = await Axios({
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
        method: "POST",
        data: formData,
        url: "/uploadFile", // route name
        baseURL: Constants.BASE_URL, //local url
        onUploadProgress: (progress) => {
          const { total, loaded } = progress;
          const totalSizeInMB = total / 1000000;
          const loadedSizeInMB = loaded / 1000000;
          const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
          setUploadPercentage({
            name: file.name,
            message: t("Uploading banner image"),
            progress: parseInt(uploadPercentage, 10),
          });
        },
        encType: "multipart/form-data",
      });

      if (
        fileResult &&
        fileResult.status === 200 &&
        fileResult.data &&
        fileResult.data.result &&
        fileResult.data.result.imageKey
      ) {
        file = fileResult.data.result.imageKey;
        setUploadPercentage({
          message: t("Upload is successful and saved"),
        });
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
      {(challengeReducer.loading || loading) && (
        <Loading uploadPercentage={uploadPercentage} />
      )}
      <Row className="justify-content-center">
        <Col lg={7} md={10} sm={12} className="container">
          <Stepper
            steps={[
              {
                onClick: (e) => {
                  e.preventDefault();
                  history.push("/create/challenge/1");
                },
              },
              {
                onClick: (e) => {
                  e.preventDefault();
                  history.push("/create/challenge/2");
                },
              },
              {
                onClick: (e) => {
                  e.preventDefault();
                  history.push("/create/challenge/3");
                },
              },
              {
                onClick: (e) => {
                  e.preventDefault();
                  history.push("/create/challenge/4");
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
              t={t}
              history={history}
              typeOfSolution={typeOfSolution}
              setTypeOfSolution={setTypeOfSolution}
            ></Step1>
          ) : activeStep === 1 ? (
            <Step2
              t={t}
              history={history}
              title={title}
              setTitle={setTitle}
              prize={prize}
              setPrize={setPrize}
              categories={categories}
              selectCategories={selectCategories}
              currency={currency}
              selectCurrency={selectCurrency}
              shortDescription={shortDescription}
              setSortDescription={setSortDescription}
              bannerImage={bannerImage}
              setBannerImage={setBannerImage}
              cropedBannerImage={cropedBannerImage}
              setCropedBannerImage={setCropedBannerImage}
              videoURL={videoURL}
              setVideoURL={setVideoURL}
              currencyList={currencyList}
            ></Step2>
          ) : activeStep === 2 ? (
            <Step3
              t={t}
              history={history}
              problemStatement={problemStatement}
              changeProblemStatement={changeProblemStatement}
              currentSolution={currentSolution}
              changeCurrentSolution={changeCurrentSolution}
              painPoint={painPoint}
              changePainPoint={changePainPoint}
            ></Step3>
          ) : activeStep === 3 ? (
            <Step4
              t={t}
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
