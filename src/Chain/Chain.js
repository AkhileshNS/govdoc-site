import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from '@emotion/styled';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const ChainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .title {
    color: gray;
    padding: 16px;
  }
`;

const ChainContent = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
`;

const cardStyles = {
  maxHeight: "280px",
  margin: '0 16px'
};

const Chain = ({ chain }) => {
  return (
    <ChainContainer>
      <h3 className='title'>Blockchain</h3>
      <ChainContent>
        {chain.map(({ id, timestamp, user, approver }) => (
          <Card style={cardStyles} body>
            <Card.Title>{id}</Card.Title>
            <Card.Text>{timestamp}</Card.Text>
            <Card.Text>Approver Name: {approver.name}<br />
            Approver Email: {approver.email}<br />
            Email: {user.email}<br />
            Name: {user.name}<br />
            Mobile: {user.mobile}</Card.Text>
            <Badge variant='success'>Approved</Badge>
          </Card>
        ))}
      </ChainContent>
    </ChainContainer>
  );
};

export default inject(({ appStore }) => ({
  chain: appStore.chain
}))(observer(Chain));
