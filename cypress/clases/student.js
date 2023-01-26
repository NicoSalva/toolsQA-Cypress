import { faker } from '@faker-js/faker';

const randomName = faker.name.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

export class Student {
	name;
	lastName;
	email;
	gender;
	phone;
	day;
	month;
	year;
	subjects;
	hobbies;
	address;
	state;
	city;
	constructor({ name, lastName, email, gender, phone, day, month, year, subjects, hobbies, address, state, city }) {
		this.name = name;
		this.lastName = lastName;
		this.email = email;
		this.gender = gender;
		this.phone = phone;
		this.day = day;
		this.month = month;
		this.year = year;
		this.subjects = subjects;
		this.hobbies = hobbies;
		this.address = address;
		this.state = state;
		this.city = city;
	}

	getMonth(Student) {
		if (this.month == '2') {
			return 'February';
		}

		if (this.month == '1') {
			return 'January';
		}
	}
}

export const defaultStudent = new Student({
	name: faker.name.firstName(),
	lastName: faker.name.lastName(),
	email: faker.internet.email(),
	gender: 'Male',
	phone: faker.phone.number('##########'),
	day: '21',
	month: '2',
	year: '1984',
	subjects: ['Maths', 'Chemistry', 'English'],
	hobbies: faker.random.numeric(1, { bannedDigits: ['4', '5', '6', '7', '8', '9'] }),
	address: faker.address.streetAddress(),
	state: 'Rajasthan',
	city: 'Jaipur'
});
