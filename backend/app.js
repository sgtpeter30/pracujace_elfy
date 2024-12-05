const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
const letterRouter = require('./routes/letters');
const listRoutes = require("./routes/lists");

const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to DB");
  })
  .catch(() => {
    console.log("Connection failed");
  })

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, "pracujace_elfy")))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, bypass-tunnel-reminder");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  next();
});

app.use((req, res, next)=>{
  console.log("index?");
  res.sendFile(path.join("./pracujace_elfy/index.html"), {root: 'backend'})
});

app.use('/api/letter', letterRouter);
app.use("/api/list", listRoutes);

module.exports = app;