const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    job_id: { type: String, required: true, unique: true }, // Unique auto increment
    smp_id :{type:String, required: true},
    batch:{type:String, required:true},
    task:{type:String,required:true},
    start_time:{type:Date, required:true},
    end_time:{type:Date, required:true},

  },
  { collection: "Jobs" }
); // Explicitly reference the collection name

const Jobs = mongoose.model("Jobs", jobSchema, "Jobs");

module.exports = Jobs;