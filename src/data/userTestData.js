const testUser = {
  _id: "a12345678901234567890123",
  username: "User1",
  fullName: "FullName1",
  city: "City1",
  state: "State1",
  password: "Pass1",
  createdAt: "Date1",
  updatedAt: "Date1"
}

const testUser2 = {
  _id: "b12345678901234567890123",
  username: "User2",
  fullName: "FullName2",
  city: "City2",
  state: "State2",
  password: "Pass2",
  createdAt: "Date2",
  updatedAt: "Date2"
}

const testUsers = [
  {
    _id: "a12345678901234567890123",
    username: "User1",
    fullName: "FullName1",
    city: "City1",
    state: "State1",
    password: "Pass1",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "b12345678901234567890123",
    username: "User2",
    fullName: "FullName2",
    city: "City2",
    state: "State2",
    password: "Pass2",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "c12345678901234567890123",
    username: "User3",
    fullName: "FullName3",
    city: "City3",
    state: "State3",
    password: "Pass3",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const testImageCount = [2, 4, 8];

export { testUser, testUser2, testUsers, testImageCount };