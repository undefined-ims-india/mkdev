import React from 'react';
import SearchComponent from '../../client/src/components/Search';
import { Routes } from 'react-router-dom';

describe('<SearchComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    <Routes>
      cy.mount(
      <SearchComponent />
      );
    </Routes>;
  })
  it('Can search for a  result', () => {
    
  });
});
