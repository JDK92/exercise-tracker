require('dotenv').config();

//  IMPORTS
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require("./routes/routes");

//  DB CONNECTION
mongoose.connect(process.env['MONGO_URI']);

//  APP INSTANCE
const app = express();

//  MIDDLEWARES
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(routes);

//  START SERVER
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
