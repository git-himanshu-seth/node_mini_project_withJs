export class UserModal {
  constructor(id, name, email, typeOfUser) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.typeOfUser = typeOfUser;
  }
  static addUser(name, email, typeOfUser) {
    const id =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    const newUser = new UserModal(id, name, email, typeOfUser);
    users.push(newUser);
    return newUser;
  }
  static verifyUser(email, password) {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    return user ? user : null;
  }

  static getAllUsers() {
    return users;
  }
}
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    typeOfUser: "admin",
    password: "password123",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    typeOfUser: "user",
    password: "password123",
  },
];
