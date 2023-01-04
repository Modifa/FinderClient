import React, { useMemo, useState } from "react";
import styled from "styled-components";
import "./card.css";
import {
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  Button,
} from "reactstrap";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../service/firebase";
import user1 from "../../assets/images/users/user1.jpg";
import JobsDetails from "../jobDetails/jobsDetails";
import { useDispatch } from "react-redux";
import { selectJob } from "../../app/features/appSlice";

function Chat() {
  const dispatch = useDispatch();
  const [id, setJobId] = useState(null);
  const SetIt = (ID, e) => {
    e.preventDefault();

    setJobId(ID);
    console.log(id);

    // dispatch(selectJob({
    //   jobId :id
    // }))
  };
  useMemo(() => {
    if (!id) {
      return;
    }

    dispatch(
      selectJob({
        jobId: id,
      })
    );
  }, [id]);
  const [Jobs] = useCollection(db.collection("jobs"));

  return (
    <FeedContainer>
      <ChatContainer>
        <Col>
          {Jobs?.docs.map((doc) => (
            <Col lg="6" key={doc.id}>
              <Card body onClick={(e) => SetIt(doc.id, e)}>
                <CardHeader>
                  <img
                    src={user1}
                    alt="profile"
                    className="rounded-circle"
                    width="30"
                  ></img>
                  <CardSubtitle tag="p">{doc.data().organization}</CardSubtitle>
                </CardHeader>

                <CardTitle tag="h4">{doc.data().title}</CardTitle>
                <CardSubtitle tag="p">{doc.data().location_type}</CardSubtitle>
                <CardBody>
                  <CardText>{doc.data().short_description}</CardText>
                  <div>
                    <Button color="primary" onClick={(e) => SetIt(doc.id, e)}>
                      apply
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Col>
      </ChatContainer>
      <JobsDetails />
    </FeedContainer>
  );
}

export default Chat;

const DetailsContainer = styled.section`
  background-color: white;
  box-shadow: 0px 5px 7px -7px rgba(0, 0, 0, 0.75);
  padding: 15px 20px;
  justify-content: center;
  border-top: 10px solid;
  border-bottom: 10px solid;
  border-bottom-color: #efefef;
  border-top-color: #efefef;
`;

const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow: scroll;
`;

const FeedContainer = styled.div`
  display: flex;
  background-color: white;
`;

const FeedMessage = styled.div`
  width: 100%;
  overflow: hidden;
`;

const FeedHeader = styled.div`
  margin-bottom: 70px;
  margin-top: 15px;
  justify-content: center;
  display: flex;
  height: 30px;
`;
const FeedPost = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 15px 20px;
`;
