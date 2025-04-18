"use strict";
const model = require("../models/jokes.model");

function getByCategory(req, res) {
  try{
    let jokesList = model.getByCategory(req.params.category);
    res.render("jokes", { jokesList: jokesList, title: "Jokes By Categories" });
  }catch(err){
    console.error("Error fetching jokes by category:",err.message);
  }
}
function getCategories(req, res) {
  try{
    let categoriesList = model.getCategories();
    res.render("categories", { title: "Joke Categories", categoriesList: categoriesList });
  }catch(err){
    console.error("Error fetching categories:",err.message);
  }
}
function getRandom(req, res) {
  try{
    let joke = model.getRandom();
    res.render("single-joke", { title: "Random Joke", joke: joke });
  }catch(err){
    console.error("Error fetching random joke:",err.message);
  }
}
function createNew(req, res, next){
  let setup = req.body.setup;
  let delivery = req.body.delivery;
  let category_id = req.body.category_id;
  if(setup && delivery && category_id){
    let params = [setup, delivery, category_id];
    try{
      model.createNew(params);
      res.render("jokes",{jokesList:model.getByCategory(category_id), title:"Jokes By Categories"});
    }catch(err){
      console.error("Error creating new joke:",err.message);
      next(err);
    }
  }
}
function getAllByOneAttribute(req, res, next) {
  let attribute = req.query.attribute;
  let value = req.query.value;
  if (attribute && value) {
    try {
      let jokesList = model.getAllByOneAttribute(attribute, value); 
      res.render("jokes", { jokesList: jokesList, title: "Jokes" });
    } catch (err) {
      console.error("Error while getting products: ", err.message);
      next(err);
    }
  }
  else {
    res.status(400).send("Invalid Request");
  }
}


module.exports ={
  getByCategory,
  getCategories,
  getRandom,
  createNew,
  getAllByOneAttribute
};