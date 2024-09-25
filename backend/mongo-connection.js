const mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost/Twitter', {useNewUrlParser: true})
const uri = 'mongodb://localhost:27017/Twitter';
/*
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('we are connected to mongodb!')
});
*/

// Connect to MongoDB
mongoose.connect(uri, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });