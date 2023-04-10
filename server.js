const express = require('express');
const db =require('./config/connection');

//requiring models
const { User, Thought} = require('./models');    


const app = express();
const PORT = process.env.PORT || 3001;

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

