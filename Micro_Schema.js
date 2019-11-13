var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var {Micro_Frontend_Schema} = require ("./micro_frontend_schema.js")


var Schema = mongoose.Schema;

var Micro_Schema = new Schema({
  title: { type: String, required: true, unique: true },
  keywords: [{ type: String }],
  desc: { type: String, required: true },
  srch_util: {type:String , text:true},
  rating: { type: Number },
  developer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },  //We will think about this later
  documentation: { type: String },
  code_snippet: { type: String },
  tech_stack: [{ type: String }],
});
const Micro = mongoose.model("Micro_Schema", Micro_Schema);

// var Micro_Frontend_Schema = new Schema({
//   title: { type: String, required: true, unique: true },
//   keywords: [{ type: String }],
//   desc: { type: String, required: true },
//   rating: { type: Number },
//   //developers: [User_Schema],  We will think about this later
//   documentation: { type: String },
//   code_snippet: { type: String },
//   tech_stack: [{ type: String }],
//   mf_image: { type: String } //For now just link in form of a string
// });
// const Micro_Frontend = mongoose.model(
//   "Micro_Frontend_Schema",
//   Micro_Frontend_Schema
// );
//
//
// var Global_Request_Schema = new Schema({
//   Id: {type: Number, required: true, unique: true },
//   title: { type: String },
//   text: { type: String },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },  //will be added after user is implemented
// });
// const Global_Request = mongoose.model(
//   "Global_Request_Schema",
//   Global_Request_Schema
// );

var Individual_Request_Schema_MS = new Schema({
  title: { type: String,required:true,unique:true },
  desc: { type: String ,required:true},
  owner:{ type:String, required: true},
  micro_id: { type:String, required: true },  //will be added after user is implemented
});
const Individual_Request = mongoose.model(
  "Individual_Request_Schema_MS",
  Individual_Request_Schema_MS
);

// var User_Story_Schema = new Schema({
//   desc: { type: String, required: true, unique: true },
//   priority: { type: Number, required: true, unique: false },
//   status: { type: String, required: true, unique: false },
//   onwer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
//   links_to_ms: [Micro_Schema],
//   links_to_mf: [Micro_Frontend_Schema]
// });
// const User_Story = mongoose.model("User_Story_Schema", User_Story_Schema);

var User_Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false, unique: false },
  name: { type: String, required: true, unique: false },
  email:{type:String,required:false,unique:false},
  bookmarks_ms: [Micro_Schema],
  bookmarks_mf: [Micro_Frontend_Schema]
  //we will think about teams later
  //not adding role currently because role is depenedent on team
});
User_Schema.plugin(passportLocalMongoose);
const User = mongoose.model("User_Schema", User_Schema);

module.exports = {
  Micro_Schema: Micro,
  User_Schema: User,
  // User_Story_Schema: User_Story,
  // Micro_Frontend_Schema: Micro_Frontend,
  // Global_Request_Schema:Global_Request,
  Individual_Request_Schema_MS:Individual_Request
};
//I have changed the module exports structure
//so you have to change the import at places where it is used
