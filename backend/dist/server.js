"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./config/db"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const errorControllers_1 = require("./controllers/errorControllers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const POST = process.env.PORT || 5000;
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
app.get("/", (req, res, next) => {
    res.send(`API is running on ${process.env.POST}`);
});
app.use("/api/products", productRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.use(errorControllers_1.notFound);
app.use(((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    const stack = err.stack;
    res.status(status).json({ message, stack });
}));
db_1.default()
    .then(() => {
    app.listen(POST, () => {
        console.log(`server is running in ${process.env.NODE_ENV} up on ${process.env.POST}`);
        console.log(process.env.MONGO_USER);
    });
})
    .catch((err) => {
    console.log(err);
});
