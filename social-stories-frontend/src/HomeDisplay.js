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

  const onDelete = (id) =>
  {
    window.fetch(`/api/course/${props.course}/post/${id}`, {method: "DELETE"})
  }

  return (
    <>
      {props.data.map(post => (
        <Card key={post.id}>
          <Card.Header>
            <h1>{post.title}</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>{post.content}</Card.Text>
            {localStorage.getItem('userPermissions')>0 && <Button variant="outline-danger" onClick={onDelete(post.id)}>Delete</Button>}
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default HomeDisplay;
