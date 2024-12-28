const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const morgan = require("morgan");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");
const { default: helmet } = require("helmet");
const setupSwaggerDocs = require("./docs/swagger");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet())//helmet para evitar ataques
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/tasks",taskRoutes);//asignación de rutas
app.use(errorHandler);//middlewar o controlador para manejar errores
setupSwaggerDocs(app);//Se configuró swagger

app.listen(PORT,()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})