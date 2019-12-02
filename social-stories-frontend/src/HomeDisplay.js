/**
 * Dropdown module
 * @module HomeDisplay
 * @requires none
 */

import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import {Button, Badge} from 'react-bootstrap';
import AutoLinkText from 'react-autolink-text2';
import './HomeDisplay.css';

/**
* HomeDisplay Module
* @name HomeDisplay
* @memberof module:HomeDisplay Module
* @function HomeDisplay
* @param props: variables needed by this method
* @returns cards with post id as title and content. Also buttons for flags and delete for admin users
*/
function HomeDisplay(props) {

    /**
   * requests backend to delete post then reloads the page
   * @name deletePost
   * @memberof module: HomeDisplay
   * @function deletePost
   * @param id: post specific id
   * @returns none
   */
  const deletePost = async (id) => {
    await window.fetch(`/api/course/${props.course}/post/${id}`, {method: "DELETE"});
    window.location.reload();
  }

  /**
 * marks the post as flagged
 * @name flagPost
 * @memberof module: HomeDisplay
 * @function flagPost
 * @param id: post specific id
 * @returns none
 */
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

  const [viewOnlyFlaggedPosts, setViewOnlyFlaggedPosts] = useState(true);
  const data = viewOnlyFlaggedPosts ? props.data : props.data.filter(x => x.flagged === true);

  /**
   *Render - provides UI for front page
    * @name render
    * @memberof module:HomeDisplay
    * @function render
    * @returns UI
  */
  return (
    <>
      {localStorage.getItem("userPermissions") > 0 && (
        <div className="container">
          <Button
            variant="warning"
            onClick={() => setViewOnlyFlaggedPosts(!viewOnlyFlaggedPosts)}>
            Toggle View Flagged Post
          </Button>
        </div>
      )}
      {data.map(post => (
        <Card key={post.id}>
          <Card.Header>
            <h1>{post.title}</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text><AutoLinkText text={post.content} /></Card.Text>
            <h4>
              {post.tags.map(x => (
                <Badge variant="dark" style={{ marginRight: "4px" }} key={x}>
                  {x}
                </Badge>
              ))}
            </h4>
            <Button variant="warning" onClick={() => flagPost(post.id)}>
              Flag
            </Button>
            {localStorage.getItem("userPermissions") > 0 && (
              <Button
                variant="outline-danger"
                onClick={() => deletePost(post.id)}>
                Delete
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default HomeDisplay;
