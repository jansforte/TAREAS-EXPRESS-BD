const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();
const {body,param,validationResult} = require("express-validator");

const validateTask = [
    body("title")
        .isLength({min:1}).withMessage("title es un campo requerido")
        .isString().withMessage("title es un campo string")
        .trim().escape(),
    body("description")
        .optional()
        .isString().withMessage("description es un string")
        .trim().escape()
]

const validateTaskId = [
    param("id")
        .isInt({gt:0}).withMessage("id debe ser número entero mayor que cero")
        .toInt()
]

router.get("/",taskController.getAllTasks);
router.get("/:id",validateTaskId,taskController.getTaksById);
router.post("/",validateTask,taskController.createTask);
router.put("/:id",[validateTaskId,validateTask],taskController.updateTask);
router.delete("/:id",validateTaskId,taskController.deleteTask);

module.exports = router;