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
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.updatedAt = now;
  next();
}

async function handleLogin() {
  const now = new Date();
  this.lastLoggedIn = now;
  await this.save();
}

UserSchema.pre('save', handleDates);

UserSchema.methods.login = handleLogin;

export default mongoose.model(COLLECTION_NAME, UserSchema);
