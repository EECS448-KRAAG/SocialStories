/**
 * Postmodal module.
 * @module Postmodal
 * @requires none
 */

import React from 'react';
import { Modal, Button, Form} from "react-bootstrap";
import Dropdown from './FilterComponents/Dropdown';

//TODO: Make sure that content is required
export default class Postmodal extends React.Component {

  state = {
    Post: {
      courseName : " ",
      title: "",
      content: ""
    }
  };
 
  /**
  * Updates the value of Post title to the input value when user input to the textbox
  * @name handleTitleChange
  * @memberof module:Postmodal
  * @function
  * @param event {Object} The event object created when user input to the textbox
  * @returns none
  */
  handleTitleChange = e => { this.setState({Post:{title: e.target.value, courseName: this.state.Post.courseName,content: this.state.Post.content}})};
  /**
  /**
  * Updates the value of Post content to the input value when user input to the textarea
  * @name handleContentChange
  * @memberof module:Postmodal
  * @function
  * @param event {Object} The event object created when user input to the textarea
  * @returns none
  */
  handleContentChange = e => { this.setState({Post:{content: e.target.value, courseName: this.state.Post.courseName,title:this.state.Post.title}})};
  /**
  * Close the modal and post the data
  * @name handleSubmit
  * @memberof module:Postmodal
  * @function
  * @param event {Object} The event object hit on the submit button at the modal
  * @returns none
  */
  handleSubmit = e => {
    this.closeModal();
    this.postData();
    console.log("Form data", this.state.Post.courseName, this.state.Post.title,this.state.Post.content);
  }
  /**
  * Posts the data to the " /api/course/{{course_id}}/post"
  * @name postData
  * @memberof module:Postmodal
  * @function
  * @returns none
  */
  async postData(){
    const postURL = `/api/course/${this.state.Post.courseName.toLowerCase()}/post`;
    const data = this.state.Post;

    try {
      const response = await fetch(postURL, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        Postmodals: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      console.log('Success:', JSON.stringify(json));
    } catch (error) {
      console.error('Error:', error);
    }
  }
  closeModal = e => {this.setState({show: false});};
  setCourse = async (courseName) => {
    await this.setState({Post:{courseName: courseName}});
  }
   /**
    * Provides UI for navbar and modal
    * @name render
    * @memberof module:Postmodal
    * @function
    * @returns The UI to be displayed.
    */
  render() {
    return (
    <Modal show={this.props.show} onHide={ e => {this.setState({show: false});}}>
        <Modal.Postmodal closeButton>
            <Modal.Title>Add Post</Modal.Title>
        </Modal.Postmodal>
        <Modal.Body>
            <Form  onSubmit={this.handleSubmit}>
                <Form.Group>
                <Form.Label>Course: </Form.Label>
                <Dropdown setCourse={this.setCourse} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title:</Form.Label>
                <Form.Control onChange={this.handleTitleChange} placeholder="Enter Title" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Post: </Form.Label>
                <Form.Control onChange={this.handleContentChange} required as="textarea" rows="3" name="content" />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button type="submit" variant="primary" onClick={this.handleSubmit}>
            Submit Post
        </Button>
        </Modal.Footer>
    </Modal>
    );
  }

}
