const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

class UserClass {

  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

}

const UserFields = {
  email: {
    type: String,
    index: true,
    unique: true,
    required: false,
  },
  username: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 80,
    select: false,
  },
  stripe_id: {
    type: String,
    minlength: 3,
    maxlength: 80,
    required: false,
  },
  stripe_method: {
    type: String,
    minlength: 3,
    maxlength: 80,
    required: false,
  }
};

const UserSchema = new mongoose.Schema(UserFields, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(this.password, salt, (error, hash) => {
        if (error) {
          return next(error);
        }
        this.password = hash;
        next();
      });
    });
  } else next();
});

UserSchema.loadClass(UserClass);

const User = mongoose.model('User', UserSchema);

module.exports = User;
