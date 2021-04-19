require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/index.route");

app.use(express.json());

app.all("/healthcheck", (req, res) => res.send("Server is running!"));

app.use(routes);

app.listen(3000, () => {
  console.log(`app listening at PORT: ${3000}`);
});
