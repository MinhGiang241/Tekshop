import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 12),
    isAdmin: true,
  },
  {
    name: "Giang",
    email: "minhgiang241@gmail.com",
    password: bcrypt.hashSync("123456", 12),
  },
  {
    name: "Vinh",
    email: "thaivinhnd@gmail.com",
    password: bcrypt.hashSync("123456", 12),
  },
];

export default users;
