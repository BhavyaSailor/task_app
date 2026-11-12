const express = require("express");

const router = express.Router();

const {
  register,
  login,
  profile,
  registerAdmin,
  updateUserRole,
  bootstrapFirstAdmin,
} = require("../controllers/auth.controller");

const { registerValidation, loginValidation } = require("../validators/auth.validator");
const validate = require("../middleware/validate.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register User
 *     tags:
 *       - Authentication
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", registerValidation, validate, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", loginValidation, validate, login);
router.post("/bootstrap-admin", bootstrapFirstAdmin);
router.post(
  "/register-admin",
  authMiddleware,
  authorizeRoles("admin"),
  registerAdmin,
);
router.put(
  "/users/:id/role",
  authMiddleware,
  authorizeRoles("admin"),
  updateUserRole,
);
router.get("/profile", authMiddleware, profile);
router.get("/admin", authMiddleware, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

module.exports = router;
