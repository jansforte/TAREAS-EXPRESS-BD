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

/**
 * @swagger
 * /tasks:
 *  get:
 *   sumary: Obtiene todas las tareas
 *   responses: 
 *    200:
 *     description: Lista de todas las tareas
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items: 
 *         $ref: '#/components/schemas/Task'
 */

router.get("/",taskController.getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *   sumary: Obtiene tarea por Id
 *   parameters:
 *    - name: id
 *      in: path
 *      description: ID de la tarea a retornar
 *      required: true
 *      schema:
 *       type: integer
 *   responses: 
 *    200:
 *     description: Lista de la tarea por Id
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items: 
 *         $ref: '#/components/schemas/Task'
 *    404:
 *     description: Tarea no encontrada
 */
router.get("/:id",validateTaskId,taskController.getTaksById);

/**
 * @swagger
 * /tasks:
 *  post:
 *   sumary: Registro de tareas
 *   description: Registro de tareas en la base de datos
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/setTask'
 *   responses: 
 *    200:
 *     description: Registro de tareas en la base de datos
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items: 
 *         $ref: '#/components/schemas/Task'
 *    400:
 *     description: Error de validación
 */
router.post("/",validateTask,taskController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *  put:
 *   sumary: Actualizar tareas
 *   description: Actualización de tareas en la base de datos
 *   parameters:
 *    - name: id
 *      in: path
 *      description: id de la tarea
 *      required: true
 *      schema:
 *       type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/setTask'
 *   responses: 
 *    200:
 *     description: Actualización de tareas en la base de datos
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items: 
 *         $ref: '#/components/schemas/Task'
 *    400:
 *     description: Error de validación
 *    404:
 *     description: Tarea no encontrada
 */
router.put("/:id",[validateTaskId,validateTask],taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *  delete:
 *   sumary: Eliminar Tarea
 *   description: Eliminar Tarea
 *   parameters:
 *    - name: id
 *      in: path
 *      description: id de la tarea
 *      required: true
 *      schema:
 *       type: string
 *   responses: 
 *    200:
 *     description: Tarea eliminada
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items: 
 *         $ref: '#/components/schemas/Task'
 *    404:
 *     description: Tarea no encontrada
 */
router.delete("/:id",validateTaskId,taskController.deleteTask);

module.exports = router;