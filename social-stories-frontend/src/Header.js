import React from 'react';
import {render} from 'react-dom';
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
  showModal = e => {this.setState({show: true});};
  closeModal = e => {this.setState({show: false});};

  //ask grant why hv to add coursename for handleContentChange and vice versa
  handleDropDownChange = (evtKey,e) => { this.setState({Post:{coursename: Dropdownoptions[evtKey], content: this.state.Post.content}})};
  handleContentChange = e => { this.setState({Post:{content: e.target.value, coursename: this.state.Post.coursename}})};
  handleSubmit = e => {
    this.closeModal();
    this.postData();
    console.log("Form data", this.state.Post.coursename, this.state.Post.content);
  }
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
