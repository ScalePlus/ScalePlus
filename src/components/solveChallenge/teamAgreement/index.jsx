import React from "react";
import { Modal } from "react-bootstrap";
import { PrimaryButton } from "../../common";
import { HeaderContainer, ContentContainer } from "./style";

const TeamAgreement = ({ t, show, setShow, setCheck }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="team-agreement-modal"
      centered
    >
      <Modal.Body>
        <HeaderContainer>{t("Team Agreement")}</HeaderContainer>
        <ContentContainer>
          <div className="description-container">
            {t("team_agreement_para1")}
            <br />
            <br />
            {t("team_agreement_para2")}
            <br />
            <br />
            {t("team_agreement_para3")}
          </div>
          <div className="button-container">
            <PrimaryButton
              variant="primary"
              text={"I Agree"}
              onClick={() => {
                setCheck(true);
                setShow(false);
              }}
            ></PrimaryButton>
          </div>
        </ContentContainer>
      </Modal.Body>
    </Modal>
  );
};
export default React.memo(TeamAgreement);
