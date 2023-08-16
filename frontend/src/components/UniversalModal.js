import { Modal } from "react-bootstrap";
import React from "react";

const UniversalModal = ({
  isOpen,
  onClose,
  formComponent,
  modalTitle,
  student,
  setSelectedStudent,
}) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {React.cloneElement(formComponent, {
          onClose,
          student,
          setSelectedStudent,
        })}
      </Modal.Body>
    </Modal>
  );
};

export default UniversalModal;
