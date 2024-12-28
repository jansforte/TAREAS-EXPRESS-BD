const taskModel = require("../models/taskModel");
const {validationResult} = require("express-validator");

const getAllTasks = async(req,res,next)=>{
    
    try {
        const tasks = await taskModel.getTask();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

const getTaksById = async(req,res,next)=>{
    filtroErrores(req,res);
    const taskId = req.params.id;
    try {
        const tasks = await taskModel.getTaskById(taskId);
        if(!tasks){
            return res.status(404).json({error:"Tarea no encontrada"});
        }
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

const createTask = async(req,res,next)=>{
    filtroErrores(req,res);
    const peticion = req.body;
    try {
        const tasks = await taskModel.createTask(peticion);
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

const updateTask = async(req,res,next)=>{
    filtroErrores(req,res);
    const taskId = req.params.id;
    const peticion = req.body;
    try {
        const tasks = await taskModel.updateTask(taskId,peticion);
        if(!tasks){
            return res.status(404).json({error:"Tarea no encontrada"});
        }
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

const deleteTask = async(req,res,next)=>{
    filtroErrores(req,res);
    const taskId = req.params.id;
    try {
        const tasks = await taskModel.deleteTask(taskId);
        if(!tasks){
            return res.status(404).json({error:"Tarea no encontrada"});
        }
        res.json({message:"Tarea eliminada",tarea_eliminada:tasks});
    } catch (error) {
        next(error);
    }
}

function filtroErrores(req,res){
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({error:errores.array()});
    }
}

module.exports = {
    getAllTasks, getTaksById, createTask,
    updateTask, deleteTask
}