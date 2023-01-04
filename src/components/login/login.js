import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function Login() {
  var UserPr = {};
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const SignIn = (e) => {
    e.preventDefault();
    fetch(
      "https://0dc3-102-32-6-107.in.ngrok.io/api/devfinder/GetDeveloperProfile",
      {
        method: "POST",
        body: JSON.stringify({
          username: details.email,
          password: details.password,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        UserPr = data.Data;
        if (!data.Status) {
          alert(data.Message);
        } else {
          localStorage.setItem("developerProfile", JSON.stringify(data.Data));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <CardContainer>
      <Card
        style={{
          width: "35rem",
        }}
      >
        <CardBody>
          <Form onSubmit={SignIn}>
            <FormGroup>
              <Label for="exampleEmail">Username</Label>
              <Input
                required
                id="exampleEmail"
                name="email"
                placeholder="useraname"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="password"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <p></p>
            <Button type="submit">Submit</Button>
            <Label>
              {" "}
              Not Yet Registered? <a href="/Register"> Sign Up</a>{" "}
            </Label>
          </Form>
        </CardBody>
      </Card>
    </CardContainer>
  );
}

export default Login;
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 140px;
  > a {
    color: blue;
  }
`;
