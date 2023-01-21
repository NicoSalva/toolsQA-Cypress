/// <reference types ="cypress" />

const { Student } = require('../../clases/student')

describe('Student Form', () => {
  before(() => {
    cy.visit('/automation-practice-form')
    cy.viewport('iphone-x')
  })

  it('Complete form with all the information', () => {
    const student = new Student(
      'Nicolas',
      'Salvaneschi',
      'nikolassalvaneschi@gmail.com',
      'Male',
      '2494647318',
      '21',
      '2',
      '1984',
      'Math',
      'Sports',
      'Franklin 666',
      'Rajasthan',
      'Jaipur'
    )

    cy.log(student)

    cy.addStudent(student)
  })
})

// Test case:
//Cheking all elements (separado de funcionalidades)

//Check the almost important elements
// 1)Complete data with all the information
// Complete form without data (validate errors)
// Complete form with a inexist e-mail
// Complete form with an invalid phone
// The usar cannot complete email
//All the elements are visible
//Correct page
//Complete user with inexist email
// Complete form with invalid phone
// The usar cannot complete emaiñ
// Complete form with enought numbers
