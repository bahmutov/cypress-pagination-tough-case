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
        cy.log('**end of the**')
      }
    })
}
