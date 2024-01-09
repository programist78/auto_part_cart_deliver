import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: String,
    avatarUrl: String,
    birthdayDate: String,
    gender: String,
    socialLink: String,
    phoneNumber: String,
    city: String,
    zipCode: String,
    country: String,
    address: String,
    web3address: String,
    stripeId: String,
    passwordHash:String,
    role: {
      type: String,
      required: true
    },
    token: String,
    confirmationCode: String
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User || mongoose.model('User', User);