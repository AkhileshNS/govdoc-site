import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from '@emotion/styled';
import Dropzone from 'react-dropzone';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import uuid from 'uuid/v4';
import firebase from 'global/firebase';

const SubmitContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DropContainer = styled.div`
  width: 100%;
  background-color: #eff0f1;
  color: gray;
  text-align: center;
  padding: 16px 0;
  margin-bottom: 12px;
  cursor: pointer;
  border-radius: 4px;

  :hover {
    color: black;
  }
`;

const Submit = ({ user, approver, setRoute }) => {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    mobile: '',
    document: null
  });
  const [percent, setPercent] = React.useState('');

  const onClick = () => {
    const UUID = uuid();
    const task = firebase
      .storage()
      .ref()
      .child('govdoc/' + UUID + '.pdf')
      .put(form.document, { contentType: form.document.type });

    task.on(
      'state_changed',
      snap => {
        let progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        if (progress < 100) {
          setPercent(
            'Uploading... ' + Math.round(progress * 100) / 100 + '% done'
          );
        } else {
          setPercent('Uploaded');
        }
      },
      err => console.log(err),
      () => {
        task.snapshot.ref
          .getDownloadURL()
          .then(url => {
            firebase
              .database()
              .ref('govdoc/pending')
              .push()
              .set({
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                approver: {
                  name: approver.name,
                  email: approver.email
                },
                status: 'Pending Approval',
                url
              });

            setRoute('pending');
          })
          .catch(err => console.log(err));
      }
    );
  };

  return (
    <SubmitContainer>
      <Card style={{ minWidth: '500px' }} body>
        <Card.Title>Document Form</Card.Title>
        <Form>
          <Form.Group controlId='formBasicName'>
            <Form.Label>Name (as per ID Proof)</Form.Label>
            <Form.Control
              value={form.name}
              onChange={({ target }) =>
                setForm({ ...form, name: target.value })
              }
              type='text'
              placeholder='Enter name'
            />
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={form.email}
              onChange={({ target }) =>
                setForm({ ...form, email: target.value })
              }
              type='email'
              placeholder='Enter email'
            />
          </Form.Group>
          <Form.Group controlId='formBasicNumber'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              value={form.mobile}
              onChange={({ target }) =>
                setForm({ ...form, mobile: target.value })
              }
              type='number'
              placeholder='Enter phone number'
            />
          </Form.Group>
        </Form>
        <Dropzone
          accept='application/pdf,image/png,image/jpg'
          onDrop={acceptedFiles =>
            setForm({ ...form, document: acceptedFiles[0] })
          }>
          {({ getRootProps, getInputProps }) => (
            <DropContainer {...getRootProps()}>
              <input {...getInputProps()} />
              <span>
                Drag 'n' drop some files here, or click to select files
              </span>
              <br />
              <em>(Only *.pdf, *.jpg and *.png files will be accepted)</em>
            </DropContainer>
          )}
        </Dropzone>
        {form.document ? (
          <CenterContainer>
            <Card.Text>{form.document.name}</Card.Text>
          </CenterContainer>
        ) : null}
        <CenterContainer>
          <Button
            disabled={
              form.name === '' ||
              form.email === '' ||
              form.mobile === '' ||
              form.document === null
            }
            variant='primary'
            onClick={onClick}>
            {percent.toLowerCase().includes('uploading') ? (
              <Spinner
                as='span'
                animation='grow'
                size='sm'
                role='status'
                aria-hidden='true'
              />
            ) : null}
            {percent.toLowerCase().includes('uploading') ? percent : 'Submit'}
          </Button>
        </CenterContainer>
      </Card>
    </SubmitContainer>
  );
};

export default inject(({ appStore }) => ({
  user: appStore.user,
  approver: appStore.approver,
  setRoute: appStore.setRoute
}))(observer(Submit));
