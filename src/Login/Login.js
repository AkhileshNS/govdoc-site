import React from 'react';
import styled from '@emotion/styled';
import Card from 'react-bootstrap/Card';
import firebase from 'global/firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = () => {
  return (
    <LoginContainer>
      <Card>
        <Card.Body>
          <Card.Title>Login/SignUp</Card.Title>
          <Card.Text>
            Please login/signup with your email to get started
          </Card.Text>
          <StyledFirebaseAuth
            firebaseAuth={firebase.auth()}
            uiConfig={{
              signInFlow: 'redirect',
              signInSuccessUrl: '/',
              signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
            }}
          />
        </Card.Body>
      </Card>
    </LoginContainer>
  );
};

export default Login;
