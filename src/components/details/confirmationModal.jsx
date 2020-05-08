import React from "react";
import { Modal } from "react-bootstrap";
import { PrimaryButton } from "../common";

const ConfirmationModal = ({
  show,
  handleClose,
  handleNewUpload,
  handleContinueOld,
}) => {
  return (
    <Modal show={show} onHide={handleClose} id="verifyModal">
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you want to upload new selected logo or continue with old logo ?
      </Modal.Body>
      <Modal.Footer>
        <PrimaryButton onClick={handleNewUpload} text={"Upload New"} />
        <PrimaryButton
          onClick={handleContinueOld}
          text={"Continue using Old"}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
