import mongoose, { Schema } from 'mongoose';

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

UserSchema.pre('save', handleDates);

export default mongoose.model('users', UserSchema);
