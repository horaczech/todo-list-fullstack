"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./routes/api"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    // origin: 'http://localhost:3000'
    origin: '*'
}));
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fullstack TODO app using Express and React.js',
            version: '0.1.0',
            description: '',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html'
            },
            contact: {
                name: 'LogRocket',
                url: 'https://logrocket.com',
                email: 'info@email.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:8000'
            }
        ]
    },
    apis: [path_1.default.join(__dirname, 'routes', '*', '*.js')]
};
const specs = (0, swagger_jsdoc_1.default)(options);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.get(/^(?!(\/v1|\/api-docs)).*/, (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'index.html'));
});
app.use('/v1', api_1.default);
exports.default = app;
