import React from 'react';
import {observer, inject} from 'mobx-react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Appbar = ({user, setRoute}) => {
  let Menu = null;
  let onClick = () => {};

  if (user && "type" in user && user.type==="user") {
    onClick = () => setRoute("Search");
    Menu = <>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link onClick={() => setRoute("Search")}>Search</Nav.Link>
          <Nav.Link onClick={() => setRoute("Pending")}>Pending</Nav.Link>
          <Nav.Link onClick={() => setRoute("Chain")}>Chain</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </>;
  } 

  if (user && "type" in user && user.type==="approver") {
    onClick = () => setRoute("Dashboard");
    Menu = <>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link onClick={() => setRoute("Dashboard")}>Dashboard</Nav.Link>
          <Nav.Link onClick={() => setRoute("Chain")}>Chain</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </>;
  } 

  return <Navbar bg='primary' variant='dark' expand='lg'>
    <Navbar.Brand onClick={onClick}>Document Approval</Navbar.Brand>
    {Menu}
  </Navbar>;
}

export default inject(({appStore}) => ({
  user: appStore.user,
  setRoute: appStore.setRoute
}))(observer(Appbar));