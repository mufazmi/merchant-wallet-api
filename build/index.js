"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_handler_1 = __importDefault(require("./utils/error-handler"));
const error_middleware_1 = __importDefault(require("./middlewares/error-middleware"));
const cookieParser = require('cookie-parser');
dotenv_1.default.config();
const init_1 = __importDefault(require("./configs/db/init"));
//DB Init
(0, init_1.default)();
const PORT = Number(process.env.PORT || 3000);
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Cookie Parser Middleware
// app.use(cookieParser);
//Main Route
const routes_1 = __importDefault(require("./routes"));
app.use('/api/v1', routes_1.default);
// Not Found Middleware
app.use((req, res, next) => {
    return next(error_handler_1.default.notFound());
});
//Error Middleware
app.use(error_middleware_1.default);
//Listning Server
app.listen(PORT, () => console.log(`SERVER IS LISTING ON ${PORT}`));
