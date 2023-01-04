import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";
import Skeleton from "react-loading-skeleton";
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
import { FetchLinks } from "../../../utils/utils";
import "./style.css";
import Success from "../../modals/success";
import Alert from "react-bootstrap/Alert";

// import { setCurrentStatus } from "../../app/features/appSlice";

const AddLinks = () => {
  var MAINDOMAIN = `https://2cd1-102-32-21-219.in.ngrok.io`;
  const [idDel, SetIdDel] = useState(null);
  const [Id, SetId] = useState(null);
  const [links, SetLinks] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleAdd = () => setModalAdd(!modalAdd);
  const [loading, SetLoading] = useState(false);
  const [loadingUpdate, SetLoadingUpdate] = useState(false);
  const [update, SetUpdate] = useState(null);
  const loadDelete = () => SetLoadingDelete(!loadingDelete);
  const [modalSuccess, setModalSucess] = useState(false);
  const toggleSuccess = () => setModalSucess(!modalSuccess);
  const [modalConfirm, setModalConfirm] = useState(false);

  const [currentStatus, SetCurrentStatus] = useState(null);
  const [error, SetError] = useState(null);
  const [errorUpdate, SetErrorUpdate] = useState(null);
  const [deleteRes, SetDeleteRes] = useState(null);
  const [errorDelete, SetErrorDelete] = useState(null);
  const [loadingDelete, SetLoadingDelete] = useState(false);

  async function AddLink(Id, Username, Link, LinkType) {
    fetch(MAINDOMAIN + `/api/devfinder/AddResumeLink`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({
        _developer_id: Id,
        _link_type: LinkType,
        Link_: Link,
        username: Username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        SetCurrentStatus(data.Status);
        if (!data.Status) {
          SetError(data.Message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  //currentStatus
  const toggleconfirm = (e, Id) => {
    e.preventDefault();
    SetIdDel(Id);
    setModalConfirm(!modalConfirm);
  };

  async function DeleteLink(Id, LinkId, Username) {
    debugger;
    fetch(MAINDOMAIN + `/api/devfinder/DeleteDeveloperLink`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({
        _developer_id: Id,
        link_id: LinkId,
        username: Username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        SetDeleteRes(data);
        console.log(data);
        if (!data.Status) {
          SetErrorDelete(data.Message);
        }
      })
      .catch((err) => {
        SetErrorDelete(err.Message);
        loadDelete();
      });
  }
  //
  async function UpdateLink(Id, LinkId, Link, Username) {
    fetch(MAINDOMAIN + `/api/devfinder/UpdateDeveloperLink`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({
        _developer_id: Id,
        link_id: LinkId,
        Link_: Link,
        username: Username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        SetUpdate(data);
        console.log("We Are Here Now", data);
        if (!data.Status) {
          SetErrorUpdate(data.Message);
        }
        //        toggle2();
      })
      .catch((err) => {
        SetErrorUpdate(err.message);
      });
  }
  //
  const loadUpdate = () => {
    console.log("load changed", loadingUpdate);
    switch (loadingUpdate) {
      case true:
        SetLoadingUpdate(false);
        break;
      case false:
        SetLoadingUpdate(true);
        break;
    }
  };

  //modalConfirm
  const [selectedOption, setSelectedOption] = useState("0");

  const toggle2 = (e, ID) => {
    e.preventDefault();
    SetId(ID);
    setModal(!modal);
    
  };
  const closeBtn = (
    <button className="close" onClick={toggle} type="button">
      &times;
    </button>
  );
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const [details, setDetails] = useState({
    link: "",
  });

  const User = localStorage.getItem("developerProfile");
  const UserObject = JSON.parse(User);
  const Link = localStorage.getItem("developerLinks");
  const EXPObject = JSON.parse(Link);

  useEffect(() => {
    if (UserObject) {
      FetchLinks(UserObject.UserName);
    } else {
      return;
    }
    //
    if (!EXPObject || EXPObject.length == 0) {
      SetLinks(null);
    } else {
      SetLinks(EXPObject);
    }

    // if (update) {
    //   console.log("something");
    // }

    if (currentStatus) {
      switch (currentStatus) {
        case true:
          load();
          toggle();
          toggleSuccess();
          SetErrorUpdate(null);
          break;
        case false:
          load();
          break;
      }
    }

    if (update) {
      console.log("coming to you live from inside the hook part 3", update);
      switch (update.Status) {
        case true:
          console.log("We Are True Now");
          loadUpdate();
          setModal(!modal);
          toggleSuccess();
          break;
        case false:
          console.log("We Are False Now");
          loadUpdate();

          break;
        default:
          loadUpdate();
          break;
      }
    }
    //
    if (deleteRes) {
      switch (deleteRes.Status) {
        case true:
          loadDelete();
          setModalConfirm(!modalConfirm);
          toggleSuccess();
          break;
        case false:
          loadDelete();
          break;
      }
    }
  }, [update, currentStatus, deleteRes]);

  // const check = (updateStatus) => {
  //   debugger;
  // if (update) {
  //   debugger;
  //   switch (update) {
  //     case true:
  //       loadUpdate();
  //       toggle2();
  //       toggleSuccess();
  //       break;
  //     case false:
  //       loadUpdate();

  //       break;
  //   }
  // }
  // };

  //
  const HandleSubmit = (e) => {
    load();
    e.preventDefault();
    AddLink(UserObject.Id, UserObject.UserName, details.link, selectedOption);
  };

  //UpdateLink
  const HandleUpdate = (e) => {
    loadUpdate();
    e.preventDefault();
    UpdateLink(UserObject.Id, Id, details.link, UserObject.UserName);
  };
  //DeleteLink
  const Handledelete = (e) => {
    loadDelete();
    e.preventDefault();
    DeleteLink(UserObject.Id, idDel, UserObject.UserName);
  };

  return (
    <ProfileOuterContainer>
      {!links ? (
        <ProfileOuterContainer>
          <Card title={[<h6>Add links</h6>]}>
            <div>
              <Button color="primary" onClick={toggle}>
                <i class="bi bi-plus-circle"></i>
              </Button>
            </div>
            <Success
              modalSuccess={modalSuccess}
              toggleSuccess={toggleSuccess}
            />
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle} close={closeBtn}>
                Add Link
              </ModalHeader>
              <ModalBody id="ModalForm">
                {!loading && (
                  <Form>
                    <FormGroup>
                      <Label for="exampleEmail">Link Type</Label>
                      <Input
                        type="select"
                        value={selectedOption}
                        onChange={(e) => {
                          setSelectedOption(e.target.value);
                        }}
                      >
                        <option value={1}>
                          {" "}
                          <i class="bi bi-linkedin"></i> linkedin
                        </option>
                        <option value={2}>
                          {" "}
                          <i class="bi bi-github"></i> Github
                        </option>
                        <option value={3}>
                          {" "}
                          <i class="bi bi-twitter"></i> twitter
                        </option>

                        <option value={4}>
                          {" "}
                          <i class="bi bi-folder-symlink"></i> Other
                        </option>
                      </Input>
                      <Label for="exampleEmail">Link</Label>
                      <Input onChange={handleChange} name="link" required />
                    </FormGroup>
                    {error && <Alert variant="danger">Mathata</Alert>}
                  </Form>
                )}
                {loading && (
                  <Form>
                    {" "}
                    <Skeleton
                      variant="rectangular"
                      width={250}
                      height={18}
                    />{" "}
                    <Skeleton variant="rectangular" width={400} height={22} />{" "}
                    <Skeleton variant="rectangular" width={250} height={18} />{" "}
                    <Skeleton variant="rectangular" width={400} height={22} />
                  </Form>
                )}
              </ModalBody>
              <ModalFooter id="ModalFooter">
                {!loading && (
                  <Button color="primary" type="submit" onClick={HandleSubmit}>
                    Add{" "}
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
          </Card>
        </ProfileOuterContainer>
      ) : (
        <>
          <Row>
            <Col>
              <Card title={[<h6>Links</h6>]}>
                <Success
                  modalSuccess={modalSuccess}
                  toggleSuccess={toggleSuccess}
                />
                <br></br>
                <Row gutter={[18, 18]}>
                  {links.map((item) => (
                    <Col span={84} key={links.Id}>
                      <Alert severity="info">
                        <Button
                          color="success"
                          onClick={(e) => {
                            toggle2(e, item.Id);
                          }}
                        >
                          <i class="bi bi-pen"></i>
                        </Button>
                        {"      "}
                        <Button
                          color="danger"
                          onClick={(e) => {
                            toggleconfirm(e, item.Id);
                          }}
                        >
                          <i class="bi bi-trash"></i>
                        </Button>{" "}
                        <a href={item.Link}>{item.Description}</a>
                      </Alert>
                    </Col>
                  ))}
                </Row>

                <br></br>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle} close={closeBtn}>
                    Update Link
                  </ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <Label for="exampleEmail">Link</Label>
                        <Input onChange={handleChange} name="link" required />
                      </FormGroup>
                      {errorUpdate && (
                        <Alert variant="danger">{errorUpdate}</Alert>
                      )}
                    </Form>
                    {/* {loadingUpdate && (
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
                    )} */}
                  </ModalBody>
                  <ModalFooter>
                    {!loadingUpdate ? (
                      <div>
                        <Button color="primary" onClick={HandleUpdate}>
                          Update{" "}
                        </Button>
                        <Button color="secondary" onClick={toggle}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
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
                      </>
                    )}
                  </ModalFooter>
                </Modal>
                <Modal isOpen={modalConfirm} toggle={toggleconfirm}>
                  <ModalHeader toggle={toggleconfirm}></ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <br></br>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <h2>Are You Sure?</h2>
                        </div>{" "}
                        <br></br>
                      </FormGroup>
                      {errorDelete && (
                        <Alert variant="danger">{errorDelete}</Alert>
                      )}
                    </Form>

                    <ModalFooter>
                      {/* {!loadingDelete ? ():(<></>)} */}
                      {loadingDelete && (
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
                      {!loadingDelete && (
                        <div>
                          <Button color="success" onClick={Handledelete}>
                            Delete
                          </Button>{" "}
                          <Button color="danger" onClick={toggleconfirm}>
                            Cancel
                          </Button>{" "}
                        </div>
                      )}
                    </ModalFooter>
                  </ModalBody>
                </Modal>
                <Modal isOpen={modalAdd} toggle={toggleAdd}>
              <ModalHeader toggle={toggleAdd} close={closeBtn}>
                Add Link
              </ModalHeader>
              <ModalBody id="ModalForm">
                {!loading && (
                  <Form>
                    <FormGroup>
                      <Label for="exampleEmail">Link Type</Label>
                      <Input
                        type="select"
                        value={selectedOption}
                        onChange={(e) => {
                          setSelectedOption(e.target.value);
                        }}
                      >
                        <option value={1}>
                          {" "}
                           linkedin<i class="bi bi-linkedin"></i>
                        </option>
                        <option value={2}>
                          {" "}
                          <i class="bi bi-github"></i> Github
                        </option>
                        <option value={3}>
                          {" "}
                          <i class="bi bi-twitter"></i> twitter
                        </option>

                        <option value={4}>
                          {" "}
                          <i class="bi bi-folder-symlink"></i> Other
                        </option>
                      </Input>
                      <Label for="exampleEmail">Link</Label>
                      <Input onChange={handleChange} name="link" required />
                    </FormGroup>
                    {error && <Alert variant="danger">Mathata</Alert>}
                  </Form>
                )}
                {loading && (
                  <Form>
                    {" "}
                    <Skeleton
                      variant="rectangular"
                      width={250}
                      height={18}
                    />{" "}
                    <Skeleton variant="rectangular" width={400} height={22} />{" "}
                    <Skeleton variant="rectangular" width={250} height={18} />{" "}
                    <Skeleton variant="rectangular" width={400} height={22} />
                  </Form>
                )}
              </ModalBody>
              <ModalFooter id="ModalFooter">
                {!loading && (
                  <Button color="primary" type="submit" onClick={HandleSubmit}>
                    Add{" "}
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

                <Button color="secondary" onClick={toggleAdd}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
                <div>
                  <Button color="primary" onClick={toggleAdd}>
                    <i class="bi bi-plus-circle"></i>
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </ProfileOuterContainer>
  );
};

export default AddLinks;
const ProfileOuterContainer = styled.div`
  display: flex;
  background-color: white;
`;
