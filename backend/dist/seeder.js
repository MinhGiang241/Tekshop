"use strict";
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
const importData = async () => {
    try {
        await ordersModels_1.default.deleteMany();
        await productModels_1.default.deleteMany();
        await userModels_1.default.deleteMany();
        const createUsers = await userModels_1.default.insertMany(users_1.default);
        const adminUser = createUsers[0]._id;
        const sampleProducts = products_1.default.map((product) => ({
            ...product,
            user: adminUser,
        }));
        await productModels_1.default.insertMany(sampleProducts);
        console.log("Data Imported");
        process.exit();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
const destroyData = async () => {
    try {
        await ordersModels_1.default.deleteMany();
        await productModels_1.default.deleteMany();
        await userModels_1.default.deleteMany();
        console.log("Data Destroyed!");
        process.exit();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
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
