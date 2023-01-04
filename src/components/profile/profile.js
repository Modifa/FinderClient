import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../service/firebase";
import { SignIn, UpdateImageAPI } from "../../utils/utils";
import uuid from "react-uuid";
import "./profile.css";
import Avatar from "@mui/material/Avatar";

import {
  Button,
  Card,
  CardText,
  CardTitle,
  CardImg,
  CardBody,
  CardSubtitle,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [closeAll, setCloseAll] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
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
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    title: "",
  });

  const ImageRefs = ref(storage, `images/${UserObject.UserName}/`);
  const uploadImage = () => {
    debugger;
    setIsLoadingImage(true);
    if (!image) return;
    var imageRef = ref(
      storage,
      `images/${UserObject.UserName}/${image.name + uuid()}`
    );
    uploadBytes(imageRef, image)
      .then(() => {
        alert("Image Ref", imageRef);
        listAll(ImageRefs).then((response) => {
          console.log(
            "Image Lists",
            getDownloadURL(response.items[response.items.length - 1]).then(
              (url) => {
                setImageUrl(url);
                UpdateImageAPI(UserObject.Id, url, UserObject.EmailAddress);
                SignIn(UserObject.UserName, UserObject.Password);
                setIsLoadingImage(false);
              }
            )
          );
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const Update = (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(UserObject.Id.toString());
    const response = fetch(
      "https://6b42-102-32-31-206.eu.ngrok.io/api/devfinder/UpdateDeveloperProfile",
      {
        method: "POST",
        body: JSON.stringify({
          developer_id: UserObject.Id,
          first_name: details.email,
          last_name: details.password,
          email_address: details.email,
          mobile_number: details.mobile,
          title: details.title,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(true);
        SignIn(UserObject.UserName, UserObject.Password);
        console.log("Data From Endpoint");
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error);
      });
  };
  return (
    <ProfileOuterContainer>
      <ProfileConatiner>
        <Card>
          <div class="center">
            <Avatar
              alt="Remy Sharp"
              src={UserObject.Image}
              sx={{ width: 180, height: 180 }}
            />{" "}
          </div>

          <a>
            {" "}
            <i class="fa fa-plus-square" aria-hidden="true"></i>...
          </a>
          <input type="hidden" />

          <CardBody>
            <Form>
              <FormGroup>
                <CardTitle tag="h5">
                  {UserObject.FirstName + " " + UserObject.LastName}
                </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {UserObject.Title}
                </CardSubtitle>
                <CardText>
                  <a href={"mailto:" + UserObject.EmailAddress}>
                    <i class="bi bi-envelope"></i> {UserObject.EmailAddress}
                  </a>
                </CardText>
                <CardText>
                  <a href={`tel:${UserObject.Mobile_number}`}>
                    <i class="bi bi-phone"></i> {UserObject.Mobile_number}
                  </a>
                </CardText>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </ProfileConatiner>
      <ProfileDetailsContainer>
        <Card style={{ width: "48rem" }}>
          <CardBody>
            <CardTitle tag="h2">Personal Details</CardTitle>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">First Name</Label>
                <Input disabled placeholder={UserObject.FirstName} />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Last Name</Label>
                <Input disabled placeholder={UserObject.LastName} />
                <Label for="exampleEmail">Email</Label>
                <Input disabled placeholder={UserObject.EmailAddress} />
                <Label for="exampleEmail">Mobile Number</Label>
                <Input disabled placeholder={UserObject.Mobile_number} />
              </FormGroup>
            </Form>
            <FormGroup>
              <Button onClick={toggle}>
                <i class="bi bi-pencil-square"></i> Edit
              </Button>
            </FormGroup>
          </CardBody>
        </Card>
      </ProfileDetailsContainer>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Personal details</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Picture</Label>
              <input
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              {!isLoadingImage && <button onClick={uploadImage}>Upload</button>}
              {isLoadingImage && <button disabled>Upload</button>}

              <Label for="exampleEmail">Title</Label>
              <Input
                onChange={handleChange}
                placeholder={UserObject.Title}
                name="title"
                required
              />
              <Label for="exampleEmail">First Name</Label>
              <Input
                onChange={handleChange}
                placeholder={UserObject.FirstName}
                name="first_name"
                required
              />

              <Label for="examplePassword">Last Name</Label>
              <Input
                onChange={handleChange}
                placeholder={UserObject.LastName}
                name="last_name"
                required
              />
              <Label for="exampleEmail">Email</Label>
              <Input
                onChange={handleChange}
                placeholder={UserObject.EmailAddress}
                name="email"
                required
              />
              <Label for="exampleEmail">Mobile Number</Label>
              <Input
                onChange={handleChange}
                name="mobile"
                placeholder={UserObject.mobile_number}
                required
              />
            </FormGroup>
          </Form>
          <FormGroup></FormGroup>
          <br />

          <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggle : undefined}
          >
            <ModalHeader>Confirm Changes</ModalHeader>
            <ModalBody>Do You Confirm These Changes ?</ModalBody>
            <ModalFooter>
              {!isLoading && (
                <Button color="success" onClick={Update}>
                  Confirm
                </Button>
              )}
              {isLoading && (
                <Button color="success" disabled>
                  <i className="fas fa-spinner fa-spin"></i>...wait
                </Button>
              )}{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggleNested}>
            Update
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </ProfileOuterContainer>
  );
}

export default Profile;

const ProfileConatiner = styled.div`
  display: flex;
  background-color: white;
`;
const ProfileDetailsContainer = styled.div`
  position: relative;
  display: flex;
  height: auto;
  max-width: 120vh;
  background-color: white;
  box-shadow: 0px 5px 7px -7px rgba(0, 0, 0, 0.75);
  padding: 15px 20px;
  justify-content: center;
  border-left: 13px;
  border-top-color: #efefef;
  overflow: scroll;
`;

const ProfileOuterContainer = styled.div`
  display: flex;
  background-color: white;
`;

const imgStyle = {
  maxHeight: 128,
  maxWidth: 128,
};
