import React from 'react';
import {Modal, Nav, Form, Button} from "react-bootstrap";
import Dropdown from './FilterComponents/Dropdown';
import Tags from "./Tags"

export default class AddPostModal extends React.Component {
  state = {
    show: false,
    Post: {
      courseName : " ",
      title: "",
      content: "",
      tags: []
    },
    errors: {
      title: "",
      content: ""
    }
  };
  /**
  * Updates the value of show state to true when the user click on the add post on navbar
  * @name showModal
  * @memberof module:Header
  * @function
  * @param event {Object} The event object created when the user click on the add post on navbar
  * @returns none
  */
  showModal = e => {this.setState({show: true});};
  /**
  * Updates the value of show state to false when the user click on the add post on navbar
  * @name closeModal
  * @memberof module:Header
  * @function
  * @param event {Object} The event object created when the user click on the add post on navbar
  * @returns none
  */
  closeModal = e => {this.setState({show: false});};
  /**
  * Updates the value of Post title to the input value when user input to the textbox
  * @name handleTitleChange
  * @memberof module:Header
  * @function
  * @param event {Object} The event object created when user input to the textbox
  * @returns none
  */
  // handleTitleChange = async e => { await this.setState({Post:{ ...this.state.Post,title: e.target.value}});}
  /**
  * Updates the value of Post content to the input value when user input to the textarea
  * @name handleContentChange
  * @memberof module:Header
  * @function
  * @param event {Object} The event object created when user input to the textarea
  * @returns none
  */
  // handleContentChange = async e => { await this.setState({Post:{...this.state.Post,content: e.target.value}});}

  handleChange= async (field,e) => {
    let data = this.state.Post;
    data[field] = e.target.value;
    await this.setState({Post:{...this.state.Post,data}});
  }
  handleTagsChange= async (newArray) => {
    await this.setState({
      Post: {...this.state.Post,tags: [...newArray]}
    });
  }
  /**
  * Close the modal and post the data
  * @name handleSubmit
  * @memberof module:Header
  * @function
  * @param event {Object} The event object hit on the submit button at the modal
  * @returns none
  */
  handleSubmit = e => {
    // e.preventDefault();
    if (this.handleValidation()){
      this.closeModal();
      this.postData();
      console.log("Form data", this.state.Post.courseName, this.state.Post.title,this.state.Post.content);
    } else {
      alert("Form has errors!! Fill the form properly");
    }
    
   
  }
  /**
  * Posts the data to the " /api/course/{{course_id}}/post"
  * @name postData
  * @memberof module:Header
  * @function
  * @returns none
  */
  async postData() {
    console.log("this.state.Post",this.state.Post);
    const postURL = `/api/course/${this.state.Post.courseName.toLowerCase()}/post`;
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

  setCourse = async (courseName) => {
    await this.setState({Post:{...this.state.Post,courseName: courseName}});
  }

  handleValidation(){
    let inputsField = this.state.Post;
    let errors = {};
    let formIsValid = true;

    //Title
    if(!inputsField["title"]){
      formIsValid = false;
      errors["title"] = "Cannot be empty";
    }
    //Content
    if(!inputsField["content"]){
      formIsValid = false;
      errors["content"] = "Cannot be empty";
    }

    this.setState({errors: errors});
    return formIsValid;

  }
  render() {
    // console.log("Post", this.state.Post);
      return (
        <>
        <Nav.Link id="nav-modal" onClick={this.showModal}>Create Post</Nav.Link>
        <Modal show={this.state.show} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form  onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Course: </Form.Label>
                <Dropdown setCourse={this.setCourse} show={false} />
              </Form.Group>
              <Form.Group >
                <Form.Label>Title:</Form.Label>
                <Form.Control id="form-title" onChange={this.handleChange.bind(this,"title")} placeholder="Enter Title" />
                <span style={{color: "red"}}>{this.state.errors["title"]}</span>
              </Form.Group>
              <Form.Group c>
                <Form.Label>Post: </Form.Label>
                <Form.Control id="form-post" onChange={this.handleChange.bind(this,"content")} required as="textarea" rows="3" name="content" />
                <span style={{color: "red"}}>{this.state.errors["content"]}</span>
              </Form.Group>
            </Form>
            <Form.Group>
            <Form.Label>Tags: </Form.Label>
              <Tags id="form-tags" tagsChange={this.handleTagsChange} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
        <Button type="submit" variant="primary" onClick={this.handleSubmit}>
            Submit Post
        </Button>
        </Modal.Footer>
    </Modal>
    </>
      );
  }
}