import React from "react";
import { Dropdown } from "react-bootstrap";
import { MainContainer } from "./style";

function Users({ t, history }) {
  return (
    <MainContainer>
      <div className="header-container">
        <div className="left-block">
          <div className="users-text">{t("Users")} 30</div>
          <div
            className="view-text"
            onClick={() => {
              history.push("/users");
            }}
          >
            {t("View All")}
          </div>
        </div>
        <Dropdown>
          <Dropdown.Toggle
            as={React.forwardRef(({ children, onClick }, ref) => (
              <div
                className="filter-button-container"
                onClick={(e) => {
                  e.preventDefault();
                  onClick(e);
                }}
                ref={ref}
              >
                <div>
                  <img
                    src={"/images/filter-icon.png"}
                    height="20px"
                    width="20px"
                    alt=""
                  ></img>
                </div>
                <div className="filter-text">
                  <span>{t("Filters")}</span>
                </div>
                <div className="filter-count">
                  <span className="count-text">{2}</span>
                </div>
              </div>
            ))}
          ></Dropdown.Toggle>
          <Dropdown.Menu alignRight={true} className="user-filter-menu">
            <Dropdown.Item eventKey={1} onClick={() => {}}>
              {t("All Users")}
            </Dropdown.Item>
            <div className="border-container"></div>
            <Dropdown.Item eventKey={2} onClick={() => {}}>
              {t("All Admins")}
            </Dropdown.Item>
            <Dropdown.Item eventKey={3} onClick={() => {}}>
              {t("Admin Invites")}
            </Dropdown.Item>
            <Dropdown.Item eventKey={4} onClick={() => {}}>
              {t("Submitted Application")}
            </Dropdown.Item>
            <div className="border-container"></div>
            <Dropdown.Item eventKey={5} onClick={() => {}}>
              {t("Startup/Individual Only")}
            </Dropdown.Item>
            <Dropdown.Item eventKey={6} onClick={() => {}}>
              {t("Invited")}
            </Dropdown.Item>
            <Dropdown.Item eventKey={7} onClick={() => {}}>
              {t("Submitted Application")}
            </Dropdown.Item>
            <div className="border-container"></div>
            <Dropdown.Item eventKey={5} onClick={() => {}}>
              {t("Judge Only")}
            </Dropdown.Item>
            <Dropdown.Item eventKey={6} onClick={() => {}}>
              {t("Invited")}
            </Dropdown.Item>
            <Dropdown.Item eventKey={7} onClick={() => {}}>
              {t("Submitted Application")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="list-container">
        <div
          className="block"
          onClick={() => {
            history.push("/profile/view/123");
          }}
        >
          <div>
            <div className="basic-information">
              <div className="user-name">Ali Jaradeh</div>
              <div className="user-role">Individual</div>
            </div>
            <div className="challenge-name">
              Low Impact Agriculture Challenge
            </div>
          </div>
          <div>
            <div className="status-container">Invited</div>
            <div>01.07.2020</div>
          </div>
        </div>
        <div
          className="block"
          onClick={() => {
            history.push("/profile/view/123");
          }}
        >
          <div>
            <div className="basic-information">
              <div className="user-name">Ali Jaradeh</div>
              <div className="user-role">Individual</div>
            </div>
            <div className="challenge-name">
              Low Impact Agriculture Challenge
            </div>
          </div>
          <div>
            <div className="status-container">Invited</div>
            <div>01.07.2020</div>
          </div>
        </div>
        <div
          className="block"
          onClick={() => {
            history.push("/profile/view/123");
          }}
        >
          <div>
            <div className="basic-information">
              <div className="user-name">Ali Jaradeh</div>
              <div className="user-role">Individual</div>
            </div>
            <div className="challenge-name">
              Low Impact Agriculture Challenge
            </div>
          </div>
          <div>
            <div className="status-container">Invited</div>
            <div>01.07.2020</div>
          </div>
        </div>
        <div
          className="block"
          onClick={() => {
            history.push("/profile/view/123");
          }}
        >
          <div>
            <div className="basic-information">
              <div className="user-name">Ali Jaradeh</div>
              <div className="user-role">Individual</div>
            </div>
            <div className="challenge-name">
              Low Impact Agriculture Challenge
            </div>
          </div>
          <div>
            <div className="status-container">Invited</div>
            <div>01.07.2020</div>
          </div>
        </div>
        <div
          className="block"
          onClick={() => {
            history.push("/profile/view/123");
          }}
        >
          <div>
            <div className="basic-information">
              <div className="user-name">Ali Jaradeh</div>
              <div className="user-role">Individual</div>
            </div>
            <div className="challenge-name">
              Low Impact Agriculture Challenge
            </div>
          </div>
          <div>
            <div className="status-container">Invited</div>
            <div>01.07.2020</div>
          </div>
        </div>
        <div className="pagination">
          1 of 2 <span className="next-page">{">"}</span> <span>{">>"}</span>
        </div>
      </div>
    </MainContainer>
  );
}

export default Users;
