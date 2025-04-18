"use strict";
const express = require("express");
const router = express.Router();

const jokesController = require("../controllers/jokes.controller");

router.get("/categories",jokesController.getCategories);
router.get("/random", jokesController.getRandom);
router.get("/joke/:category", jokesController.getByCategory);
router.post("/joke/add", jokesController.createNew);
router.get('/search', jokesController.getAllByOneAttribute);

module.exports = router;