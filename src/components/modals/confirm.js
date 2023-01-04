import React, { useState } from "react";
import { Label, Modal, ModalHeader, ModalBody } from "reactstrap";
import { FcApproval } from "react-icons/fc";
import styled from "styled-components";

const Confirm = () => {
  return (
    <Modal isOpen={modalConfirm} toggle={toggleConfirm}>
      <ModalHeader toggle={toggleConfirm}></ModalHeader>
      <ModalBody>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>Are You Sure?</h2>
        </div>{" "}
        <ModalFooter>
          <Button
            color="success"
          >
            <i class="bi bi-pen"></i>
          </Button>{" "}
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default Confirm;
