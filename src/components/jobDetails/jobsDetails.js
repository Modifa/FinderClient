import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectJobId } from "../../app/features/appSlice";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../service/firebase";
import { Button } from "reactstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./jobsDetails.css";
import ListedItems from "./subcomponent/listedItems";
import Select from "../../assets/extras/job.png";

function JobsDetails() {
  const [Jobs] = useCollection(db.collection("jobs"));
  const [id, setJobId] = useState(null);
  const [data, setData] = useState(null);
  var jobData = {};
  const ReadId = (id) => {
    jobData = db
      .collection("jobs")
      .doc(id)
      .get()
      .then((resp) => {
        setData(resp.data());
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const jobId = useSelector(selectJobId);

  useEffect(() => {
    setJobId(jobId);
    if (id) {
      ReadId(id);
    }
  }, [jobId, jobData]);

  return (
    <DetailsContainer>
      {!data ? (
        <img src={Select} ></img>

      ) : (
        <>
          <article>
            <HeaderContainer>
              <Button color="success">
                <i class="bi bi-bookmark-heart"></i>
              </Button>
              <a>
                <h6>{data.organization}</h6>
              </a>
              <p>{data.title || <Skeleton />}</p>
            </HeaderContainer>
            <br />
            <h5>{data.short_description || <Skeleton />}</h5>

            <br />
            <p>{data.description || <Skeleton />}</p>

            <br />
            <br />
            <h2>Required Education</h2>
            <p>{data.education || <Skeleton />}</p>
            <h2>Listed Requirements</h2>

            {data.requirements && <ListedItems Items={data.requirements} />}
            {!data.requirements && (
              <p>No Listed Requirements For This Opening</p>
            )}

            <h2>Listed Required skills</h2>

            {data.skills && <ListedItems Items={data.skills} />}
            {!data.skills && <p>No Listed Requirements For This Opening</p>}
            {/* <br/><br/> 
    <h2>Listed Requirements</h2>
    <Requirements requirements={data.requirements ||<Skeleton />}/> 
    <br/><br/>
    <h2>Listed Required skills</h2>
  <Requirements requirements={data.skills ||<Skeleton />}/>  */}
            <div className="Component">
              <Button color="primary">apply</Button>
            </div>
          </article>
        </>
      )}
    </DetailsContainer>
  );
}

export default JobsDetails;

const DetailsContainer = styled.section`
  display: flex;
  height: auto;
  max-width: 120vh;
  background-color: white;
  box-shadow: 0px 5px 7px -7px rgba(0, 0, 0, 0.75);
  padding: 15px 20px;
  justify-content: center;
  border-top: 10px solid;
  border-left: 13px;
  border-top-color: #efefef;
  overflow: scroll;
`;

const HeaderContainer = styled.header`
  justify-content: space-between;
  align-items: center;
  background-color: #efefef;
  padding: 15px;
`;

const FooterContainer = styled.footer`
  padding: 5px;
  margin: 10px;
  margin: 0 10px;

  > Button {
    display: inline-block;
    padding: 5px;
    color: red;
    > Button {
      color: red;
    }
  }
`;
