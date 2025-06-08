const express = require("express")
const dotenv = require("dotenv") //package to get environment variables


dotenv.config(); // load the variables from .env file





const app = express();


app.use(express.json()); // get the request in the json format 


// dotenv package stores all the env varibales into process file
const PORT  = process.env.PORT ||5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})