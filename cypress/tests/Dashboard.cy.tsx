import React from 'react'
import Dashboard from '../../client/src/components/Dashboard'

describe('<Dashboard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Dashboard />)
  })
})