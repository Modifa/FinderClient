import React, { useState } from "react";
import { Label, Modal, ModalHeader, ModalBody } from "reactstrap";
import { FcApproval } from "react-icons/fc";
import styled from "styled-components";

const Success = ({modalSuccess,toggleSuccess }) => {

  return (
    <Modal isOpen={modalSuccess} toggle={toggleSuccess}>
    <ModalHeader toggle={toggleSuccess}></ModalHeader>
    <ModalBody>
        <div style={{display: "flex", justifyContent: "center"}}>
        <h2>Done</h2>

      </div>
    <div style={{display: "flex", justifyContent: "center"}}>
      <FcApproval size={70}/>{""}

      </div>
    </ModalBody>

  </Modal>
  );
};

export default Success;
const ProfileOuterContainer = styled.div`
  display: flex;
  background-color: white;
`;
