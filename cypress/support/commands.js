/// <reference types ="cypress" />

//this Command complete email
Cypress.Commands.add('completeEmail', email => {
	cy.get('#userEmail').clear();
	cy.get('#userEmail').should('be.visible');
	cy.get('#userEmail').type(email);
});

//this Command complete phone number
Cypress.Commands.add('completePhoneNumber', phone => {
	cy.get('#userNumber').clear();
	cy.get('#userNumber').should('be.visible');
	cy.get('#userNumber').type(phone);
});

//this Command complete first and last names
Cypress.Commands.add('completeFirstAndLastNames', student => {
	cy.get('#firstName').clear();
	cy.get('#firstName').should('be.visible');
	cy.get('#firstName').type(student.name);

	cy.get('#lastName').clear();
	cy.get('#lastName').should('be.visible');
	cy.get('#lastName').type(student.lastName);
});

//this Command add only the requiere data
Cypress.Commands.add('parcialAddStudent', student => {
	cy.get('form').within($form => {
		cy.completeFirstAndLastNames(student);
		cy.completeEmail(student.email);

		cy.contains(`${student.gender}`).click({ force: true });

		cy.completePhoneNumber(student.phone); //phone
	});
});

//this Command complete birthday
Cypress.Commands.add('completeBirthday', student => {
	cy.get('#dateOfBirthInput').click({ force: true });

	//Month
	cy.get('.react-datepicker__month-select')
		.select(student.month - 1)
		.should('have.value', `${student.month - 1}`);

	//Year
	cy.get('.react-datepicker__year-select')
		.select(`${student.year}`)
		.should('have.value', `${student.year}`);

	//Day
	cy.get(`${'.react-datepicker__day--0' + student.day}`)
		.should('have.text', `${student.day}`)
		.click({ force: true });
});

//this Command complete de add student
Cypress.Commands.add('fullStudent', student => {
	cy.parcialAddStudent(student);
	cy.get('form').within($form => {
		cy.completeBirthday(student);

		//Subjects
		cy.get('#subjectsContainer').within($form => {
			cy.get('#subjectsInput').type(student.subjects[0]);
			cy.get('#react-select-2-option-0').click({ force: true });

			cy.get('#subjectsInput').type(student.subjects[1]);
			cy.get('#react-select-2-option-0').click({ force: true });

			cy.get('#subjectsInput').type(student.subjects[2]);
			cy.get('#react-select-2-option-0').click({ force: true });

			cy.get('.subjects-auto-complete__value-container').should('have.text', `${student.subjects[0]}` + `${student.subjects[1]}` + `${student.subjects[2]}`);
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
		cy.get('#currentAddress').type(student.address);

		//Select state
		cy.get('#state > .css-yk16xz-control').click({ force: true });
		cy.get('.css-11unzgr>').each(($e1, index, $list) => {
			if ($e1.text() === student.state) {
				cy.get('.css-11unzgr>')
					.eq(index)
					.click({ force: true });
			}
		});

		//Select city
		cy.get('#city >> .css-1hwfws3').click({ force: true });
		cy.get('.css-11unzgr>').each(($e1, index, $list) => {
			if ($e1.text() === student.city) {
				cy.get('.css-11unzgr>')
					.eq(index)
					.click({ force: true });
			}
		});
	});

	// Submit a form
	cy.get('form').submit();
});

//this Command certifies this user is not submiteable
Cypress.Commands.add('invalidSubmit', () => {
	cy.get('#submit').should('be.visible');
	cy.log("THE DATA IS NOT ENOUGHT OR IT'S WRONG");
});
