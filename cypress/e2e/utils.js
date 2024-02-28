/// <reference types="cypress-map" />
// @ts-check

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

/**
 * Checks if the given item is not present on the page and
 * recursively clicks the "Next" button until the item is found
 * or the button is disabled.
 * @param {string} item - The item to check for on the page.
 * @returns {void}
 */
export const checkPage1 = (item) => {
  cy.contains('li', item).should('not.exist')
  cy.get('button#next')
    .invoke('is', ':enabled')
    .then((enabled) => {
      if (enabled) {
        cy.get('button#next').click()
        checkPage1(item)
      } else {
        cy.log('**end of the list**')
      }
    })
}

/**
 * Checks if the given item is not present on the page and
 * recursively clicks the "Next" button until the item is found
 * or the button is disabled.
 * Waits for the items to load first.
 * @param {string} item - The item to check for on the page.
 * @returns {void}
 */
export const checkPage2 = (item) => {
  cy.get('li').log('**has list items**')
  cy.contains('li', item).should('not.exist')
  cy.get('button#next')
    .invoke('is', ':enabled')
    .then((enabled) => {
      if (enabled) {
        cy.get('button#next').click()
        checkPage2(item)
      } else {
        cy.log('**end of the list**')
      }
    })
}

/**
 * Checks if the given item is not present on the page and
 * recursively clicks the "Next" button until the item is found
 * or the button is disabled.
 * Waits for the items to load first.
 * When going to the next page, waits for the current list
 * to not change its text for 1500ms.
 * @param {string} item - The item to check for on the page.
 * @returns {void}
 */
export const checkPage3 = (item) => {
  cy.get('li').log('**has list items**')
  cy.contains('li', item).should('not.exist')
  cy.get('button#next')
    .invoke('is', ':enabled')
    .then((enabled) => {
      if (enabled) {
        cy.get('button#next').click()
        cy.get('li').first().stable('element', 1500, { timeout: 3000 })
        checkPage3(item)
      } else {
        cy.log('**end of the list**')
      }
    })
}

/**
 * Checks if the given item is not present on the page and
 * recursively clicks the "Next" button until the item is found
 * or the button is disabled.
 * Confirm the list page has rendered before checking
 * by checking a data attribute.
 * @param {string} item - The item to check for on the page.
 * @param {number} page - The current page number (1-based), default 1
 * @returns {void}
 */
export const checkPage4 = (item, page = 1) => {
  cy.get(`ul[data-page=${page}]`)
  cy.get('li').log(`**page ${page} has list items**`)
  // we can use zero timeout since we are on the right page
  // and we know the LI elements have finished loading
  cy.contains('li', item, { timeout: 0 }).should('not.exist')
  cy.get('button#next')
    .invoke('is', ':enabled')
    .then((enabled) => {
      if (enabled) {
        cy.get('button#next').click()
        checkPage4(item, page + 1)
      } else {
        cy.log('**end of the list**')
      }
    })
}
