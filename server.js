const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
// swaggerUI
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const { readdirSync } = require("fs");
require("dotenv").config();




// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

const message = {"Status" : "App is Working"}
app.get("/api/trial", (req,res)=>{
res.json(message)
})




// routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));
// crmroutes
//readdirSync("./Crm/Routes").map((r)=>app.use("/crm", require("./Crm/Routes/" + r)))

// swaggerroute
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
