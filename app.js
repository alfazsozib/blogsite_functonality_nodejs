//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const req = require("express/lib/request");
const res = require("express/lib/response");
const lodash = require("lodash");
const { lowerCase, pad, padEnd } = require("lodash");
const mongoose = require('mongoose');
const { MongoServerClosedError } = require("mongodb")

// CONNECT TO THE SERVER
mongoose.connect("mongodb://localhost:27017/test-siteDB");

const postSchema = new mongoose.Schema({
  title:String,
  body:String
});

const Post = mongoose.model('Post',postSchema);

// POST ELEMENTS
const homeStartingContent = "Lacuss vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// CREATE ENGINE WITH EXPRESS 
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// let postContainer = [];

// PAGES AND SECTIONS 
app.get("/",(req,res)=>{
  Post.find({}, function(req,posts){
    res.render("home",{homeStartingContent:homeStartingContent,
      posts:posts
    });
  });
});

// DATABASE SCHEMA 

app.get("/compose",(req,res)=>{
  res.render("compose");

});

app.post('/compose',(req,res)=>{
  const content = new Post({
    title: req.body.postTitle,
    body: req.body.postBody
  })
  content.save()
  console.log('Updated')
  res.redirect('/')

});



// GET POST NAME AND NEW PAGE FOR EACH POSTS

app.get("/posts/:postId",(req,res)=>{
  
  const reqPostId = req.params.postId
  console.log(reqPostId)
  Post.findOne({_id:reqPostId},(err,pt)=>{
    console.log(pt)
    res.render("post",{Title:pt.title, Body:pt.body})
    });
  });
  



app.get('/about',(req,res)=>{
  res.render('about',{aboutContent:aboutContent})
})
app.get('/contact',(req,res)=>{
  res.render('contact',{contactContent:contactContent})
})


// LISTEN TO THE SERVER 
app.listen(3000,()=>{
  console.log('Server is working on 3000')
})