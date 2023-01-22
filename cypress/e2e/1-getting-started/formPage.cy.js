/// <reference types ="cypress" />

const { defaultStudent } = require('../../clases/student');

describe('Student Form', () => {
	before(() => {
		cy.visit('/automation-practice-form');
		cy.viewport('iphone-x');
	});

	it('Complete form with all the information', () => {
		cy.addStudent(defaultStudent);

		cy.get('#example-modal-sizes-title-lg')
			.contains('Thanks for submitting the form')
			.should('be.visible');

		cy.get('thead')
			.first()
			.within(() => {
				cy.contains('Label').should('be.visible');
				cy.contains('Values').should('be.visible');
			});
		cy.get('tbody').within(() => {
			cy.get('tr')
				.contains('Student Name')
				.and('be.visible')
				.next()
				.should('have.text', `${defaultStudent.name + ' ' + defaultStudent.lastName}`);

			cy.get('td')
				.contains('Student Email')
				.and('be.visible')
				.next()
				.and('have.text', `${defaultStudent.email}`);

			cy.get('td')
				.contains('Gender')
				.and('be.visible')
				.next()
				.and('have.text', `${defaultStudent.gender}`);

			cy.get('td')
				.contains('Mobile')
				.and('be.visible')
				.next()
				.and('have.text', `${defaultStudent.phone}`);

			cy.get('td')
				.contains('Date of Birth')
				.and('be.visible')
				.next()
				.and('have.text', `${defaultStudent.day + ' ' + 'February' + ',' + defaultStudent.year}`);

			cy.get('td')
				.contains('Subjects')
				.and('be.visible')
				.next()
				.and('have.text', `${defaultStudent.subjects[0] + ', ' + defaultStudent.subjects[1] + ', ' + defaultStudent.subjects[2]}`);

			cy.get('td')
				.contains('Hobbies')
				.and('be.visible')
				.next()
				.and('have.text', `${defaultStudent.hobbies}`);
		});
	});
});

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
