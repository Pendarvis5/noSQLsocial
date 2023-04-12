const mongoose = require('mongoose');

//wrapping connection for mongoose

mongoose.connect('mongodb://127.0.0.1:27017/no-sql-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


  //export connection
  module.exports = mongoose.connection;