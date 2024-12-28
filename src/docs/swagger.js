const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const options = {

    apis:["./src/routes/*.js"]
}

//Son todas las opciones que encuentra en routes
const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerDocs = (app) =>{
    app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec));
    console.log("Swagger docs disponibles en la ruta raiz/api-docs");
}

module.exports = setupSwaggerDocs;