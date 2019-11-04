/**
 * Header module.
 * @module Header
 * @requires none
 */

import React from 'react';
import {Navbar, Nav, Modal, Button, Form,DropdownButton,Dropdown} from "react-bootstrap";
import TextSearch from './textSearch';

const Dropdownoptions = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
//TODO: Make sure that content is required
export default class Header extends React.Component {

  state = {
    show: false,
    Post: {
      coursename : Dropdownoptions[0],
      content: ""
    }
  };
  /**
  * Updates the value of show state to true when the user click on the add post on navbar
  * @name showModal
  * @memberof module:textSearch
  * @function
  * @param event {Object} The event object created when the user click on the add post on navbar
  * @returns none
  */
  showModal = e => {this.setState({show: true});};
  /**
  * Updates the value of show state to false when the user click on the add post on navbar
  * @name closeModal
  * @memberof module:textSearch
  * @function
  * @param event {Object} The event object created when the user click on the add post on navbar
  * @returns none
  */
  closeModal = e => {this.setState({show: false});};
  /**
  * Updates the value of Post coursename to the selected value when the user click on the drop down on the modal
  * @name handleDropDownChange
  * @memberof module:textSearch
  * @function
  * @param event {Object} The event object created when the user click on the drop down on the modal
  * @returns none
  */
  handleDropDownChange = (evtKey,e) => { this.setState({Post:{coursename: Dropdownoptions[evtKey], content: this.state.Post.content}})};
  /**
  * Updates the value of Post content to the input value when user input to the textarea
  * @name handleContentChange
  * @memberof module:textSearch
  * @function
  * @param event {Object} The event object created when user input to the textarea
  * @returns none
  */
  handleContentChange = e => { this.setState({Post:{content: e.target.value, coursename: this.state.Post.coursename}})};
  /**
  * Close the modal and post the data 
  * @name handleSubmit
  * @memberof module:textSearch
  * @function
  * @param event {Object} The event object hit on the submit button at the modal
  * @returns none
  */
  handleSubmit = e => {
    this.closeModal();
    this.postData();
    console.log("Form data", this.state.Post.coursename, this.state.Post.content);
  }
  /**
  * Posts the data to the " /api/course/{{course_id}}/post" 
  * @name postData
  * @memberof module:textSearch
  * @function
  * @returns none
  */
  async postData(){
    //create a new XMLHttpRequest
    const postURL = " /api/course/{{course_id}}/post";
    const data = this.state.Post;

    try {
      const response = await fetch(postURL, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      console.log('Success:', JSON.stringify(json));
    } catch (error) {
      console.error('Error:', error);
    }
  }

   /**
    * Provides UI for navbar and modal
    * @name render
    * @memberof module:Header
    * @function
    * @returns The UI to be displayed.
    */
  render() {
    return (
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="md" sticky="top">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Navbar.Brand>Social Stores</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link onClick={this.showModal}>Create Post</Nav.Link>
            <Modal show={this.state.show} onHide={this.closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form  onSubmit={this.handleSubmit}>
                      <Form.Group>
                        <Form.Label>Course: </Form.Label>
                        <DropdownButton onSelect={this.handleDropDownChange.bind(this) } id="dropdown-basic-button" title={this.state.Post.coursename}>
                          {Dropdownoptions.map((option, i) => {
                             return (<Dropdown.Item key={i} eventKey={i}>{option}</Dropdown.Item>);
                          })}
                        </DropdownButton>
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
            <Nav.Link href="#view">View Posts</Nav.Link>
            </Nav>
            <TextSearch setSearch={this.props.setSearch} />
        </Navbar.Collapse>
      </Navbar>
    );
  }

}
