const pg = require("../config/db");

//function para obtener tareas
const getTask = async()=>{
    try {
        const res = await pg.query("SELECT * FROM tareas");
        return res.rows;
    } catch (error) {
        throw error;
    }
}

//function para obtener tareas by ID
const getTaskById = async(id)=>{
    try {
        const res = await pg.query("SELECT * FROM tareas WHERE id = $1",[id]);
        return res.rows[0];
    } catch (error) {
        throw error;
    }
}

//function para crear tareas
const createTask = async(task)=>{
    const {title,description} = task;
    try {
        const res = await pg.query("INSERT INTO tareas (title,description) VALUES ($1,$2) RETURNING *",[title,description]);
        return res.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//function para actualizar tareas
const updateTask = async(id, task)=>{
    const {title,description} = task;
    try {
        const res = await pg.query("UPDATE tareas SET title = $1, description = $2 WHERE id = $3 RETURNING *",[title,description,id]);
        return res.rows[0];
    } catch (error) {
        throw error;
    }
}

//function para eliminar tareas
const deleteTask = async(id)=>{
    try {
        const res = await pg.query("DELETE FROM tareas WHERE id = $1 RETURNING *",[id]);
        return res.rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getTask, getTaskById, createTask, updateTask, deleteTask
}