import React from "react";
import { Row, Col } from "react-bootstrap";
import { PageTitle, PrimaryButton } from "../../../common";
import { HeaderComponent } from "../common";
import { MainContainer, ContentContainer } from "./style";
import history from "../../../../history";
const tags = ["Challenge Tag", "Challenge Tag", "Challenge Tag"];

const OverView = ({
  isOrganisation,
  isMentor_Judge,
  isLoggedIn,
  isProfileUpdated,
  setUserFlowModal,
}) => {
  return (
    <MainContainer>
      <Row className="justify-content-center image-box-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row>
            <Col lg={7} md={8} sm={12} xs={12}>
              <div className="left-container"></div>
            </Col>
            <Col lg={5} md={4} sm={12} xs={12}>
              <div className="right-container">
                <PageTitle text="Challenge Title Here if its long it will be on 2 lines or more" />
                <div className="tab-container">
                  {tags.map((each, index) => {
                    return <span key={index}>{each}</span>;
                  })}
                </div>
                <div
                  className="sub-text-container"
                  style={{ marginBottom: !isOrganisation ? 30 : 60 }}
                >
                  <span>
                    Give a tiny bot a new set of tools to explore the moon.
                    Share your ideas for a mini payload to make lunar
                    exploration more effective.
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
                      <span>$0000</span>
                    </div>
                  </div>
                </div>
                {!isOrganisation && (
                  <div className="button-container">
                    <PrimaryButton
                      variant="primary"
                      text={
                        isMentor_Judge
                          ? "Judge this Challenge"
                          : "Solve Challenge"
                      }
                      onClick={() => {
                        if (isLoggedIn) {
                          if (isProfileUpdated) {
                            if (isMentor_Judge) {
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
            <HeaderComponent
              titleText="Challenge Overview"
              buttonText="Edit Overview"
              buttonVariant="info"
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <div className="description">
              The moon has fascinated people from time immemorial. We have all
              spent nights staring up at the starry sky, looking at the moon in
              wonder. For most of us, travel to the moon is out of reach. But
              now, you have the opportunity to send your tech to the moon!
              <br />
              <br />
              NASA’s new lunar exploration program is the Artemis Program. As
              human space exploration evolves toward a permanent presence on the
              lunar surface, In situ Resource Utilization (ISRU) will become
              increasingly important. Resupply missions are very expensive. We
              need to develop practical and affordable ways to identify and use
              lunar resources, so that our astronaut crews can become more
              independent of Earth. Future astronauts have to be able to locate
              and collect lunar resources and then transform them into the
              essentials for life: breathable air, water for drinking and food
              production, building materials for shelter, rocket propellants,
              and more. Our mission capabilities will rapidly increase when
              useful products can be created from in-situ resources.
            </div>
            <div className="image-container">
              <img
                src={"/images/image.svg"}
                height="225px"
                width="225px"
                alt=""
              ></img>
            </div>
            <div className="description">
              Imagine a rover the size of your Roomba® crawling the moon’s
              surface. These small rovers developed by NASA and commercial
              partners provide greater mission flexibility and allow NASA to
              collect key information about the lunar surface. However, existing
              science payloads are too big, too heavy, and require too much
              power for these rovers and new, miniaturized payload designs are
              needed. Payloads need to be similar in size to a new bar of soap
              to fit cleanly inside the rover (maximum external dimensions:
              100mm x 100mm x 50mm).
              <br />
              <br /> This ideation challenge will award $160,000 total in prizes
              across two categories. This ideation challenge is expected to be
              followed by new challenges to prototype, test, and deliver these
              miniaturized payloads. This larger effort will generate a
              maturation pipeline of next-generation instruments, sensors, and
              experiments that can be used for lunar exploration over the next
              few years.
            </div>
            <div className="image-container">
              <img
                src={"/images/image.svg"}
                height="225px"
                width="225px"
                alt=""
              ></img>
            </div>
            <div className="description">
              Imagine a rover the size of your Roomba® crawling the moon’s
              surface. These small rovers developed by NASA and commercial
              partners provide greater mission flexibility and allow NASA to
              collect key information about the lunar surface. However, existing
              science payloads are too big, too heavy, and require too much
              power for these rovers and new, miniaturized payload designs are
              needed. Payloads need to be similar in size to a new bar of soap
              to fit cleanly inside the rover (maximum external dimensions:
              100mm x 100mm x 50mm).
            </div>
          </Col>
        </Row>
        {!isOrganisation && (
          <Row className="justify-content-center">
            <Col lg={3} md={3} sm={3} xs={3} className="button-container">
              <PrimaryButton
                variant="primary"
                text={
                  isMentor_Judge ? "Judge this Challenge" : "Solve Challenge"
                }
                onClick={() => {
                  if (isLoggedIn) {
                    if (isProfileUpdated) {
                      if (isMentor_Judge) {
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
