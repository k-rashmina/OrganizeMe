const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbconfig = require("./db-config");
const routes = require("./routes");

//initialization and middleware
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use("/api", routes);
app.get("/test", (req, res) => res.send("Hello World!"));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  dbconfig();
});
