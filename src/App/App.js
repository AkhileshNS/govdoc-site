import React from 'react';
import Router from 'react-regex-router';
import { inject, observer } from 'mobx-react';
import styled from '@emotion/styled';

import Controller from 'App/App.controller';
import Appbar from 'App/components/Appbar';
import Search from 'Search/Search';
import Login from 'Login/Login';
import List from 'List/List';
import Submit from 'Submit/Submit';
import Pending from 'Pending/Pending';
import Dashboard from 'Dashboard/Dashboard';
import Chain from 'Chain/Chain';

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
          },{
            name: /^Search$/i,
            component: Search
          },{
            name: /^List$/i,
            component: List
          },{
            name: /^Submit$/i,
            component: Submit
          },
          {
            name: /^Pending$/i,
            component: Pending
          },
          {
            name: /^Dashboard$/i,
            component: Dashboard
          },
          {
            name: /^Chain$/i,
            component: Chain
          }
        ]}
      />
    </AppContainer>
  );
};

export default inject(({ appStore }) => ({
  currRoute: appStore.currRoute
}))(observer(App));
