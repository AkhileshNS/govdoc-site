import React from 'react';
import styled from '@emotion/styled';
import firebase from 'global/firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .firebaseui-container {
    box-shadow: none;
  }
  .mdl-textfield__input.firebaseui-input.firebaseui-id-email {
    border-color: var(--primary);
  }
  .firebaseui-id-submit.firebaseui-button.mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored {
    background: var(--primary);
    box-shadow: none;
  }
  .firebaseui-id-secondary-link.firebaseui-button.mdl-button.mdl-js-button.mdl-button--primary {
    color: var(--primary);
  }
`;

const Login = () => {
  return (
    <LoginContainer>
      <StyledFirebaseAuth
        firebaseAuth={firebase.auth()}
        uiConfig={{
          signInFlow: 'redirect',
          signInSuccessUrl: '/',
          signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
        }}
      />
    </LoginContainer>
  );
};

export default Login;
