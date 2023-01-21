export class Student {
  name
  lastName
  email
  gender
  phone
  day
  month
  year
  subjects
  hobbies
  adress
  state
  city

  constructor(
    name,
    lastName,
    email,
    gender,
    phone,
    day,
    month,
    year,
    subjects,
    hobbies,
    adress,
    state,
    city
  ) {
    this.name = name
    this.lastName = lastName
    this.email = email
    this.gender = gender
    this.phone = phone
    this.day = day
    this.month = month
    this.year = year
    this.subjects = subjects
    this.hobbies = hobbies
    this.adress = adress
    this.state = state
    this.city = city
  }
}
