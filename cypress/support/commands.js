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

		//Phone
		cy.get('#userNumber').type(student.phone);

		cy.get('#dateOfBirthInput').click({ force: true });

		//Month
		cy.get('.react-datepicker__month-select')
			.select('February')
			.should('have.value', '1');

		//Year
		cy.get('.react-datepicker__year-select')
			.select('1984')
			.should('have.value', '1984');

		//Day
		cy.get('.react-datepicker__day--021')
			.should('have.text', '21')
			.click({ force: true });

		//Subjects
		cy.get('#subjectsContainer').within($form => {
			cy.get('#subjectsInput')
				.type(student.subjects[0])
				.tab({ force: true });

			cy.get('#subjectsInput')
				.type(student.subjects[1])
				.tab({ force: true });

			cy.get('#subjectsInput')
				.type(student.subjects[2])
				.tab({ force: true });

			cy.get('.css-12jo7m5').should('have.length', student.subjects.length);
		});

		//Select hobbies
		cy.get(`#${'hobbies-checkbox-' + student.hobbies}`).check({ force: true });

		//Upload picture
		cy.get('#uploadPicture').selectFile({
			contents: Cypress.Buffer.from('/../ixtures/pictures'),
			fileName: 'picture.jpg',
			mimeType: 'text/plain',
			lastModified: Date.now()
		});
		//Address
		cy.get('#currentAddress').type(student.address); //add address

		//Select state
		cy.get('#state > .css-yk16xz-control').click({ force: true });
		cy.get('.css-11unzgr>').each(($e1, index, $list) => {
			if ($e1.text() === student.state) {
				cy.get('.css-11unzgr>')
					.eq(index)
					.click({ force: true });
			}
		});

		cy.get('#city >> .css-1hwfws3').click({ force: true });
		cy.get('.css-11unzgr>').each(($e1, index, $list) => {
			if ($e1.text() === student.city) {
				cy.get('.css-11unzgr>')
					.eq(index)
					.click({ force: true });
			}
		});
	});

	cy.get('form').submit(); // Submit a form
});

Cypress.Commands.add('parcialComplete', student => {
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
	});

	cy.get('form').submit();
});

Cypress.Commands.add('invalidSubmit', () => {
	cy.get('#submit').should('be.visible');
	cy.log("THE DATA IS NOT ENOUGHT OR IT'S WRONG");
});
