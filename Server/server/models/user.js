const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.checkPassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, match) => {
    if(match) {
      cb(null, match);
    }else{
      cb(err);
    }
  });
}

UserSchema.pre('save', function(next) {
  if(this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if(err) return next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if(err) return next(err);
        this.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
