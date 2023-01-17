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
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
// const { loadPlanetsData } = require("./models/planets.model");
const PORT = process.env.PORT || 8000;
const MONGO_URL = 'mongodb+srv://nasa-user:7Z9RFMCvAzWQB9h7@cluster0.raw3ykl.mongodb.net/?retryWrites=true&w=majority';
const server = http_1.default.createServer(app_1.default);
// mongoose.connection.once("open", () => {
//   console.log("MongoDB connection ready!");
// });
//
// mongoose.connection.on("error", (error) => {
//   console.log(error);
// });
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // await mongoose.connect(MONGO_URL);
        // await loadPlanetsData();
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}...`);
        });
    });
}
startServer();
