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
	adress;
	state;
	city;
	constructor({ name, lastName, email, gender, phone, day, month, year, subjects, hobbies, adress, state, city }) {
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
		this.adress = adress;
		this.state = state;
		this.city = city;
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
	hobbies: 'Sports',
	adress: faker.address.streetAddress(),
	state: 'Rajasthan',
	city: 'Jaipur'
});
