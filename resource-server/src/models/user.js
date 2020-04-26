import mongoose, { Schema } from 'mongoose';

const COLLECTION_NAME = 'users';

const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  createdAt: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  lastLoggedIn: {
    type: Date,
  },
  lastFailedLogin: {
    type: Date,
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

function handleDates(next) {
  const now = Date.now();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.updatedAt = now;
  next();
}

async function handleLogin() {
  const now = Date.now();
  this.lastLoggedIn = now;
  this.loginAttempts = 0;
  await this.save();
}

async function handleFailedLogin() {
  const now = Date.now();
  this.lastFailedLogin = now;
  this.loginAttempts += 1;
  await this.save();
}

UserSchema.pre('save', handleDates);

UserSchema.methods.login = handleLogin;
UserSchema.methods.failLogin = handleFailedLogin;


export default mongoose.model(COLLECTION_NAME, UserSchema);
