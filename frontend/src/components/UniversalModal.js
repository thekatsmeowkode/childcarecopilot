import { Modal } from "react-bootstrap";
import React from "react";

const UniversalModal = ({
  isOpen,
  onClose,
  formComponent,
  modalTitle,
  student,
  setSelectedStudent,
  setWaitlistStudents,
  setStudents
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
          setStudents,
          setWaitlistStudents
        })}
      </Modal.Body>
    </Modal>
  );
};

export default UniversalModal;
