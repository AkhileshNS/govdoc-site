import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from '@emotion/styled';
import firebase from 'global/firebase';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfilePhoto = styled.img`
  width: 100%;
  max-width: 150px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const cardStyles = {
  maxWidth: "225px",
  margin: "0px 16px"
}

const cardBodyStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}

const List = ({ search, approvers, addApprover }) => {
  React.useEffect(() => {
    firebase
      .database()
      .ref(
        `govdoc/approvers/${search.state.toLowerCase()}/${search.city.toLowerCase()}/${search.locality.toLowerCase()}`
      )
      .once('value')
      .then(snap => {
        if (snap.exists()) {
          let approversObj = snap.val();
          for (let key in approversObj) {
            addApprover(approversObj[key]);
          }
        }
      });
  }, []);

  return (
    <ListContainer>
      {approvers.map(({ name, email, url }) => (
        <Card style={cardStyles} key={email}>
          <Card.Body style={cardBodyStyles}>
            <ProfilePhoto src={url} alt={email} />
            <Card.Title>{name}</Card.Title>
            <Card.Text>{email}</Card.Text>
            <Button variant='primary'>Select</Button>
          </Card.Body>
        </Card>
      ))}
    </ListContainer>
  );
};

export default inject(({ appStore }) => ({
  search: appStore.search,
  approvers: appStore.approvers,
  addApprover: appStore.addApprover,
  setApprover: appStore.setApprover
}))(observer(List));
