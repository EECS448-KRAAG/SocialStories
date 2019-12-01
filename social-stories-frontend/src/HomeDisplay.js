import React from "react";
import Card from "react-bootstrap/Card";
import {Button, Badge} from 'react-bootstrap';
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

  const deletePost = async (id) => {
    await window.fetch(`/api/course/${props.course}/post/${id}`, {method: "DELETE"});
    window.location.reload();
  }

  const flagPost = async(id) => {
    await window.fetch(`/api/course/${props.course}/post/${id}/flag`, {
      method: "PUT",
      body: JSON.stringify({
        flagged: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  var showFlagged = false;
  const viewFlaggedPosts = () => {
    showFlagged = !showFlagged;
    console.log(showFlagged);
  }

  function FlaggedPosts() {
    var data = props.data.filter(post => post.flagged == true);
    console.log("flagged", data);
    return (
      <>
      {data.map(post => (
        <Card key={post.id}>
          <Card.Header>
            <h1>{post.title}</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>{post.content}</Card.Text>
            <h4>{post.tags.map(x => <Badge variant="dark" style={{marginRight: "4px"}} key={x} >{x}</Badge>)}</h4>
            <Button variant="warning" onClick={() => flagPost(post.id)}>Flag</Button>
            {localStorage.getItem('userPermissions')>0 &&
            <Button variant="outline-danger"
            onClick={() => deletePost(post.id)}> Delete</Button> }
          </Card.Body>
        </Card>
      ))}
      </>
    );
  }

  function AllPosts() {
    console.log("all", props.data)
    return(
      <>
      {props.data.map(post => (
        <Card key={post.id}>
          <Card.Header>
            <h1>{post.title}</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>{post.content}</Card.Text>
            <h4>{post.tags.map(x => <Badge variant="dark" style={{marginRight: "4px"}} key={x} >{x}</Badge>)}</h4>
            <Button variant="warning" onClick={() => flagPost(post.id)}>Flag</Button>
            {localStorage.getItem('userPermissions')>0 &&
            <Button variant="outline-danger"
            onClick={() => deletePost(post.id)}> Delete</Button> }
          </Card.Body>
        </Card>
      ))}
      </>
    );
  }

  return (
    <>
    {localStorage.getItem('userPermissions')>0 &&
    <Button variant="warning" onClick={viewFlaggedPosts}> View Flagged Post</Button> }

      {showFlagged ? <FlaggedPosts /> : <AllPosts />}
    </>
  );
}

export default HomeDisplay;
