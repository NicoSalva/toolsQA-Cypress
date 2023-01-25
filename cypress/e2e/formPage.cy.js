/// <reference types ="cypress" />

const { defaultStudent } = require('../clases/student');

let resultHobbies = 'dale';

describe('Student Form', () => {
	beforeEach(() => {
		cy.visit('/automation-practice-form');
		cy.viewport('iphone-x');
	});

	it('Complete form with all the information', () => {
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
			cy.get('tr:nth-child(1)')
				.contains('Student Name')
				.and('be.visible')
				.next()
				.should('have.text', `${defaultStudent.name + ' ' + defaultStudent.lastName}`);

			cy.get('tr:nth-child(2)')
				.contains('Student Email')
				.and('be.visible')
				.next()
				.and('have.text', `${defaultStudent.email}`);

			cy.get('tr:nth-child(3)')
				.focused()
				.contains('Gender')
				.and('be.visible')
				.next()
				.and('have.text', `${defaultStudent.gender}`);

			cy.get('tr:nth-child(4)')
				.contains('Mobile')
				.and('be.visible')
				.next()
				.and('have.text', `${defaultStudent.phone}`);

			cy.get('tr:nth-child(5)')
				.contains('Date of Birth')
				.and('be.visible')
				.next()
				.and('have.text', `${defaultStudent.day + ' ' + 'February' + ',' + defaultStudent.year}`);

			cy.get('tr:nth-child(6)')
				.contains('Subjects')
				.and('exist')
				.next()
				.and('have.text', `${defaultStudent.subjects[0] + ', ' + defaultStudent.subjects[1] + ', ' + defaultStudent.subjects[2]}`);

			resultHobbies = returnHobbiesName(defaultStudent); //convert my hobbie to text

			cy.get('tr:nth-child(7)')
				.contains('Hobbies')
				.and('be.visible')
				.next()
				.and('have.text', resultHobbies);

			cy.get('tr:nth-child(8)')
				.contains('Picture')
				.and('be.visible')
				.next()
				.and('have.text', 'picture.jpg');

			cy.get('tr:nth-child(9)')
				.contains('Address')
				.and('be.visible')
				.next()
				.and('have.text', `${defaultStudent.address}`);

			cy.get('tr:nth-child(10)')
				.contains('State and City')
				.and('exist')
				.next()
				.and('exist')
				.and('have.text', `${defaultStudent.state + ' ' + defaultStudent.city}`);
		});

		cy.get('#closeLargeModal').click({ force: true });
	});

	it('Submit empty form (validate errors)', () => {
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
	});

	it('Minimal requieres to complete form', () => {
		cy.parcialComplete(defaultStudent);
		cy.get('#closeLargeModal').click({ force: true });
	});

	it('Complete form with a inexist e-mail and validate the real email structure', () => {
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
			cy.get('#userNumber')
				.click()
				.type(defaultStudent.phone);

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

	it('Complete form with a invalid Phone Number and validate the real structure', () => {
		cy.get('form').within($form => {
			//first name
			cy.get('#firstName')
				.click({ force: true })
				.type(defaultStudent.name);
			//last name
			cy.get('#lastName').type(defaultStudent.lastName);
			//gender
			cy.get('[type="radio"]')
				.first()
				.check({ force: true });
			//phone
			cy.get('#userEmail').type(defaultStudent.email);

			//Complete phone with less of 10 numbers
			cy.get('#userNumber').should('be.visible');
			cy.get('#userNumber').type('123456789');
		});
		cy.invalidSubmit();
		cy.get('#userNumber').clear();

		//Complete phone with chars
		cy.get('#userNumber').should('be.visible');
		cy.get('#userNumber').type('aaaaaaaaaa');

		cy.invalidSubmit();
		cy.get('#userNumber').clear();

		//Complete phone with 10 numbers
		cy.get('#userNumber').should('be.visible');
		cy.get('#userNumber').type(defaultStudent.phone);

		cy.get('form').submit();

		cy.get('#example-modal-sizes-title-lg')
			.contains('Thanks for submitting the form')
			.should('be.visible');
	});

	it.skip('', () => {});
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