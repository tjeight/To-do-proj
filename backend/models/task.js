const mongoose = require("mongoose")



const TaskSchema = mongoose.Schema({
    task: { type: String, required: true },
    date: { type: Date, required: true }
    

});



module.exports = mongoose.model("TaskList", TaskSchema);