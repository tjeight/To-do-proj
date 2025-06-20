const express = require("express");
const dotenv = require("dotenv"); //package to get environment variables
const connectDB = require("./config/database"); //
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors"); //

const app = express();
app.use(cors());

dotenv.config(); // load the variables from .env file

connectDB();

app.use(express.json()); // get the request in the json format
app.use("/api/tasks", taskRoutes);
// dotenv package stores all the env varibales into process file
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
