/// <reference types="cypress" />

/**
 * Checks if the given item is not present on the page and
 * recursively clicks the "Next" button until the item is found
 * or the button is disabled.
 * @param {string} item - The item to check for on the page.
 * @returns {void}
 */
const checkPage = (item) => {
  cy.contains('li', item).should('not.exist')
  cy.get('button#next')
    .invoke('is', ':enabled')
    .then((enabled) => {
      if (enabled) {
        cy.get('button#next').click()
        checkPage(item)
      }
    })
}

it('confirms the list has no such item', () => {
  cy.visit('cypress/fixtures/spec1.html')
  // text of an item that should NOT be in the list
  const item = 'apples'
  // test with an item that is on the first page
  // => the test should fail
  // const item = 'second'
  // test with an item that is on the second page
  // => the test should fail
  // const item = 'fifth'

  checkPage(item)
})

it('fails if the item is on the first page', () => {
  cy.visit('cypress/fixtures/spec1.html')
  // test with an item that is on the first page
  // => the test should fail
  const item = 'second'
  checkPage(item)
})

it('fails if the item is on the second page', () => {
  cy.visit('cypress/fixtures/spec1.html')
  const item = 'fifth'
  checkPage(item)
})
