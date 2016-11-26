const mongoose = require('mongoose');
const config = require('./configs');
const Snake = require('./models/snake');

module.exports = function connectDb() {

  mongoose.connect(config.get('SNAKE_DB_URL'), (err) => {
    err && console.log(err);
    !err && console.log('Connected to mongodb');

    Snake.count({}, (err, count) => {
        if(!count) {

          Snake.create({
            name: 'Jerry',
            length: 200,
            deadly: true
          });

          Snake.create({
            name: 'Larry',
            length: 300,
            deadly: true
          });

          Snake.create({
            name: 'Terry',
            length: 500,
            deadly: true
          });
        }
    });
  });
}
