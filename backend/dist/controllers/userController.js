"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = exports.userProfile = exports.userLogin = void 0;
const { validationResult } = require("express-validator");
const userModels_1 = __importDefault(require("../models/userModels"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const sendMail_1 = require("../utils/sendMail");
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const errors = validationResult(req);
        const user = (yield userModels_1.default.findOne({ email }));
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array(),
            });
        }
        if (!user) {
            return res.status(404).json({
                validationErrors: [
                    {
                        value: email,
                        msg: "Email không tìm thấy",
                        param: "email",
                    },
                ],
            });
        }
        if (!(yield user.matchPassword(password))) {
            return res.status(404).json({
                validationErrors: [
                    {
                        value: password,
                        msg: "Password không đúng",
                        param: "password",
                    },
                ],
            });
        }
        return res.status(200).json(Object.assign(Object.assign({}, user._doc), { token: generateToken_1.default(user._id) }));
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.userLogin = userLogin;
const userProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (yield userModels_1.default.findById(req.userId));
        console.log(user);
        res.json(Object.assign({}, user._doc));
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.userProfile = userProfile;
const userRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array(),
            });
        }
        const user = (yield userModels_1.default.create({
            name,
            email,
            password,
        }));
        if (user) {
            sendMail_1.sendWelcomeEmail(email, name);
            return res
                .status(201)
                .json(Object.assign(Object.assign({}, user._doc), { token: generateToken_1.default(user._id) }));
        }
        else {
            res.status(400);
            throw new Error("Invalid User data");
        }
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.userRegister = userRegister;
