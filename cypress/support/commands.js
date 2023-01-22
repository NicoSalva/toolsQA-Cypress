/// <reference types ="cypress" />

Cypress.Commands.add('addStudent', student => {
	cy.get('form').within($form => {
		cy.get('#firstName').should('be.visible');
		cy.get('#firstName').type(student.name);

		cy.get('#lastName').type(student.lastName);

		cy.get('#userEmail').should('be.visible');
		cy.get('#userEmail').type(student.email);

		cy.get('[type="radio"]')
			.first()
			.check({ force: true });

		cy.get('#userNumber').type(student.phone); //phone

		cy.get('#dateOfBirthInput').click();

		cy.get('.react-datepicker__month-select') // month
			.select('February')
			.should('have.value', '1');

		cy.get('.react-datepicker__year-select') //year
			.select('1984')
			.should('have.value', '1984');

		cy.get('.react-datepicker__day--021') //day
			.should('have.text', '21')
			.click({ force: true });

		cy.get('#subjectsInput')
			.type(student.subjects[0])
			.tab();
		cy.get('#subjectsInput')
			.type(student.subjects[1])
			.tab();
		cy.get('#subjectsInput')
			.type(student.subjects[2])
			.tab();

		cy.get('[type="checkbox"]')
			.first()
			.check({ force: true });

		cy.get('#currentAddress').type(student.adress); //add adress

		//select state
		cy.get('#state').type(student.state);
		cy.get('.css-1hwfws3').each(($e1, index, $list) => {
			if ($e1.text() === 'Rajasthan') {
				cy.tab();
			}
		});

		//select city
		cy.get('#city').type(student.city);
		cy.get('.css-1hwfws3').each(($e1, index, $list) => {
			if ($e1.text() === 'Jaipur') {
				cy.tab();
			}
		});
	});

	cy.get('form').submit(); // Submit a form
});
