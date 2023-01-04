import React, { useState, useEffect } from "react";
import FormControlUnstyled from "@mui/base/FormControlUnstyled";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from "reactstrap";
import { FetchResumeDesc, AddResumeDesc } from "../../../utils/utils";
import Success from "../../modals/success";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

//UpdateResumeDesc
function PersonalDetails() {
  var MAINDOMAIN = `https://2cd1-102-32-21-219.in.ngrok.io`;

  const [modalSuccess, setModalSucess] = useState(false);
  const toggleSuccess = () => setModalSucess(!modalSuccess);
  const [resume, SetResume] = useState(null);
  const [modal, setModal] = useState(false);
  const [error, SetError] = useState(null);
  const [status, SetStatus] = useState(null);
  const [loading, Setloading] = useState(null);
  const load = () => Setloading(!loading);
  const toggle = () => {
    setModal(!modal);
  };

  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );

  async function UpdateDesc(Id, Username, Message) {
    fetch(MAINDOMAIN + `/api/devfinder/UpdateResumeDesc`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: Username,
        _developer_id: Id,
        short_desc: Message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        SetStatus(data);
        if (!data.Status) {
          SetError(data.Message);
        }
      })
      .catch((err) => {
        load();
        SetError(err.message);
      });
  }

  const User = localStorage.getItem("developerProfile");
  const UserObject = JSON.parse(User);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const [details, setDetails] = useState({
    message: "",
  });

  const HandleSubmit = () => {
    AddResumeDesc(UserObject.Id, details.message);
  };

  const HandleUpdate = () => {
    load();
    UpdateDesc(UserObject.Id, UserObject.UserName, details.message);
  };

  const Res = localStorage.getItem("developerResumeDesc");

  useEffect(() => {
    if (UserObject) {
      FetchResumeDesc(UserObject.UserName);
    } else {
      return;
    }
    if (!Res || Res.length === 0) {
      return;
    } else {
      const EXPObject = JSON.parse(Res);
      SetResume(EXPObject);
    }
    if (status) {
      switch (status.Status) {
        case true:
          load();
          toggle();
          toggleSuccess();
          break;
        case false:
          load();
          break;
      }
    }
  }, [status]);
  return (
    <FormControlUnstyled>
      {!resume ? (
        <form role="form" class="php-email-form">
          <div class="row">
            <div class="col-md-12">
              <div class="title-box-2">
                <br></br>
                <h5 class="title-left">Please Tell Us About Yourself...</h5>
              </div>
              <div class="form-group">
                <textarea
                  onChange={handleChange}
                  class="form-control"
                  name="message"
                  rows="5"
                  placeholder="Write A Description About Yourself Professionally"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <br></br>
          <div>
            <Button onClick={HandleSubmit} color="primary">
              Add
            </Button>
          </div>
          <br></br>
        </form>
      ) : (
        <>
          <div class="title-box-2">
            <br></br>
            <h5 class="title-left">About Me</h5>
          </div>
          <div className="tileContainer">
            <p>{resume.Description}</p>
          </div>
          <br></br>
          <Success modalSuccess={modalSuccess} toggleSuccess={toggleSuccess} />
          <div className="col-action">
            <Button color="primary" onClick={toggle}>
              <i class="bi bi-pen"></i>
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle} close={closeBtn}>
                About Me
              </ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <textarea
                      onChange={handleChange}
                      class="form-control"
                      name="message"
                      rows="5"
                      placeholder="Write A Description About Yourself Professionally"
                      required
                    ></textarea>
                  </FormGroup>
                  {error && <Alert variant="danger">Mathata</Alert>}
                </Form>
              </ModalBody>
              <ModalFooter>
                {!loading && (
                  <Button color="primary" type="submit" onClick={HandleUpdate}>
                    Add
                  </Button>
                )}
                {loading && (
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      disabled
                    />
                    <span className="visually-hidden">Loading...</span>
                  </Button>
                )}

                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </>
      )}
    </FormControlUnstyled>
  );
}

export default PersonalDetails;
