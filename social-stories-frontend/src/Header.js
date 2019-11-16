/**
 * Header module.
 * @module Header
 * @requires none
 */

import React from 'react';
import {Navbar, Nav} from "react-bootstrap";
import TextSearch from './textSearch';
import AddPostModal from './AddPostModal';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

//TODO: Make sure that content is required
export default class Header extends React.Component {

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
          <Navbar.Brand>Classes++</Navbar.Brand>
          <TextSearch setSearch={this.props.setSearch} />
          <Nav className="mr-auto">
          <AddPostModal />
          </Nav>
            {localStorage.getItem("user") ? logoutButton : loginButton};
        </Navbar.Collapse>
      </Navbar>
    );
  }

}
