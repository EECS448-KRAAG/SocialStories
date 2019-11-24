/**
 * Header module.
 * @module Header
 * @requires none
 */

import React from 'react';
import {Navbar, Nav, Modal, Form, DropdownButton, Dropdown, Button} from "react-bootstrap";
import Select from 'react-select';
import TextSearch from './textSearch';
import AddPostModal from './AddPostModal';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

//TODO: Make sure that content is required
export default class Header extends React.Component {

  state = {
    showAddI: false,
    showRemoveI: false,
    showAddA: false,
    showRemoveA: false,
    selectedUser: {},
    users: []
  };

  showAddInstrucModal = e => {this.setState({showAddI: true});};
  closeAddInstrucModal = e => {this.setState({showAddI: false});};
  showRemoveInstrucModal = e => {this.setState({showRemoveI: true});};
  closeRemoveInstrucModal = e => {this.setState({showRemoveI: false});};
  showAddAdminModal = e => {this.setState({showAddA: true});};
  closeAddAdminModal = e => {this.setState({showAddA: false});};
  showRemoveAdminModal = e => {this.setState({showRemoveA: true});};
  closeRemoveAdminModal = e => {this.setState({showRemoveA: false});};

  onChange = e => {
    this.setState({selectedUser: e});
  }

  componentWillMount() {
    window.fetch('/api/user')
    .then(response=> response.json())
    .then(json=> this.setState({users: json}));
  }

  handleGoogleLogin = async (account) => {
    localStorage.setItem("user", JSON.stringify(account));
    this.forceUpdate();
    const raw_permissions = await window.fetch(`/api/user/${account.googleId}/permission?name=${account.profileObj.name}`);
    const data = await raw_permissions.json();
    localStorage.setItem('userPermissions', data.permission);
    window.location.reload();
  }

  handleGoogleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userPermissions");
    this.forceUpdate();
    window.location.reload();
  }

  AddInstrucData = async () => {
        const data = { level: 1 };
        console.log("Selected User inside fetch call function");
        console.log(this.state.selectedUser);
        const response = await fetch(`/api/user/${this.state.selectedUser.value.user_id}/permission`, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
    });
    console.error(await response.json());
  }

  handleInstrucAddSubmit = e => {
    this.closeAddInstrucModal();
    this.AddInstrucData();
  }

  RemoveInstrucData = async () => {
      const data = { level: 0 };
      console.log("Selected User inside fetch call function");
      console.log(this.state.selectedUser);
      const response = await fetch(`/api/user/${this.state.selectedUser.value.user_id}/permission`, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      } 
    });
    console.error(await response.json());
  }

  handleInstrucRemoveSubmit = e => {
    this.closeRemoveInstrucModal();
    this.RemoveInstrucData();
  }

  AddAdminData = async () => {
      const data = { level: 2 };
      const response = await fetch(`/api/user/${this.state.selectedUser.value.user_id}/permission`, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      } 
    });
    console.error(await response.json());
  }

  handleAdminAddSubmit = e => {
    this.closeAddAdminModal();
    this.AddAdminData();
  }

  RemoveAdminData = async () => {
      const data = { level: 0 };
      const response = await fetch(`/api/user/${this.state.selectedUser.value.user_id}/permission`, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      } 
    });
    console.error(await response.json());
  }

  handleAdminRemoveSubmit = e => {
    this.closeRemoveAdminModal();
    this.RemoveAdminData();
  }

   /**
    * Provides UI for navbar and modal
    * @name render
    * @memberof module:Header
    * @function
    * @returns The UI to be displayed.
    */
  render() {

    const InstrucAddButton = <Nav.Link onClick={this.showAddInstrucModal}>Add Instructor</Nav.Link>;
    const InstrucRemoveButton = <Nav.Link onClick={this.showRemoveInstrucModal}>Remove Instructor</Nav.Link>;
    const AdminAddButton = <Nav.Link onClick={this.showAddAdminModal}>Add Admin</Nav.Link>;
    const AdminRemoveButton = <Nav.Link onClick={this.showRemoveAdminModal}>Remove Admin</Nav.Link>;

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
          <Navbar.Brand href="/"><img src="./logo.png" height="40px" /></Navbar.Brand>
          <TextSearch setSearch={this.props.setSearch} />
          <Nav className="mr-auto">
          <AddPostModal />
          {localStorage.getItem('userPermissions') == 2 && InstrucAddButton}
            <Modal show={this.state.showAddI} onHide={this.closeAddInstrucModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add Instructor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form  onSubmit={this.handleInstrucAddSubmit}>
                  <Form.Group>
                    <Form.Label>Users: </Form.Label>
                      <Select value={this.state.selectedUser} options={this.state.users.filter(x => { if (x.permission == 0) { return{x} }}).map(x => {return {'value': x, 'label': x.name}})} onChange={this.onChange}/>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="primary" onClick={this.handleInstrucAddSubmit}>
                Confirm Change
                </Button>
            </Modal.Footer>
            </Modal>
            {localStorage.getItem('userPermissions') == 2 && InstrucRemoveButton}
            <Modal show={this.state.showRemoveI} onHide={this.closeRemoveInstrucModal}>
              <Modal.Header closeButton>
                <Modal.Title>Remove Instructor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form  onSubmit={this.handleInstrucRemoveSubmit}>
                  <Form.Group>
                    <Form.Label>Users: </Form.Label>
                      <Select value={this.state.selectedUser} options={this.state.users.filter(x => { if (x.permission == 1) { return{x} } }).map(x => { return {'value': x, 'label': x.name}})} onChange={this.onChange}/>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="primary" onClick={this.handleInstrucRemoveSubmit}>
                Confirm Change
                </Button>
              </Modal.Footer>
            </Modal>
            {localStorage.getItem('userPermissions') == 2 && AdminAddButton}
            <Modal show={this.state.showAddA} onHide={this.closeAddAdminModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add Admin</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form  onSubmit={this.handleAdminAddSubmit}>
                  <Form.Group>
                    <Form.Label>Users: </Form.Label>
                      <Select value={this.state.selectedUser} options={this.state.users.filter(x => { if (x.permission < 2) { return{x} } }).map(x => { return {'value': x, 'label': x.name}})} onChange={this.onChange}/>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="primary" onClick={this.handleAdminAddSubmit}>
                Confirm Change
                </Button>
              </Modal.Footer>
            </Modal>
            {localStorage.getItem('userPermissions') == 2 && AdminRemoveButton}
            <Modal show={this.state.showRemoveA} onHide={this.closeRemoveAdminModal}>
              <Modal.Header closeButton>
                <Modal.Title>Remove Admin</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form  onSubmit={this.handleAdminRemoveSubmit}>
                  <Form.Group>
                    <Form.Label>Users: </Form.Label>
                      <Select value={this.state.selectedUser} options={this.state.users.filter(x => { if (x.permission == 2) { return{x} } }).map(x => { return {'value': x, 'label': x.name}})} onChange={this.onChange}/>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="primary" onClick={this.handleAdminRemoveSubmit}>
                Confirm Change
                </Button>
              </Modal.Footer>
            </Modal>
          </Nav>
            {localStorage.getItem("user") ? logoutButton : loginButton};
        </Navbar.Collapse>
      </Navbar>
    );
  }

}
