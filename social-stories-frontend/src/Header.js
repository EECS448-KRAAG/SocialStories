/**
 * Header module.
 * @module Header
 * @requires none
 */

import React from 'react';
import {Navbar, Nav, Modal, Form, DropdownButton, Dropdown} from "react-bootstrap";
import TextSearch from './textSearch';
import AddPostModal from './AddPostModal';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

//TODO: Make sure that content is required
export default class Header extends React.Component {

  state = {
    showAdd: false,
    showRemove: false,
    users: []
  };

  showAddInstrucModal = e => {this.setState({showAdd: true});};
  closeAddInstrucModal = e => {this.setState({showAdd: false});};
  showRemoveInstrucModal = e => {this.setState({showRemove: true});};
  closeRemoveInstrucModal = e => {this.setState({showRemove: false});};

  componentWillMount() {
    window.fetch('/api/course')
    .then(response=> response.json())
    .then(json=> this.setState({users: json}));
  }

  handleGoogleLogin = async (account) => {
    localStorage.setItem("user", JSON.stringify(account));
    this.forceUpdate();
    const raw_permissions = await window.fetch(`/api/user/${account.googleId}/permission?name=${account.profileObj.name}`);
    const data = await raw_permissions.json();
    localStorage.setItem('userPermissions', data.permission);
  }

  handleGoogleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userPermissions");
    this.forceUpdate();
  }

   /**
    * Provides UI for navbar and modal
    * @name render
    * @memberof module:Header
    * @function
    * @returns The UI to be displayed.
    */
  render() {

    const adminAddButton = <Nav.Link onClick={this.showAddInstrucModal}>Add Instructor</Nav.Link>;
    const adminRemoveButton = <Nav.Link onClick={this.showRemoveInstrucModal}>Remove Instructor</Nav.Link>;

    const loginButton =
      <GoogleLogin 
        clientId = "701234863585-26m47ep06fv24ebas5j934t0shn0a9ru.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.handleGoogleLogin}
        onFailure={console.error}
        cookiePolicy={'single_host_origin'}
        theme="dark"
      />;

      const logoutButton = <GoogleLogout 
        clientId="701234863585-26m47ep06fv24ebas5j934t0shn0a9ru.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={this.handleGoogleLogout}
        theme="dark"
      />;
    
    return (
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="md" sticky="top">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Navbar.Brand><img src="./logo.png" height="40px" /></Navbar.Brand>
          <TextSearch setSearch={this.props.setSearch} />
          <Nav className="mr-auto">
            {localStorage.getItem('userPermissions') == 2 && adminAddButton}
            <Modal show={this.state.showAdd} onHide={this.closeAddInstrucModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add Instructor to Class</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    Users:
                    <Dropdown></Dropdown>
                  </Form.Group>
                </Form>
              </Modal.Body>
            </Modal>
            {localStorage.getItem('userPermissions') == 2 && adminRemoveButton}
            <Modal show={this.state.showRemove} onHide={this.closeRemoveInstrucModal}>
              <Modal.Header closeButton>
                <Modal.Title>Remove Instructor from Class</Modal.Title>
              </Modal.Header>
              <Modal.Body>

              </Modal.Body>
            </Modal>
          <AddPostModal />
          </Nav>
            {localStorage.getItem("user") ? logoutButton : loginButton};
        </Navbar.Collapse>
      </Navbar>
    );
  }

}
