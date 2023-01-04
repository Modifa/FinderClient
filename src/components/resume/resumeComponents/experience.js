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
import Skeleton from "react-loading-skeleton";
import { FetchExpeience, AddEducation } from "../../../utils/utils";
import Success from "../../modals/success";
import Alert from "react-bootstrap/Alert";

function Experience() {
  var MAINDOMAIN = `https://37eb-102-69-208-230.in.ngrok.io`;

  const [errorAdd, SetErrorAdd] = useState(null);
  const [currentWork, SetCurrentWork] = useState(true);
  const [experience, SetExperience] = useState(null);
  const [modal, setModal] = useState(false);
  const [load, SetLoad] = useState(false);
  const loading = () => SetLoad(!load);
  const [statusAdd, SetStatusAdd] = useState(null);
  const [modalSuccess, setModalSucess] = useState(false);
  const toggleSuccess = () => setModalSucess(!modalSuccess);
  const toggle = () => {
    setModal(!modal);
  };
  async function AddExpereince(
    Id,
    Description,
    Title,
    Company,
    Start_date,
    End_date,
    Username
  ) {
    debugger
    fetch(MAINDOMAIN + `/api/devfinder/AddDeveloperExperience`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({
        _developer_id: Id,
        description: Description,
        title_name: Title,
        company: Company,
        start_date: Start_date,
        end_date: End_date,
        username: Username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        SetStatusAdd(data);
        if (!data.Status) {
          SetErrorAdd(data.Message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  const CurrentWork = () => {
    SetCurrentWork(!currentWork);
    if (currentWork) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + "-" + dd + "-" + yyyy;
      setDetails.end_date(today);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const [details, setDetails] = useState({
    description: "",
    title_name: "",
    company: "",
    start_date: "",
    end_date: "",
    username: "",
  });

  const User = localStorage.getItem("developerProfile");
  const UserObject = JSON.parse(User);
  const Exp = localStorage.getItem("developerExperience");
  const EXPObject = JSON.parse(Exp);
  console.log("Begin", EXPObject.length);

  useEffect(() => {
    if (UserObject) {
      FetchExpeience(UserObject.UserName);
    } else {
      return;
    }
    if (!EXPObject || EXPObject.length == 0) {
      SetExperience(null);
    } else {
      SetExperience(EXPObject);
      console.log("Lets See Part 1", EXPObject);
      console.log("lets See Part 2", experience);
    }
    if (statusAdd) {
      switch (statusAdd.Status) {
        case true:
          loading();
          toggle();
          toggleSuccess();
          break;
        case false:
          loading();
          break;
      }
    }
  }, [statusAdd]);

  const HandleSubmit = (e) => {
    debugger;
    e.preventDefault();
    loading();

    AddExpereince(
      UserObject.Id,
      details.description,
      details.title_name,
      details.company,
      details.start_date,
      details.end_date,
      UserObject.UserName
    );
  };

  return (
    <ProfileOuterContainer>
      <Success modalSuccess={modalSuccess} toggleSuccess={toggleSuccess} />
      {!experience ? (
        <Card title={[<h6>Add Experience</h6>]}>
          <div>
            <Button color="primary" onClick={toggle}>
              <i class="bi bi-plus-circle"></i>
            </Button>
          </div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={closeBtn}>
              Add Experience
            </ModalHeader>
            <ModalBody>
              <Form>
                {!load && (
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
                )}
                 {load && (
                        <FormGroup>
                          <Form>
                            {" "}
                            <Skeleton
                              variant="rectangular"
                              width={250}
                              height={18}
                            />{" "}
                            <Skeleton
                              variant="rectangular"
                              width={400}
                              height={22}
                            />{" "}
                            <Skeleton
                              variant="rectangular"
                              width={250}
                              height={18}
                            />{" "}
                            <Skeleton
                              variant="rectangular"
                              width={400}
                              height={22}
                            />
                          </Form>
                        </FormGroup>
                      )}
                {errorAdd && <Alert variant="danger">{errorAdd}</Alert>}
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" onClick={HandleSubmit}>
                Add
              </Button>{" "}
              <Button color="secondary">Cancel</Button>
            </ModalFooter>
          </Modal>
        </Card>
      ) : (
        <>
          <Row>
            <Col>
              <Card title={[<h6>Professional Experience</h6>]}>
                <br></br>
                <Row gutter={[24, 24]}>
                  {experience.map((item) => (
                    <Col span={24} key={experience.Id}>
                      <Card>
                        <div className="tileContainer">
                          <h6>{item.Title}</h6>
                          <p>
                            {" "}
                            <i class="bi bi-briefcase"></i>
                            {item.Company}
                          </p>

                          <p>
                            From <i class="bi bi-calendar3"></i>
                            {item.Start_Date}
                          </p>
                          <p>
                            To <i class="bi bi-calendar3"></i> {item.End_Date}
                          </p>
                          <br></br>
                          <i class="bi bi-newspaper"></i>
                          {item.Description}

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
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle} close={closeBtn}>
                    Add Experience
                  </ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <Label for="exampleEmail">Job Title</Label>
                        <Input
                          onChange={handleChange}
                          name="title_name"
                          required
                        />
                        <Label for="exampleEmail">Company/Organization</Label>
                        <Input
                          onChange={handleChange}
                          name="company"
                          required
                        />

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
                      {load && (
                        <FormGroup>
                          <Form>
                            {" "}
                            <Skeleton
                              variant="rectangular"
                              width={250}
                              height={18}
                            />{" "}
                            <Skeleton
                              variant="rectangular"
                              width={400}
                              height={22}
                            />{" "}
                            <Skeleton
                              variant="rectangular"
                              width={250}
                              height={18}
                            />{" "}
                            <Skeleton
                              variant="rectangular"
                              width={400}
                              height={22}
                            />
                          </Form>
                        </FormGroup>
                      )}
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      type="submit"
                      onClick={HandleSubmit}
                    >
                      Add
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
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
}

export default Experience;
const ProfileOuterContainer = styled.div`
  display: flex;
  background-color: white;
`;
