import React from "react";
import { Row, Col } from "react-bootstrap";
import { PageTitle, PrimaryButton } from "../../../common";
import { HeaderComponent } from "../common";
import { MainContainer, ContentContainer } from "./style";
import history from "../../../../history";
let tagsList = [
  { value: "1", label: "tag1" },
  { value: "2", label: "tag2" },
  { value: "3", label: "tag3" },
];

const OverView = ({
  challengeData,
  is_organisation,
  is_mentor_judge,
  is_logged_in,
  is_profile_updated,
  setUserFlowModal,
}) => {
  return (
    <MainContainer>
      <Row className="justify-content-center image-box-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row>
            <Col lg={7} md={8} sm={12} xs={12}>
              <div className="left-container">
                <img
                  alt=""
                  src={
                    challengeData.descriptionId &&
                    challengeData.descriptionId.bannerImage
                      ? challengeData.descriptionId.bannerImage
                      : "/images/image.svg"
                  }
                ></img>
              </div>
            </Col>
            <Col lg={5} md={4} sm={12} xs={12}>
              <div className="right-container">
                <PageTitle
                  text={
                    challengeData.descriptionId &&
                    challengeData.descriptionId.title
                  }
                />
                <div className="tab-container">
                  {challengeData.descriptionId &&
                  challengeData.descriptionId.tags &&
                  challengeData.descriptionId.tags.length
                    ? challengeData.descriptionId.tags.map((each, index) => {
                        let record = tagsList.find(
                          (option) => option.value === each
                        );
                        if (record && record.label) {
                          return <span key={index}>{record.label}</span>;
                        }
                        return null;
                      })
                    : null}
                </div>
                <div
                  className="sub-text-container"
                  style={{
                    marginBottom: 25,
                    maxHeight: !is_organisation ? "8rem" : "215px",
                  }}
                >
                  <span>
                    {challengeData.descriptionId &&
                      challengeData.descriptionId.shortDescription}
                  </span>
                </div>
                <div className="bottom-container">
                  <div className="stage-container">
                    <div className="title-text">
                      <span>Stage:</span>
                    </div>
                    <div className="sub-text">
                      <span>Pre registration</span>
                    </div>
                  </div>
                  <div className="prize-container">
                    <div className="title-text">
                      <span>Prize:</span>
                    </div>
                    <div className="sub-text">
                      <span>
                        $
                        {challengeData.descriptionId &&
                          challengeData.descriptionId.prize}
                      </span>
                    </div>
                  </div>
                </div>
                {!is_organisation && (
                  <div className="button-container">
                    <PrimaryButton
                      variant="primary"
                      text={
                        is_mentor_judge
                          ? "Judge this Challenge"
                          : "Solve Challenge"
                      }
                      onClick={() => {
                        if (is_logged_in) {
                          if (is_profile_updated) {
                            if (is_mentor_judge) {
                              history.push("/dashboard");
                            } else {
                              history.push("/solve/challenge");
                            }
                          } else {
                            history.push("/detail");
                          }
                        } else {
                          setUserFlowModal(true);
                        }
                      }}
                    ></PrimaryButton>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <ContentContainer>
        <Row className="justify-content-center header-container">
          <Col lg={11} md={11} sm={11} xs={11}>
            {is_organisation ? (
              <HeaderComponent
                titleText="Challenge Overview"
                buttonText="Edit Overview"
                buttonVariant="info"
                buttonClick={() => {
                  history.push(`/challenge/${challengeData._id}/edit/Overview`);
                }}
              />
            ) : (
              <HeaderComponent titleText="Challenge Overview" />
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html:
                  challengeData.overviewId && challengeData.overviewId.data,
              }}
            ></div>
            <div className="image-container">
              <img
                src={"/images/image.svg"}
                height="225px"
                width="225px"
                alt=""
              ></img>
            </div>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html:
                  challengeData.overviewId && challengeData.overviewId.data,
              }}
            ></div>
            <div className="image-container">
              <img
                src={"/images/image.svg"}
                height="225px"
                width="225px"
                alt=""
              ></img>
            </div>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html:
                  challengeData.overviewId && challengeData.overviewId.data,
              }}
            ></div>
          </Col>
        </Row>
        {!is_organisation && (
          <Row className="justify-content-center">
            <Col lg={3} md={3} sm={3} xs={3} className="button-container">
              <PrimaryButton
                variant="primary"
                text={
                  is_mentor_judge ? "Judge this Challenge" : "Solve Challenge"
                }
                onClick={() => {
                  if (is_logged_in) {
                    if (is_profile_updated) {
                      if (is_mentor_judge) {
                        history.push("/dashboard");
                      } else {
                        history.push("/solve/challenge");
                      }
                    } else {
                      history.push("/detail");
                    }
                  } else {
                    setUserFlowModal(true);
                  }
                }}
              ></PrimaryButton>
            </Col>
          </Row>
        )}
      </ContentContainer>
    </MainContainer>
  );
};

export default React.memo(OverView);
