import React from "react";
import Card from "react-bootstrap/Card";

function HomeDisplay(props) {
  return (
    <>
      {props.data.map(post => (
        <Card>
          <Card.Header>
            <h1>{post.title}</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>{post.content}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default HomeDisplay;
