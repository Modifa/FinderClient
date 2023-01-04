import React from 'react';
import styled from "styled-components";


function ListedItems({Items}) {
    const List = (props) => {
      const lisItem = props?.items.map((part) => <li>{part}</li>);
      return <ul>{lisItem}</ul>;
    };

  return (
    <DetailsContainer>
    <List items={Items}/> 
    </DetailsContainer>
  )
}

export default ListedItems;


const DetailsContainer = styled.section`
/* display: flex;
height: auto;
max-width: 120vh;
background-color: white;
box-shadow: 0px 5px 7px -7px rgba(0,0,0,0.75);
padding: 15px 20px;
justify-content: center;
border-top: 10px solid;
border-left: 13px;
border-top-color: #efefef;
overflow: scroll ; */
`;