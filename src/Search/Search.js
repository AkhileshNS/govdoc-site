import React from 'react';
import styled from '@emotion/styled';
import { inject, observer } from 'mobx-react';
import clone from 'lodash/cloneDeep';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Search = ({ search, setSearch, setRoute }) => {
  console.log(clone(search));

  return (
    <SearchContainer>
      <Card style={{ minWidth: '300px' }}>
        <Card.Body>
          <Form>
            <Form.Group controlId='exampleForm.ControlSelect2'>
              <Form.Label>Choose State</Form.Label>
              <Form.Control
                as='select'
                value={search.state}
                onChange={({ target }) => setSearch({ state: target.value })}>
                <option hidden>-</option>
                {['Karnataka'].map(val => (
                  <option key={val}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlSelect2'>
              <Form.Label>Choose City</Form.Label>
              <Form.Control
                as='select'
                value={search.city}
                onChange={({ target }) => setSearch({ city: target.value })}
                disabled={search.state===""}>
                <option hidden>-</option>
                {['Bangalore'].map(val => (
                  <option key={val}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlSelect2'>
              <Form.Label>Choose Locality</Form.Label>
              <Form.Control
                as='select'
                value={search.locality}
                onChange={({ target }) =>
                  setSearch({ locality: target.value })
                }
                disabled={search.city===""}>
                <option hidden>-</option>
                {[
                  'Vijaynagar',
                  'Indiranagar'
                ].map(val => (
                  <option key={val}>{val}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
          <Button onClick={() => setRoute("list")} disabled={search.locality===""} variant='primary' block>
            Search
          </Button>
        </Card.Body>
      </Card>
    </SearchContainer>
  );
};

export default inject(({ appStore }) => ({
  search: appStore.search,
  setSearch: appStore.setSearch,
  setRoute: appStore.setRoute
}))(observer(Search));
