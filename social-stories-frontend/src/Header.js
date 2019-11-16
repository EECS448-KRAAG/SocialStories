/**
 * Header module.
 * @module Header
 * @requires none
 */
 
import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import TextSearch from './textSearch';
import Postmodal from "./Postmodal";
// import Dropdown from './FilterComponents/Dropdown';
 
//TODO: Make sure that content is required
export default class Header extends React.Component {
 
  state = {
    show: false,
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
  
  // onChange = (val) => {
  //   let showState = [...this.state.show];
  //   this.setState({show: showState})
  // }
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
          <Navbar.Brand>Classes++</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link onClick={this.showModal}>Create Post</Nav.Link>
            {this.state.show ? <Postmodal show={this.state.show} onChange={this.onChange} /> : null}
            <Nav.Link href="#view">View Posts</Nav.Link>
            </Nav>
            <TextSearch setSearch={this.props.setSearch} />
        </Navbar.Collapse>
      </Navbar>
    );
  }
 
}
