const express = require("express");
const router = express.Router();
const Person = require('../models/person');

// get single letter
router.get('/api/get-letter/:id', (req, res, next)=>{
  Person.find({
    _id: req.params.id
  })
    .then((result)=>{
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
    });
})

// modify letter
router.put('/api/modify-letter/:id', (req, res, next)=>{
  console.log("put it down!");
  Person.findOneAndUpdate({
    _id: req.params.id
  }, req.body)
    .then((result)=>{
      console.log(result);
      res.status(200).json();
    })
    .catch(err => {
      console.log(err);
    });
})

router.post('/api/send-letter', (req, res, next) => {
  const letter = new Person(req.body);
  console.log(letter);

  // adding letter to DB
  letter.save();
  res.status(201).json({})
});

module.exports = router;