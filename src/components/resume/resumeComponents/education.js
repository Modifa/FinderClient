import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
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
import styled from "styled-components";
import "./style.css";
import {FetchEducation, AddEducation} from '../../../utils/utils'

const Education = () => {
  const [education, setEducation] = useState(null);
  const [userName, SetUserName] = useState(null);

  const [modal, setModal] = useState(false);
  const [current, SetCurrent] = useState(true);
  const [selectedOption, setSelectedOption] = useState(0);
  const toggle = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  const Current = () => SetCurrent(!current);
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const [details, setDetails] = useState({
    intsitution_: "",
    qualification_type: 0,
    qualification_name_: "",
    start_date_: "",
    end_date_: "",
  });


  const User = localStorage.getItem("developerProfile");
  const UserObject = JSON.parse(User);
  const Edu = localStorage.getItem("developerEducation");
  const EXPObject = JSON.parse(Edu);

  useEffect(() => {
    //
    if (UserObject) {
      console.log("Progress", userName);
      FetchEducation(UserObject.UserName);
    } else {
      return;
    }
    //
    if (!EXPObject ||EXPObject.length ==  0 ) {
      setEducation(null);
    } else {
      setEducation(EXPObject);
    }
  }, []);



    const HandleSubmit = (e) => {
      //function AddEducation(Id, UserName, Intsitution, Start_date, EndDate, Qualification_name, Qualification_type_) {

      e.preventDefault()
      AddEducation(
      UserObject.Id,
      UserObject.UserName,
      details.intsitution_,
      details.start_date_,
      details.end_date_,
      details.qualification_name_,
      selectedOption,
    );
  };

  return (
    <ProfileOuterContainer>
      {!education ? (
        <Card title={[<h6>Add Education</h6>]}>
          <div>
            <Button color="primary" onClick={toggle}>
              <i class="bi bi-plus-circle"></i>
            </Button>
          </div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={closeBtn}>
              Modal title
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Institution</Label>
                  <Input onChange={handleChange} name="intsitution_" required />

                  <Label for="exampleEmail">Qualification Type</Label>

                  <Input
                    type="select"
                    value={selectedOption}
                    name="qualification_type"
                    onChange={e => {
                      setSelectedOption(e.target.value);
                    }}                  >
                    <option value={1}>National Senior Certificate</option>
                    <option value={2}>Higher Certificate</option>
                    <option value={3}>National Diploma</option>
                    <option value={4}>Bachelors degree</option>
                    <option value={5}>Honours degree</option>
                    <option value={6}>Masters degre</option>
                    <option value={7}>Doctors degree</option>
                  </Input>
                  <Label for="exampleEmail">Qualification Name</Label>
                  <Input onChange={handleChange} name="qualification_name_" required />

                  <Label for="examplePassword">Start Date</Label>
                  <Input
                    type="date"
                    onChange={handleChange}
                    name="start_date_"
                    required
                  />
                  {!current ? (
                    <b></b>
                  ) : (
                    <>
                      <Label for="exampleEmail">End Date</Label>
                      <Input
                        type="date"
                        onChange={handleChange}
                        name="end_date_"
                        required
                      />
                    </>
                  )}
                  <Input
                    type="checkbox"
                    onChange={handleChange}
                    name="end_date_"
                    onClick={Current}
                    required
                  />
                  <Label for="exampleEmail"> I Am Still Studying</Label>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={HandleSubmit}>
                Add
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Card>
      ) : (
        <>
          <Row>
            <Col>
              <Card title={[<h6>Education</h6>]}>
                <br></br>
                <Row gutter={[24, 24]}>
                  {education.map((i, index) => (
                    <Col span={24} key={index}>
                      <Card>
                        <div className="tileContainer">
                          <h5>
                            <i class="bi bi-building"></i> Tshwane University Of
                            Technology
                          </h5>
                          <h6>
                            {" "}
                            <i class="bi bi-mortarboard"></i> National Diploma
                          </h6>
                          <h6>
                            {" "}
                            <i class="bi bi-book"></i> Computer Science
                          </h6>

                          <p>
                            From <i class="bi bi-calendar3"></i> 1 March 2015
                          </p>
                          <p>
                            To <i class="bi bi-calendar3"></i> 1 March 2022
                          </p>

                          <div className="col-action">
                            <Button color="danger">
                              <i class="bi bi-trash"></i>
                            </Button>
                            <Button color="success">
                              <i class="bi bi-pen"></i>
                            </Button>
                          </div>
                        </div>
                      </Card>
                      <br></br>
                    </Col>
                  ))}
                </Row>
              </Card>
              <div>
                <Button color="primary" onClick={toggle}>
                  <i class="bi bi-plus-circle"></i>
                </Button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </ProfileOuterContainer>
  );
};

export default Education;
const ProfileOuterContainer = styled.div`
  display: flex;
  background-color: white;
`;
