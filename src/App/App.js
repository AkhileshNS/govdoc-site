import React from 'react';
import Router from 'react-regex-router';
import { inject, observer } from 'mobx-react';
import styled from '@emotion/styled';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Login from 'Login/Login';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e4e4e4;
  display: flex;
  flex-direction: column;
`;

const App = ({ currRoute }) => {
  return (
    <AppContainer>
      <Navbar bg='primary' variant='dark' expand='lg'>
        <Navbar.Brand>Document Approval</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Router
        currRoute={currRoute}
        routes={[
          {
            name: /^Login$/i,
            component: Login
          }
        ]}
      />
    </AppContainer>
  );
};

export default inject(({ appStore }) => ({
  currRoute: appStore.currRoute
}))(observer(App));
