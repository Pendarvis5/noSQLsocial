const express = require('express');
const db = require('./config/connection');

//requiring models
const { User, Thought} = require('./models');    


const app = express();
const PORT = 3001;

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server is running on port ${PORT}!`);
    });
  });

