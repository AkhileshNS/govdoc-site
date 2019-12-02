import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from '@emotion/styled';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import firebase from 'global/firebase';

const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const List = styled.div`
  padding-top: 1px;
  width: 200px;
  height: 100%;
  background-color: white;
`;

const DashboardContent = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InfoBar = styled.div`
  width: 100%;
  height: 50px;
  color: gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 16px;
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  position: relative;
`;

const iframeStyles = {
  width: '100%',
  height: '100%'
};

const Dashboard = ({ chain, pending }) => {
  const [selected, setSelected] = React.useState(-1);

  const onClick = () => {
    firebase
      .database()
      .ref('govdoc/chain')
      .push()
      .set({
        id: chain.length + 1,
        timestamp: Date.now(),
        user: {
          name: pending[selected].name,
          email: pending[selected].email,
          mobile: pending[selected].mobile
        },
        approver: {
          name: pending[selected].approver.name,
          email: pending[selected].approver.email
        },
        url: pending[selected].url
      });

    firebase
      .database()
      .ref('govdoc/pending/' + pending[selected].key + '/status')
      .set('Approved');
  };

  return (
    <DashboardContainer>
      <List>
        <ListGroup>
          {pending.map(({ name }, i) => (
            <ListGroup.Item
              style={{ borderRadius: '0' }}
              action
              key={name}
              active={selected === i}
              onClick={() => setSelected(i)}>
              {name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </List>
      {selected !== -1 ? (
        <DashboardContent>
          <InfoBar>
            <span>Email: {pending[selected].email}</span>
            <span>Name: {pending[selected].name}</span>
            <span>Mobile: {pending[selected].mobile}</span>
            <Button
              onClick={onClick}
              variant={
                pending[selected].status.toLowerCase() === 'approved'
                  ? 'success'
                  : 'primary'
              }>
              {pending[selected].status.toLowerCase() === 'approved'
                  ? 'Approved'
                  : 'Approve'}
            </Button>
          </InfoBar>
          <Content>
            <iframe
              style={iframeStyles}
              title='PDF Viewer'
              src={pending[selected].url}></iframe>
          </Content>
        </DashboardContent>
      ) : null}
    </DashboardContainer>
  );
};

export default inject(({ appStore }) => ({
  pending: appStore.pending,
  chain: appStore.chain
}))(observer(Dashboard));
