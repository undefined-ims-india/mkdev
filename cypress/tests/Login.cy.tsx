import React from 'react'
import Login from '../../client/src/components/Login'
import cypress from 'cypress'

describe('<Login />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Login />)
  })
})