/// <reference types="cypress" />
// @ts-check

import { checkPage1 as checkPage } from './utils'

beforeEach(() => {
  cy.visit('cypress/fixtures/spec1.html')
})

it('confirms the list has no such item', () => {
  cy.visit('cypress/fixtures/spec1.html')
  // text of an item that should NOT be in the list
  const item = 'apples'
  checkPage(item)
})

it('fails if the item is on the first page', () => {
  // test with an item that is on the first page
  // => the test should fail
  const item = 'second'
  checkPage(item)
})

it('fails if the item is on the second page', () => {
  const item = 'fifth'
  checkPage(item)
})
