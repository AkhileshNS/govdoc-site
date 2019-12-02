import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from '@emotion/styled';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const PendingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .title {
    color: gray;
    padding: 16px;
  }
`;

const PendingContent = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
`;

const cardStyles = {
  maxHeight: "150px",
  margin: "0 16px"
}

const Pending = ({ pending }) => {
  return (
    <PendingContainer>
      <h3 className='title'>Pending Approvals</h3>
      <PendingContent>
        {pending.map(({ approver, status }) => (
          <Card style={cardStyles} body>
            <Card.Title>{approver.name}</Card.Title>
            <Card.Text>Email: {approver.email}</Card.Text>
            <Badge variant="warning">{status}</Badge>
          </Card>
        ))}
      </PendingContent>
    </PendingContainer>
  );
};

export default inject(({ appStore }) => ({
  pending: appStore.pending
}))(observer(Pending));
