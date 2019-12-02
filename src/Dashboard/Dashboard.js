import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from '@emotion/styled';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

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
  width: "100%",
  height: "100%"
}

const Dashboard = ({ pending }) => {
  const [selected, setSelected] = React.useState(-1);

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
            <Button variant="primary">Approve</Button>
          </InfoBar>
          <Content>
            <iframe style={iframeStyles} title="PDF Viewer" src={pending[selected].url}></iframe>
          </Content>
        </DashboardContent>
      ) : null}
    </DashboardContainer>
  );
};

export default inject(({ appStore }) => ({
  pending: appStore.pending
}))(observer(Dashboard));
