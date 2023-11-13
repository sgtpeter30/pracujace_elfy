const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const Person = require('./models/person');
const { log } = require('console');

const app = express();

// mongodb+srv://santaClaus:<password>@north-pole.c1dzoq0.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://santaClaus:7mMpYbhXZbDwOCEr@north-pole.c1dzoq0.mongodb.net/christmas-letters?retryWrites=true&w=majority')
  .then(() => {
    console.log("connected to DB");
  })
  .catch(() => {
    console.log("Connection failed");
  })

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, "christmas")))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, bypass-tunnel-reminder");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  next();
});
// get full list
app.use('/api/list', (req, res, next) => {
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
app.use('/api/list-person', (req, res, next) => {
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

// get single letter
app.get('/api/get-letter/:id', (req, res, next)=>{
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
app.put('/api/modify-letter/:id', (req, res, next)=>{
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

app.post('/api/send-letter', (req, res, next) => {
  const letter = new Person(req.body);
  console.log(letter);

  // adding letter to DB
  letter.save();
  res.status(201).json({})
});

app.use((req, res, next)=>{
  console.log("index?");
  // res.sendFile(path.join(__dirname, "christmas, index.html"))
  res.sendFile(path.join("./christmas/index.html"), {root: 'backend'})
});

module.exports = app;