import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import styled from "styled-components";


const Blog = (props) => {
  return (
    <CardContainer>
        <FeedContainer>
    
    </FeedContainer>
    </CardContainer>

  );
};

export default Blog;

const CardContainer = styled.div`
flex:0.9;
flex-grow:3;
/* flex-grow:1; */
overflow: hidden;
/* margin-top: 65px; */
max-width: 765px;
margin-left: 350px;
margin-top: 0px;
`;
const FeedContainer = styled.div`
width: 100%;
margin-top: 15px;
border-radius: 15px;
background-color: white;
box-shadow: 0px 5px 7px -7px rgba(0,0,0,0.75);
`;

const FeedMessage = styled.div`
width: 100%;
overflow: hidden;

`;
