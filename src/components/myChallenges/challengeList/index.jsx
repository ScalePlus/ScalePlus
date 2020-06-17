import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyChallengeAction } from "../action";
import { CardComponent, Loading } from "../../common";
import { MainContainer } from "./style";
import { Constants } from "../../../lib/constant";
// let cards = [
//   {
//     src: "/images/Rectangle1.png",
//     progress: 80,
//     variant: "warning",
//     label: "Judging",
//   },
//   {
//     src: "/images/Rectangle2.png",
//     progress: 10,
//     variant: "success",
//     label: "Start",
//   },
// ];

const MyChallengesList = ({ history }) => {
  const dispatch = useDispatch();
  const getMyChallengeMethod = useCallback(
    () => dispatch(getMyChallengeAction()),
    [dispatch]
  );

  const is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION &&
      localStorage.getItem("token"),
    userId = localStorage.getItem("userId");
  const [myChallenges, setMyChallenges] = useState([]);

  const myChallengesReducer = useSelector((state) => {
    return state.myChallengesReducer;
  });

  useEffect(() => {
    getMyChallengeMethod();
  }, [getMyChallengeMethod]);

  useEffect(() => {
    const { myChallenges } = myChallengesReducer;
    if (myChallenges && myChallenges.result && myChallenges.result.length) {
      setMyChallenges(myChallenges.result);
    }
  }, [myChallengesReducer, is_organisation, userId]);

  // const [menu, setMenu] = useState(null);
  return (
    <MainContainer>
      {myChallengesReducer.loading && <Loading />}
      <div className="my-content-container">
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <div className="header">
              <div className="title">
                <span>My Challenges</span>
              </div>
              <div className="circle-container">
                <span className="count">{myChallenges.length}</span>
              </div>
            </div>
            <div className="card-list">
              <Row style={{ paddingRight: 0, paddingLeft: 0 }}>
                {myChallenges && myChallenges.length
                  ? myChallenges.map((each, index) => {
                      return (
                        <Col
                          lg={4}
                          md={6}
                          sm={12}
                          xs={12}
                          key={index}
                          className="custom-card"
                          onClick={() => {
                            history.push(
                              `/challenge/${each._id}/preview/Overview`
                            );
                          }}
                        >
                          <CardComponent
                            organisationId={each.organisationId}
                            descriptionId={each.descriptionId}
                            judgesId={each.judgesId}
                            progress={80}
                            variant="warning"
                            label="Judging"
                          />
                          {/* <div
                        className={
                          menu === index
                            ? "hover-container active"
                            : "hover-container"
                        }
                        onClick={() => {
                          if (menu === index) {
                            setMenu(null);
                          } else {
                            setMenu(index);
                          }
                        }}
                      >
                        <div className="content-container">
                          <div className="view-tab">View</div>
                          <div className="border-container"></div>
                          <div className="manage-tab">Manage</div>
                        </div>
                        <div className="image-container">
                          <img
                            src="/images/ui.png"
                            alt=""
                            height="20px"
                            width="25px"
                          />
                        </div>
                      </div> */}
                        </Col>
                      );
                    })
                  : null}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </MainContainer>
  );
};

export default MyChallengesList;
