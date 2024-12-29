const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const options = {

    definition:{
        openapi:"3.0.0",
        info:{
            title: "API de gestión de Tareas",
            version: "1.0.0",
            description: "API para gestionar tareas en una aplicación express"
        },
        servers:[
            {
                url: "http://localhost:3000/"
            }
        ],
        components:{
            schemas:{
                Task:{
                    type:"object",
                    required: ['title','description'],
                    properties:{
                        id:{
                            type:"integer",
                            example:1
                        },
                        title:{
                            type:"string",
                            example:"Titulo 1"
                        },
                        description:{
                            type:"string",
                            example:"descripcion"
                        }
                    }
                },
                setTask:{
                    type:"object",
                    required: ['title','description'],
                    properties:{
                        title:{
                            type:"string",
                            example:"Titulo 1"
                        },
                        description:{
                            type:"string",
                            example:"descripcion"
                        }
                    }
                }
            }
        }
    },
    apis:["./src/routes/*.js"]
}

//Son todas las opciones que encuentra en routes
const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerDocs = (app) =>{
    app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec));
    console.log("Swagger docs disponibles en la ruta raiz/api-docs");
}

module.exports = setupSwaggerDocs;