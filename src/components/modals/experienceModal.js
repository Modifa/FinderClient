import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

const ExperienceModal = (modal, toggle) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle} close={closeBtn}>
      Add Experience
    </ModalHeader>
    <ModalBody>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Job Title</Label>
          <Input onChange={handleChange} name="title_name" required />
          <Label for="exampleEmail">Company/Organization</Label>
          <Input onChange={handleChange} name="company" required />

          <Label for="examplePassword">Start Date</Label>
          <Input
            type="date"
            onChange={handleChange}
            name="start_date"
            required
          />
          {!currentWork ? (
            <b></b>
          ) : (
            <>
              <Label for="exampleEmail">End Date</Label>
              <Input
                type="date"
                onChange={handleChange}
                name="end_date"
                required
              />
            </>
          )}
          <Input
            type="checkbox"
            onChange={handleChange}
            name="email"
            onClick={CurrentWork}
            required
          />
          <Label for="exampleEmail"> I Still Work Here</Label>
        </FormGroup>
      </Form>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" type="submit" onClick={HandleSubmit}>
        Add
      </Button>{" "}
      <Button color="secondary">
        Cancel
      </Button>
    </ModalFooter>
  </Modal>

  )
}

export default ExperienceModal
