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
const users_1 = __importDefault(require("./data/users"));
const products_1 = __importDefault(require("./data/products"));
const userModels_1 = __importDefault(require("./models/userModels"));
const productModels_1 = __importDefault(require("./models/productModels"));
const ordersModels_1 = __importDefault(require("./models/ordersModels"));
const db_js_1 = __importDefault(require("./config/db.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ordersModels_1.default.deleteMany();
        yield productModels_1.default.deleteMany();
        yield userModels_1.default.deleteMany();
        const createUsers = yield userModels_1.default.insertMany(users_1.default);
        const adminUser = createUsers[0]._id;
        const sampleProducts = products_1.default.map((product) => (Object.assign(Object.assign({}, product), { user: adminUser })));
        yield productModels_1.default.insertMany(sampleProducts);
        console.log("Data Imported");
        process.exit();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
});
const destroyData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ordersModels_1.default.deleteMany();
        yield productModels_1.default.deleteMany();
        yield userModels_1.default.deleteMany();
        console.log("Data Destroyed!");
        process.exit();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
});
db_js_1.default()
    .then(() => {
    if (process.argv[2] === "-d") {
        destroyData();
    }
    else {
        importData();
    }
})
    .catch((err) => console.log(err));
