"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscription = exports.updateSubscription = exports.getSubscription = exports.getUserSubscriptions = exports.createSubscription = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.getProfile = exports.login = exports.register = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const queries_1 = require("../db/queries");
const register = async (req, res) => {
    try {
        const { username, email, password, first_name, last_name } = req.body;
        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Check if user exists
        const existingUser = await connection_1.default.query(queries_1.USER_QUERIES.CHECK_USER_EXISTS, [username, email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create user
        const result = await connection_1.default.query(queries_1.USER_QUERIES.CREATE_USER, [username, email, hashedPassword, first_name || null, last_name || null]);
        const user = result.rows[0];
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.status(201).json({
            message: 'User registered successfully',
            user,
            token,
        });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Validation
        if (!username || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Find user
        const result = await connection_1.default.query(queries_1.USER_QUERIES.FIND_USER_BY_USERNAME, [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = result.rows[0];
        // Verify password
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
            },
            token,
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const result = await connection_1.default.query(queries_1.USER_QUERIES.FIND_USER_BY_ID, [req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            user: result.rows[0],
        });
    }
    catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getProfile = getProfile;
// Get all users (admin / authenticated)
const getAllUsers = async (req, res) => {
    try {
        const result = await connection_1.default.query(queries_1.USER_QUERIES.FIND_ALL_USERS);
        res.json({ users: result.rows });
    }
    catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllUsers = getAllUsers;
// Get single user by id
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await connection_1.default.query(queries_1.USER_QUERIES.FIND_USER_BY_ID, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user: result.rows[0] });
    }
    catch (error) {
        console.error('Get user by id error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserById = getUserById;
// Update user (without password)
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, first_name, last_name } = req.body;
        // optional: validate inputs
        const result = await connection_1.default.query(queries_1.USER_QUERIES.UPDATE_USER, [
            username,
            email,
            first_name || null,
            last_name || null,
            id,
        ]);
        const user = result.rows[0];
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated', user });
    }
    catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateUser = updateUser;
// Subscription endpoints
const createSubscription = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { name, amount, due_date, web_url, description, status } = req.body;
        // Validation
        if (!name || !amount || !due_date) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const result = await connection_1.default.query(queries_1.SUBSCRIPTION_QUERIES.CREATE_SUBSCRIPTION, [
            req.user.id,
            name,
            amount,
            due_date,
            web_url || null,
            description || null,
            status || 'active',
        ]);
        res.status(201).json({ message: 'Subscription created', subscription: result.rows[0] });
    }
    catch (error) {
        console.error('Create subscription error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createSubscription = createSubscription;
const getUserSubscriptions = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const result = await connection_1.default.query(queries_1.SUBSCRIPTION_QUERIES.GET_USER_SUBSCRIPTIONS, [req.user.id]);
        res.json({ subscriptions: result.rows });
    }
    catch (error) {
        console.error('Get subscriptions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserSubscriptions = getUserSubscriptions;
const getSubscription = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { id } = req.params;
        const result = await connection_1.default.query(queries_1.SUBSCRIPTION_QUERIES.GET_SUBSCRIPTION_BY_ID, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        const subscription = result.rows[0];
        if (subscription.user_id !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        res.json({ subscription });
    }
    catch (error) {
        console.error('Get subscription error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getSubscription = getSubscription;
const updateSubscription = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { id } = req.params;
        const { name, amount, due_date, web_url, description, status } = req.body;
        const result = await connection_1.default.query(queries_1.SUBSCRIPTION_QUERIES.UPDATE_SUBSCRIPTION, [
            name,
            amount,
            due_date,
            web_url || null,
            description || null,
            status || 'active',
            id,
            req.user.id,
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        res.json({ message: 'Subscription updated', subscription: result.rows[0] });
    }
    catch (error) {
        console.error('Update subscription error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateSubscription = updateSubscription;
const deleteSubscription = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { id } = req.params;
        await connection_1.default.query(queries_1.SUBSCRIPTION_QUERIES.DELETE_SUBSCRIPTION, [id, req.user.id]);
        res.json({ message: 'Subscription deleted' });
    }
    catch (error) {
        console.error('Delete subscription error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteSubscription = deleteSubscription;
//# sourceMappingURL=authController.js.map