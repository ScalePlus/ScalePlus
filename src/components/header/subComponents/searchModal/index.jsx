import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchAllAction } from "./action";
import { Input } from "../../../common";
import { HeaderContainer, ContentContainer } from "./style";
import history from "../../../../history";
// let organizations = ["Ministry Of ....", "IBM", "Al Futtaim Group"];
// let users = ["User 1", "User 2", "User 3"];

const SearchModal = ({ show, setShow }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchAllMethod = (searchText) => dispatch(searchAllAction(searchText));

  const searchAllReducer = useSelector((state) => {
    return state.searchAllReducer;
  });

  const [errors, setErrors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const { error, searchData } = searchAllReducer;
    if (
      searchText &&
      searchData &&
      searchData.result &&
      searchData.result.length
    ) {
      setChallenges(searchData.result);
    }

    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [searchAllReducer, searchText]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="search-modal"
    >
      <Modal.Body>
        <HeaderContainer>
          <Row className="justify-content-center">
            <Col lg={10} md={10} sm={12} xs={12}>
              <div className="header-component">
                <div className="left-container">
                  <Input
                    type="text"
                    placeholder={t("Type here to search")}
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      if (e.target.value) {
                        searchAllMethod(e.target.value);
                      } else {
                        setChallenges([]);
                      }
                    }}
                  ></Input>
                </div>
                <div
                  className="right-container"
                  onClick={() => {
                    setSearchText("");
                    setShow(false);
                  }}
                >
                  <span>x</span>
                </div>
              </div>
            </Col>
          </Row>
        </HeaderContainer>
        <ContentContainer>
          {errors && errors.length ? (
            <Row
              className="justify-content-center"
              style={{ paddingTop: "45px" }}
            >
              <Col lg={10} md={10} sm={12} xs={12}>
                <Alert variant={"danger"} className="text-left">
                  {errors.map((each, index) => {
                    return <div key={index}>{each}</div>;
                  })}
                </Alert>
              </Col>
            </Row>
          ) : null}
          <Row className="justify-content-center">
            <Col lg={10} md={10} sm={12} xs={12}>
              <div className="title-container">
                <span>{t("Challenges")}</span>
              </div>
              {challenges && challenges.length ? (
                challenges.map((each, index) => {
                  return (
                    <div
                      className="challenge-container"
                      key={index}
                      onClick={() => {
                        setSearchText("");
                        setShow(false);
                        history.push(`/challenge/${each._id}/preview/Overview`);
                      }}
                    >
                      <div className="image-container">
                        <img
                          src={
                            each.descriptionId && each.descriptionId.bannerImage
                              ? each.descriptionId.bannerImage
                              : "/images/image.svg"
                          }
                          alt=""
                        ></img>
                      </div>
                      <div>
                        <div className="name">
                          {t("By")}{" "}
                          {each.organisationId &&
                            each.organisationId.details &&
                            each.organisationId.details.name}
                        </div>
                        <div className="description">
                          {each.descriptionId && each.descriptionId.title}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="name">
                  <span>{t("No Challenges")}</span>
                </div>
              )}
              {/* <div className="sub-title-container">
                <span>View All Challenges {">"}</span>
              </div> */}
              {/* <div className="title-container">
                <span>Organizations</span>
              </div>
              {organizations.map((each, index) => {
                return (
                  <div className="challenge-container" key={index}>
                    <div className="circle-container">
                      <img
                        alt=""
                        src={"/images/image.svg"}
                        height={40}
                        width={40}
                      ></img>
                    </div>
                    <div className="description">{each}</div>
                  </div>
                );
              })}
              <div className="sub-title-container">
                <span>View All Organizations {">"}</span>
              </div>
              <div className="title-container">
                <span>Users</span>
              </div>
              {users.map((each, index) => {
                return (
                  <div className="challenge-container" key={index}>
                    <div className="circle-container">
                      <img
                        alt=""
                        src={"/images/image.svg"}
                        height={40}
                        width={40}
                      ></img>
                    </div>
                    <div className="description">{each}</div>
                  </div>
                );
              })}
              <div className="sub-title-container">
                <span>View All Users {">"}</span>
              </div> */}
            </Col>
          </Row>
        </ContentContainer>
      </Modal.Body>
    </Modal>
  );
};
export default React.memo(SearchModal);
