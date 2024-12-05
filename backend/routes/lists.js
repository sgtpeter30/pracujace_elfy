const express = require("express");
const router = express.Router();
const Person = require('../models/person');

// get full list
router.get('/api/list', (req, res, next) => {
  Person.find()
    .then((result)=>{
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
    });
});
// get partial list
router.get('/api/list-person', (req, res, next) => {
  console.log('get list person');
  Person.find({}, 'person')
    .then((result)=>{
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;