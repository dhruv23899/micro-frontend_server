var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Micro_Frontend_Schema = new Schema({
  title: { type: String, required: true, unique: true },
  keywords: { type: String },
  desc: { type: String, required: true },
  rating: { type: Number },
  srch_util: {type: String, text: true, /*default: ""title + keywords + desc*/},
  developer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },  //We will think about this later
  documentation: { type: String },
  code_snippet: { type: String },
  tech_stack: [{ type: String }],
  mf_image: { type: String } //For now just link in form of a string
});

var Individual_Request_Schema_MF = new Schema({
  title: { type: String,required:true,unique:true },
  desc: { type: String ,required:true},
  owner:{ type:String, required: true},
  micro_id: { type:String, required: true },  //will be added after user is implemented
});
const Individual_Request = mongoose.model(
  "Individual_Request_Schema_MF",
  Individual_Request_Schema_MF
);

const Micro_Frontend = mongoose.model(
  "Micro_Frontend_Schema",
  Micro_Frontend_Schema
);

module.exports = {
  Micro_Frontend: Micro_Frontend,
  Micro_Frontend_Schema: Micro_Frontend_Schema,
  Individual_Request_Schema_MF:Individual_Request
};
