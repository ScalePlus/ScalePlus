import React from "react";
import { Modal } from "react-bootstrap";
import { PrimaryButton } from "../../common";
import { HeaderContainer, ContentContainer } from "./style";

const TeamAgreement = ({ show, setShow, setCheck }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="team-agreement-modal"
    >
      <Modal.Body>
        <HeaderContainer>Team Agreement</HeaderContainer>
        <ContentContainer>
          <div className="description-container">
            By joining a team you agree that you are collaborating with others
            to submit a single Entry. Collectively, the team acts as a challenge
            entrant and all team members must meet the eligibility criteria and
            agree to and abide by the Challenge Specific agreement and Rules of
            the challenge to be entered.
            <br />
            <br />
            The team captain must submit any and all entries and will act as the
            single point of contact for a submitted entry and will be
            responsible for the distribution of any awards made for the
            submitted Entry.
            <br />
            <br />
            The Sponsor and ScalePlus are not responsible for any prize payment
            issues that may arise among team members. The team is solely
            responsible for resolving these (or any other) issues themselves. If
            a replacement team captain is selected, they will assume all
            responsibilities that the original team captain agreed to.
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
