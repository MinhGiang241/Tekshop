"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users = [
    {
        name: "Admin",
        email: "admin@example.com",
        password: bcryptjs_1.default.hashSync("123456", 12),
        isAdmin: true,
    },
    {
        name: "Giang",
        email: "minhgiang241@gmail.com",
        password: bcryptjs_1.default.hashSync("123456", 12),
    },
    {
        name: "Vinh",
        email: "thaivinhnd@gmail.com",
        password: bcryptjs_1.default.hashSync("123456", 12),
    },
];
exports.default = users;
