/// <reference types ="cypress" />

const { defaultStudent } = require('../../clases/student');

let resultHobbies = 'dale';

describe('Student Form', () => {
	before(() => {
		cy.visit('/automation-practice-form');
	});

	it('1/ Complete form with all the information', () => {
		cy.addStudent(defaultStudent);

		//starting validate
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

			resultHobbies = returnHobbiesName(defaultStudent); //convert my hobbie to text

			cy.get('td')
				.contains('Hobbies')
				.and('be.visible')
				.next()
				.and('have.text', resultHobbies);

			cy.get('td')
				.contains('Picture')
				.and('be.visible')
				.next()
				.and('have.text', 'picture.jpg');

			cy.get('td')
				.contains('Address')
				.and('be.visible')
				.next()
				.and('have.text', `${defaultStudent.address}`);

			cy.get('td')
				.contains('State and City')
				.and('be.visible')
				.next()
				.and('have.text', `${defaultStudent.state + ' ' + defaultStudent.city}`);
		});

		cy.get('#closeLargeModal').click();
	});

	it('2/ Submit empty form (validate errors)', () => {
		cy.get('form').submit(); // Submit a form

		cy.get('#firstName')
			.should('be.visible')
			.and('not.have.text');

		cy.get('#lastName')
			.should('be.visible')
			.and('not.have.text');

		cy.get('#gender-radio-1').should('not.be.checked');
		cy.get('#gender-radio-2').should('not.be.checked');
		cy.get('#gender-radio-3').should('not.be.checked');

		cy.get('#userNumber')
			.should('be.visible')
			.and('not.have.text');

		//expect()
	});

	it('3/ Minimal requieres to complete form', () => {
		cy.parcialComplete(defaultStudent);
		cy.get('#closeLargeModal').click();
	});

	it('4/ Complete form with a inexist e-mail and validate the real email structure', () => {
		cy.get('form').within($form => {
			//first name
			cy.get('#firstName').type(defaultStudent.name);

			//last name
			cy.get('#lastName').type(defaultStudent.lastName);

			//gender
			cy.get('[type="radio"]')
				.first()
				.check({ force: true });

			//phone
			cy.get('#userNumber').type(defaultStudent.phone);

			//Complete e-mail with 'aaaa' without @ and .com
			cy.get('#userEmail').should('be.visible');
			cy.get('#userEmail').type('aaaa');
		});
		cy.invalidSubmit();

		cy.get('#userEmail').should('be.visible');

		//Complete mail with '1111' (without name and .com)
		cy.get('#userEmail')
			.clear()
			.type('111');

		cy.invalidSubmit();
		cy.get('#userEmail').should('be.visible');

		cy.get('#userEmail').clear();

		//Complete e-mail with @a.com (without name)
		cy.get('#userEmail').type('@a.com');

		cy.invalidSubmit();
		///Complete e-mail with a@a.com (correct structure)
		cy.get('#userEmail')
			.clear()
			.type('a@a.com');

		cy.get('#userEmail').clear();

		cy.get('#userEmail').should('be.visible');
		cy.get('#userEmail').type('a@a.com');

		cy.get('form').submit();

		cy.get('#example-modal-sizes-title-lg')
			.contains('Thanks for submitting the form')
			.should('be.visible');
	});

	it.only('5/ Complete form with a invalid Phone Number and validate the real structure', () => {
		cy.get('form').within($form => {
			//first name
			cy.get('#firstName').type(defaultStudent.name);
			//last name
			cy.get('#lastName').type(defaultStudent.lastName);
			//gender
			cy.get('[type="radio"]')
				.first()
				.check({ force: true });
			//phone
			cy.get('#userEmail').type(defaultStudent.email);

			//Complete mail with less of 10 numbers
			cy.get('#userNumber').should('be.visible');
			cy.get('#userNumber').type('123456789');
		});
		cy.invalidSubmit();
	});
});

function returnHobbiesName(user) {
	if (user.hobbies == '1') {
		return 'Sports';
	}
	if (user.hobbies == '2') {
		return 'Reading';
	}
	if (user.hobbies == '3') {
		return 'Music';
	}
}

// Test case:
//Cheking all elements (separado de funcionalidades)

//Check the almost important elements
// 1)Complete data with all the information
// 2)Complete form without data (validate errors)
//3) minimal requieres to complete form
// 4/ Complete form with a inexist e-mail and validate the real email structure
// 5/ Complete form with a invalid Phone Number and validate the real structure
// The usar cannot complete email
//All the elements are visible
//Correct page
//Complete user with inexist email
// Complete form with invalid phone
// The usar cannot complete emaiñ
// Complete form with enought numbers
