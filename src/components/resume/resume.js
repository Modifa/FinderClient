import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import 
{Button,
Card,
CardBody
} from "reactstrap";
import "./resume.css";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddLinks from  './resumeComponents/addLinks';
import Education from './resumeComponents/education';
import Experience from './resumeComponents/experience';
import PersonalDetails from  './resumeComponents/personalDetails';
import Projects from './resumeComponents/projects'
//
function Resume() {
const [file, setFile] = useState(null)
const steps = ['Personal Details', 'Experiences', 'Education', 'Additiona Links'];
const User = localStorage.getItem("developerProfile");
const UserObject  = JSON.parse(User)
const [activeStep, setActiveStep] = React.useState(0);
const handleNext = () => {
    setActiveStep(activeStep + 1);
    if(activeStep.length == 0){setActiveStep(0)}
};
const handleBack = () => {
    setActiveStep(activeStep - 1);
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalDetails />;
    case 1:
      return <Experience />;
    case 2:
      return <Education />;
      case 3: 
      return <AddLinks/>;

    default:
      return <PersonalDetails />;
  }
}

useEffect(()=>{
      // setFile("https://firebasestorage.googleapis.com/v0/b/devfinder-2e6dd.appspot.com/o/documents%2FTebogo_Mampa_Current_Resume.pdf?alt=media&token=e7ecf060-151a-4fa6-9a83-54586b9b3fbf")
      // setFile(null)
  })
  function handleChange(event) {
    setFile(event.target.files[0])
  }
  return (
    <ProfileOuterContainer>
    <SideContainer>
    {!file ?(
      <Card>
    <form>
    <h1>React File Upload</h1>
    <input type="file" onChange={handleChange} accept=".doc, .docx,.ppt, .pptx,.txt,.pdf"/>
    <button type="submit">Upload</button>
    </form>
    </Card>
    ):(
      <>
      <CardBody >
            <iframe class="responsive-iframe" src={file}></iframe>
      </CardBody>
    </>
    )}

    </SideContainer>
    <DetailsContainer>
       <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            {UserObject.FirstName + " " + UserObject.LastName}
          </Typography>
            <Typography component="h6" variant="h6" align="center">
            {UserObject.Title}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Done' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
        </Paper>
      </Container>
    </DetailsContainer>
    </ProfileOuterContainer>

  )
}

export default Resume;

const ProfileOuterContainer = styled.div`
display: flex;
background-color: white;`

const SideContainer  = styled.div`
display: flex;
justify-content: center;
overflow: scroll ;
max-width: 90vh;
padding: 15px 20px;
border-top: 10px solid;
border-left: 10px solid;
border-top-color: #efefef;
border-left-color: #efefef;
`;

const DetailsContainer = styled.section`
position: relative;
display: flex;
height: auto;
max-width: 150vh;
background-color: white;
box-shadow: 0px 5px 7px -7px rgba(0,0,0,0.75);
padding: 15px 20px;
justify-content: center;
border-top: 10px solid;
border-left: 33px;
border-top-color: #efefef;
overflow: scroll ;
`;


