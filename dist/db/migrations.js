"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const connection_1 = __importDefault(require("./connection"));
const queries_1 = require("./queries");
const initializeDatabase = async () => {
    try {
        await connection_1.default.query(queries_1.USER_QUERIES.CREATE_USERS_TABLE);
        console.log('Users table created/verified');
        await connection_1.default.query(queries_1.SUBSCRIPTION_QUERIES.CREATE_SUBSCRIPTIONS_TABLE);
        console.log('Subscriptions table created/verified');
        console.log('Database initialized successfully');
    }
    catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};
exports.initializeDatabase = initializeDatabase;
//# sourceMappingURL=migrations.js.map