import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FcCancel } from "react-icons/fc";

const Faillure = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <FcCancel />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            document
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Faillure;
