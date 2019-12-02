import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from '@emotion/styled';
import firebase from 'global/firebase';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

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
  maxWidth: '225px',
  margin: '0px 16px'
};

const cardBodyStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const List = ({ search, setApprover, setRoute }) => {
  const [approvers, setApprovers] = React.useState([]);

  React.useEffect(() => {
    firebase
      .database()
      .ref(
        `govdoc/approvers/${search.state.toLowerCase()}/${search.city.toLowerCase()}/${search.locality.toLowerCase()}`
      )
      .once('value')
      .then(snap => {
        if (snap.exists()) {
          let _approvers = [];
          let approversObj = snap.val();
          for (let key in approversObj) {
            _approvers.push(approversObj[key]);
          }
          setApprovers(_approvers);
        }
      });
  }, []);

  const onClick = i => {
    setApprover(approvers[i]);
    setRoute('Submit');
  };

  return (
    <ListContainer>
      {approvers.length === 0 ? (
        <Spinner animation='border' variant='primary' role='status' />
      ) : (
        approvers.map(({ name, email, url }, i) => (
          <Card style={cardStyles} key={email}>
            <Card.Body style={cardBodyStyles}>
              <ProfilePhoto src={url} alt={email} />
              <Card.Title>{name}</Card.Title>
              <Card.Text>{email}</Card.Text>
              <Button onClick={() => onClick(i)} variant='primary'>
                Select
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </ListContainer>
  );
};

export default inject(({ appStore }) => ({
  search: appStore.search,
  setApprover: appStore.setApprover,
  setRoute: appStore.setRoute
}))(observer(List));
