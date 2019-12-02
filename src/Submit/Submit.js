import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from '@emotion/styled';
import Dropzone from 'react-dropzone';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

const Submit = ({ setRoute }) => {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    mobile: '',
    document: null
  });

  const onClick = () => {
    // Insert Firebase Command Here
    setRoute("pending");
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
            Submit
          </Button>
        </CenterContainer>
      </Card>
    </SubmitContainer>
  );
};

export default inject(({ appStore }) => ({ setRoute: appStore.setRoute }))(
  observer(Submit)
);
