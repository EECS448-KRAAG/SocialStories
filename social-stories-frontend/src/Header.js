/**
 * Header module.
 * @module Header
 * @requires none
 */

import React from 'react';
import {Navbar, Nav, Modal, Form, Button} from "react-bootstrap";
import Select from 'react-select';
import TextSearch from './textSearch';
import AddPostModal from './AddPostModal';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

export default class Header extends React.Component {

  state = {
    showAddI: false,
    showRemoveI: false,
    showAddA: false,
    showRemoveA: false,
    selectedUser: {},
    users: []
  };

   /**
   * Updates the value of showAddI state to true when the user click on the add post on navbar
   * @name showAddInstrucModal
   * @memberof module:Header
   * @function
   * @param e {Object} The event object created when the user clicks on "Add Instructor" located on the navbar
   * @returns none
   */
    showAddInstrucModal = e => { this.setState({ showAddI: true }); };

    /**
    * Updates the value of showAddI state to false when the user click on the add post on navbar
    * @name closeAddInstrucModal
    * @memberof module:Header
    * @function
    * @param e {Object} The event object created when the user clicks either on the "x" button or the "Confirm Change" button in the modal
    * @returns none
    */
    closeAddInstrucModal = e => { this.setState({ showAddI: false }); };

    /**
    * Updates the value of showRemoveI state to true when the user click on the add post on navbar
    * @name showRemoveInstrucModal
    * @memberof module:Header
    * @function
    * @param e {Object} The event object created when the user clicks on "Remove Instructor" located on the navbar
    * @returns none
    */
    showRemoveInstrucModal = e => { this.setState({ showRemoveI: true }); };

    /**
    * Updates the value of showRemoveI state to false when the user click on the add post on navbar
    * @name closeRemoveInstrucModal
    * @memberof module:Header
    * @function
    * @param e {Object} The event object created when the user clicks either on the "x" button or the "Confirm Change" button in the modal
    * @returns none
    */
    closeRemoveInstrucModal = e => { this.setState({ showRemoveI: false }); };

    /**
    * Updates the value of showAddA state to true when the user click on the add post on navbar
    * @name showAddAdminModal
    * @memberof module:Header
    * @function
    * @param e {Object} The event object created when the user clicks on "Add Admin" located on the navbar
    * @returns none
    */
    showAddAdminModal = e => { this.setState({ showAddA: true }); };

    /**
    * Updates the value of showAddA state to false when the user click on the add post on navbar
    * @name closeAddAdminModal
    * @memberof module:Header
    * @function
    * @param e {Object} The event object created when the user clicks either on the "x" button or the "Confirm Change" button in the modal
    * @returns none
    */
    closeAddAdminModal = e => { this.setState({ showAddA: false }); };

    /**
    * Updates the value of showRemoveA state to true when the user click on the add post on navbar
    * @name showRemoveAdminModal
    * @memberof module:Header
    * @function
    * @param e {Object} The event object created when the user clicks on "Remove Admin" located on the navbar
    * @returns none
    */
    showRemoveAdminModal = e => { this.setState({ showRemoveA: true }); };

    /**
    * Updates the value of showRemoveA state to false when the user click on the add post on navbar
    * @name closeRemoveAdminModal
    * @memberof module:Header
    * @function
    * @param e {Object} The event object created when the user clicks either on the "x" button or the "Confirm Change" button in the modal
    * @returns none
    */
    closeRemoveAdminModal = e => {this.setState({showRemoveA: false});};

    /**
    * Updates the value of the selectedUser state to match whatever the user has typed or selected from the dropdown
    * @name onChange
    * @memberof module:Header
    * @function
    * @param e {Object} The event object created when the user types or selects a user from the dropdown.
    * @returns none
    */
    onChange = e => {
      console.log(e);
      this.setState({selectedUser: e});
    }

    /**
    * Called once before the initial render. Gets the list of all users from the backend and stores them in the users state.
    * @name componentWillMount
    * @memberof module:Header
    * @function
    * @param none
    * @returns none
    */
    componentWillMount() {
      window.fetch('/api/user')
      .then(response=> response.json())
      .then(json=> this.setState({users: json}));
    }

    /**
    * Handles setting permissions and getting user information from their Google login.
    * @name handleGoogleLogin
    * @memberof module:Header
    * @function
    * @param account {Object} The account object created when the user logins using Google.
    * @returns none
    */
    handleGoogleLogin = async (account) => {
        localStorage.setItem("user", JSON.stringify(account));
        this.forceUpdate();
        const raw_permissions = await window.fetch(`/api/user/${account.googleId}/permission?name=${account.profileObj.name}`);
        const data = await raw_permissions.json();
        localStorage.setItem('userPermissions', data.permission);
        window.location.reload();
    }

    /**
    * Handles removing permissions and user information after a users logouts.
    * @name handleGoogleLogout
    * @memberof module:Header
    * @function
    * @param none
    * @returns none
    */
    handleGoogleLogout = async () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userPermissions");
        this.forceUpdate();
        window.location.reload();
    }

    /**
    * Updates the backend to reflect that a new user has instructor permissions.
    * @name AddInstrucData
    * @memberof module:Header
    * @function
    * @param none
    * @returns none
    */
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

    /**
    * Closes the Add Instructor modal and calls the AddInstrucData function to handle updating the backend.
    * @name handleInstrucAddSubmit
    * @memberof module:Header
    * @function
    * @param e {Object} The event object created when the user clicks on the "Confirm Change" button in the Add Instructor modal
    * @returns none
    */
    handleInstrucAddSubmit = e => {
        this.closeAddInstrucModal();
        this.AddInstrucData();
    }

    /**
    * Updates the backend to reflect that a user no longer has instructor permissions.
    * @name RemoveInstrucData
    * @memberof module:Header
    * @function
    * @param none
    * @returns none
    */
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

    /**
    * Closes the Remove Instructor modal and calls the RemoveInstrucData function to handle updating the backend.
    * @name handleInstrucRemoveSubmit
    * @memberof module:Header
    * @function
    * @param e {Object} The event object created when the user clicks on the "Confirm Change" button in the Remove Instructor modal
    * @returns none
    */
    handleInstrucRemoveSubmit = e => {
        this.closeRemoveInstrucModal();
        this.RemoveInstrucData();
    }

    /**
    * Updates the backend to reflect that a new user has administrator permissions.
    * @name AddAdminData
    * @memberof module:Header
    * @function
    * @param none
    * @returns none
    */
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

    /**
    * Closes the Add Admin modal and calls the AddAdminData function to handle updating the backend.
    * @name handleAdminAddSubmit
    * @memberof module:Header
    * @function
    * @param e {Object} The event object created when the user clicks on the "Confirm Change" button in the Add Admin modal
    * @returns none
    */
    handleAdminAddSubmit = e => {
        this.closeAddAdminModal();
        this.AddAdminData();
    }

    /**
    * Updates the backend to reflect that a user no longer has administrator permissions.
    * @name RemoveAdminData
    * @memberof module:Header
    * @function
    * @param none
    * @returns none
    */
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

    /**
    * Closes the Remove Admin modal and calls the RemoveAdminData function to handle updating the backend.
    * @name handleAdminRemoveSubmit
    * @memberof module:Header
    * @function
    * @param e {Object} The event object created when the user clicks on the "Confirm Change" button in the Remove Admin modal
    * @returns none
    */
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
          <Navbar.Brand href="/"><img src="./logo.png" height="40px" alt="Classes++" /></Navbar.Brand>
          <TextSearch setSearch={this.props.setSearch} />
          <Nav className="mr-auto">
          <AddPostModal />
          {parseInt(localStorage.getItem('userPermissions')) === 2 && InstrucAddButton}
            <Modal show={this.state.showAddI} onHide={this.closeAddInstrucModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add Instructor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form  onSubmit={this.handleInstrucAddSubmit}>
                  <Form.Group>
                    <Form.Label>Users: </Form.Label>
                      <Select
                        value={this.state.selectedUser}
                        options={this.state.users
                          .filter(x => x.permission === 0)
                          .map(x => {return {'value': x, 'label': x.name}})} 
                        onChange={this.onChange}
                      />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="primary" onClick={this.handleInstrucAddSubmit}>
                Confirm Change
                </Button>
            </Modal.Footer>
            </Modal> 
            {parseInt(localStorage.getItem('userPermissions')) === 2 && InstrucRemoveButton}
            <Modal show={this.state.showRemoveI} onHide={this.closeRemoveInstrucModal}>
              <Modal.Header closeButton>
                <Modal.Title>Remove Instructor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form  onSubmit={this.handleInstrucRemoveSubmit}>
                  <Form.Group>
                    <Form.Label>Users: </Form.Label>
                      <Select
                        value={this.state.selectedUser}
                        options={this.state.users
                          .filter(x => x.permission === 1 )
                          .map(x => { return {'value': x, 'label': x.name}})}
                        onChange={this.onChange}
                      />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="primary" onClick={this.handleInstrucRemoveSubmit}>
                Confirm Change
                </Button>
              </Modal.Footer>
            </Modal>
            { parseInt(localStorage.getItem('userPermissions')) === 2 && AdminAddButton }
            <Modal show={this.state.showAddA} onHide={this.closeAddAdminModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add Admin</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form  onSubmit={this.handleAdminAddSubmit}>
                  <Form.Group>
                    <Form.Label>Users: </Form.Label>
                      <Select
                        value={this.state.selectedUser}
                        options={this.state.users
                          .filter(x => x.permission < 2)
                          .map(x => { return {'value': x, 'label': x.name}})}
                        onChange={this.onChange}
                      />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="primary" onClick={this.handleAdminAddSubmit}>
                Confirm Change
                </Button>
              </Modal.Footer>
            </Modal>
            {parseInt(localStorage.getItem('userPermissions')) === 2 && AdminRemoveButton}
            <Modal show={this.state.showRemoveA} onHide={this.closeRemoveAdminModal}>
              <Modal.Header closeButton>
                <Modal.Title>Remove Admin</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form  onSubmit={this.handleAdminRemoveSubmit}>
                  <Form.Group>
                    <Form.Label>Users: </Form.Label>
                      <Select
                        value={this.state.selectedUser}
                        options={this.state.users
                          .filter(x => x.permission === 2)
                          .map(x => { return {'value': x, 'label': x.name}})}
                        onChange={this.onChange}
                      />
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
