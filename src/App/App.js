import React from 'react';
import Router from 'react-regex-router';
import { inject, observer } from 'mobx-react';
import styled from '@emotion/styled';

import Controller from './App.controller';
import Login from 'Login/Login';
import Appbar from 'App/components/Appbar';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e4e4e4;
  display: flex;
  flex-direction: column;
`;

const App = ({currRoute}) => {
  return (
    <AppContainer>
      <Controller />
      <Appbar />
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
