const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getAllTasks,
  getAllUsers,
} = require("../controllers/task.controller");

const {
  taskValidation,
  taskUpdateValidation,
} = require("../validators/task.validator");

const validate = require("../middleware/validate.middleware");

const authorizeRoles = require("../middleware/role.middleware");
router.post("/", auth, taskValidation, validate, createTask);
router.get("/", auth, getTasks);
router.get("/allTasks", auth, authorizeRoles("admin"), getAllTasks);
router.get("/allUsers", auth, authorizeRoles("admin"), getAllUsers);
router.put("/:id", auth, taskUpdateValidation, validate, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
