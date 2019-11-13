var express = require("express");
var mf = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// var {Individual_Request_Schema}=require("./Micro_Schema.js");

mf.use(bodyParser.urlencoded({ extended: true }));
mf.use(bodyParser.json());
mf.use(cors());
// mf.use(bodyParser.urlencoded({ extended: true }));
// mf.use(cors());
// mf.use(bodyParser.json());
// mf.use(express.static("public"));
// mf.set("view engine","ejs");
//var Micro_Schema = require("./Micro_Schema.js")
var {Micro_Frontend} = require ("./micro_frontend_schema.js")
var {Individual_Request_Schema_MF} = require ("./micro_frontend_schema.js")
var {Micro_Schema} = require ("./Micro_Schema.js")
//var Micro_Frontend=Micro_Schema.Micro_Frontend_Schema

mongoose.connect(
  "mongodb+srv://micro:qwerty123@cluster0-bmsv0.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mf.post("/micr-fr",(req,res)=>{
    Micro_Frontend.find({},(err,all_micro_front_end)=>{
        if(err){
            console.log("Error:"+err);
            res.send({status:false,error:err})
        }
        else{
            console.log("Obj sent sucess");
            res.send({micros:all_micro_front_end});
        }
    });
  })
  mf.post("/retrieve_one", (req, res) => {
    let micro_id = req.body.micro_id;
    console.log("MS Id : " + req.body.micro_id)
    Micro_Frontend.findById(micro_id, (err, one_micro) => {
      if (err) {
        console.log("Erroe:" + err);
        res.send({status:false,error:err})
      } else {
        console.log(one_micro);
        res.send({status:true,micro:one_micro});
      }
    });
  });

mf.get("/add_micro_frontend",(req,res)=>{
    res.render("add_micro_frontend.ejs",{});
  })
mf.post("/add_micro_frontend", (req,res) => {
    let title = req.body.title;
    let desc = req.body.desc;
    let keywords = req.body.keywords;
    let srch_util= title + " " + keywords + " " + desc;
    //let keywords=keywords_string.split(",")
    let documentation = req.body.documentation;
    let code_snippet = req.body.code_snippet;
    let tech_stack_string = req.body.tech_stack;
    let tech_stack=tech_stack_string.split(",")
    let mf_image = req.body.mf_image;
    // let rating = req.body.rating;
    Micro_Frontend.create({title: title,desc: desc,keywords: keywords,documentation: documentation,
        code_snippet: code_snippet,tech_stack: tech_stack,mf_image: mf_image,srch_util:srch_util},function(err,micro){
      if(err){
        console.log(err);
        res.send({status:false,error:err})
      }else {
        console.log(micro);
        console.log("Microfrontend saved successfully")
        res.send({status:true});
      }
    })
});

mf.use("/srch", (req, res) => {
  if(req.body.dropdown_value=="ms"){
    Micro_Schema.find(
      { $text: { $search: req.body.search_input } },//pass the user search query
      { score: { $meta: "textScore" } }
  ).sort( { score: { $meta: "textScore" } } )
  .then((obj) =>
      {
        console.log(obj)
          res.json(obj);
      }
  )
  }
  else{
    Micro_Frontend.find(
        { $text: { $search: req.body.search_input } },//pass the user search query
        { score: { $meta: "textScore" } }
    ).sort( { score: { $meta: "textScore" } } )
    .then((obj) =>
        {
          console.log(obj)
            res.json(obj);
        }
    )
    }
});


mf.use("/retrieve_all", (req,res) => {
    Micro_Frontend.find({},(err,all_micro_front_end)=>{
        if(err){
            console.log("Erroe:"+err);
        }
        else{
            res.json(all_micro_front_end);
            console.log("Obj sent sucess");
        }
    });
});

mf.use("/delete_one/:id", (req,res) => {
  Micro_Frontend.findByIdAndRemove(req.params.id,(err)=>{
      if(err){
          console.log("Error:"+err);
          console.log({status:false,erro:err})
      }
      else{
          console.log("Obj delete sucess");
          res.send({status:true})
      }
  })
});

mf.get("/get_update_info_mf/:id", (req, res) => {
    Micro_Frontend.findById(req.params.id, (err, one_mf) => {
      if (err) {
        console.log("Erroe:" + err);
      } else {
        console.log("Here in get" + req.params.id);
        console.log("Herein get" + one_mf.title);

        console.log("Herein get" + one_mf.desc);
        res.render("update_mf.ejs", { one_mf: one_mf });
        console.log("Micro_mf sent for update sucess");
        //return one_mf
      }
    });
  });
  mf.post("/update_mf/:id", (req, res) => {
    console.log("Here" + req.params.id);
    console.log("Here" + req.body.title);
    console.log("Here" + req.body.documentation);
    console.log("Here body" + toString(req.body));
    let mf_id=req.params.id;
    let title = req.body.title;
    let desc = req.body.desc;
    let keywords = req.body.keywords;
    //let keywords=keywords_string.split(",")
    let srch_util= title + keywords + desc;
    let documentation = req.body.documentation;
    let code_snippet = req.body.code_snippet;
    let tech_stack_string = req.body.tech_stack;
    let tech_stack=tech_stack_string.split(",")
    let mf_image = req.body.mf_image;
    // let rating = req.body.rating;
    //console.log("Title is" + title);
    Micro_Frontend.findByIdAndUpdate(
        mf_id,
      {
        $set: {
            title:title,
            desc:desc,
            keywords:keywords,
            documentation:documentation,
            code_snippet:code_snippet,
            tech_stack:tech_stack,
            mf_image:mf_image,
            // rating:rating,
            srch_util:srch_util
        }
      },
      err => {
        if (err){
         console.log("Err" + err);
        res.send({status:false,error:err})
      }else {
          console.log("Obj updated succesfully");
          res.send({status:true})
        }
      }
    );
  });


  mf.get("/insert_two", (req, res) => {
    Micro_Frontend.create({
      title:"Flight Book",
      keywords:"Travel Holiday",
      desc: "This is a Micro-frontend for flights. Also handles cheap airline ticket and check in baggage. Also handles ticket booking and payment for buses",
    }, (err,obj)=> {
      if(err){
        console.log(JSON.stringify(err))
      }
      else {
        console.log(obj);
        console.log("Obj saved successfully")
        // res.redirect("/micr-fr");
      }
    })
  });
//----------------------------------------

mf.post("/add_individual_request", (req, res) => {
  let title = req.body.title;
  let desc = req.body.desc;
  let owner = req.body.owner;
  let micro_id=req.body.mf_id
  
  
  Individual_Request_Schema_MF.create({title:title , desc:desc,owner:owner,micro_id:micro_id},function(err, micro) {
      if (err) {
        console.log(err);
        res.send({status:false,error:err})
      } else {
        console.log(micro);
        console.log("IR saved successfully");
        res.send({status:true});
      }
    }
  );
});

mf.use("/retrieve_individual_requests", (req, res) => {
  let micro_id=req.body.mf_id
  console.log("mfid "+micro_id)
  Individual_Request_Schema_MF.find({micro_id:micro_id}, (err, all_ir) => {
    if (err) {
      console.log("Erroe:" + err);
    } else {
      res.json(all_ir);
      console.log("da"+JSON.stringify(all_ir))
      console.log("Obj sent sucess");
    }
  });
});




//module.exports = mf
mf.listen(process.env.PORT || 5002, () => {
  console.log("listening at port: 5002");
});
