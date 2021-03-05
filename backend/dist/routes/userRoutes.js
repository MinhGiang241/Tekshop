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
const express_1 = __importDefault(require("express"));
const { check, body } = require("express-validator");
const userModels_1 = __importDefault(require("../models/userModels"));
const userController_1 = require("../controllers/userController");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const router = express_1.default.Router();
router.post("/register", [
    check("name").trim().notEmpty().withMessage("Tên không được để trống"),
    check("email")
        .trim()
        .isEmail()
        .withMessage("email không đúng")
        .normalizeEmail()
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const existedUser = yield userModels_1.default.findOne({ email: value });
        if (existedUser) {
            throw new Error("Email đã tồn tại");
        }
        return true;
    })),
    check("password")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Password ít nhất 5 ký tự"),
    check("confirmPassword")
        .trim()
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords không khớp!");
        }
        return true;
    }),
], userController_1.userRegister);
router.post("/login", [
    check("email").trim().isEmail().withMessage("Email không hợp lệ"),
    check("password")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Password ít nhất 5 ký tự"),
], userController_1.userLogin);
router.get("/profile", isAuth_1.default, userController_1.userProfile);
exports.default = router;
