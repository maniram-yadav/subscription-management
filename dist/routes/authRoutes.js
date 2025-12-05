"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.get('/profile', auth_1.authMiddleware, authController_1.getProfile);
// Admin / user management endpoints (require auth)
router.get('/users', auth_1.authMiddleware, authController_1.getAllUsers);
router.get('/users/:id', auth_1.authMiddleware, authController_1.getUserById);
router.put('/users/:id', auth_1.authMiddleware, authController_1.updateUser);
// Subscription endpoints (require auth)
router.post('/subscriptions', auth_1.authMiddleware, authController_1.createSubscription);
router.get('/subscriptions', auth_1.authMiddleware, authController_1.getUserSubscriptions);
router.get('/subscriptions/:id', auth_1.authMiddleware, authController_1.getSubscription);
router.put('/subscriptions/:id', auth_1.authMiddleware, authController_1.updateSubscription);
router.delete('/subscriptions/:id', auth_1.authMiddleware, authController_1.deleteSubscription);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map