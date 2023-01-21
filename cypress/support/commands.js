/// <reference types ="cypress" />

Cypress.Commands.add('addStudent', student => {
  cy.get('form').within($form => {
    cy.get('#firstName').should('be.visible')
    cy.get('#firstName').type(student.name)

    cy.get('#lastName').type(student.lastName)

    cy.get('#userEmail').should('be.visible')
    cy.get('#userEmail').type(student.email)

    cy.get('[type="radio"]')
      .first()
      .check({ force: true })

    cy.get('#userNumber').type(student.phone) //phone

    cy.get('#dateOfBirthInput').click()

    cy.get('.react-datepicker__month-select') // month
      .select('February')
      .should('have.value', '1')

    cy.get('.react-datepicker__year-select') //year
      .select('1984')
      .should('have.value', '1984')

    cy.get('.react-datepicker__day--021') //day
      .should('have.text', '21')
      .click({ force: true })

    cy.get('[type="checkbox"]')
      .first()
      .check({ force: true })

    cy.get('#currentAddress').type(student.adress) //add adress

    //select state
    cy.get('#state > .css-yk16xz-control > .css-1hwfws3').type('Rajasthan')
    cy.get('.css-1hwfws3').each(($e1, index, $list) => {
      // $e1 is a wrapped jQuery element

      if ($e1.text() === 'Rajasthan') {
        cy.tab()
      }
    })

    //select city
    cy.get('#city > .css-yk16xz-control > .css-1hwfws3').type('Jaipur')
    cy.get('.css-1hwfws3').each(($e1, index, $list) => {
      // $e1 is a wrapped jQuery element
      if ($e1.text() === 'Jaipur') {
        cy.tab()
      }
    })
  })

  cy.get('form').submit() // Submit a form
})
// Cypress.Commands.add('switchIframe', (iframe) => {
// return cy
//     .get(iframe)
//     .its()})

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
