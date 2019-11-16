import React from "react";
import Card from "react-bootstrap/Card";
import {Button} from 'react-bootstrap';
import './HomeDisplay.css';

/**
* HomeDisplay Module
* @name HomeDisplay
* @memberof App Module
* @function HomeDisplay
* @param props: variables needed by this method
* @returns cards with post id as title and content
*/
function HomeDisplay(props) {

  const button = <Button variant="outline-danger">delete</Button>

  return (
    <>
      {props.data.map(post => (
        <Card key={post.id}>
          <Card.Header>
            <h1>{post.title}</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>{post.content}</Card.Text>
            {localStorage.getItem('userPermissions')>0 && button}
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default HomeDisplay;
