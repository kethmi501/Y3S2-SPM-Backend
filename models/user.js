import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: JSON,
      required: true,
      default: {
        url: 'https://firebasestorage.googleapis.com/v0/b/susty-next.appspot.com/o/default_profile_pic.png?alt=media&token=ddfbe30b-a94f-4390-94cf-416285ac2fde',
        name: 'default_profile_pic.png',
      },
    },
    role: {
      type: [String],
      required: true,
      default: ['user'],
      enum: ['user', 'admin'],
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    district: {
      type: String,
      required: false,
    },
    trophies: {
      type: Number,
      required: false,
      default: 0,
    }
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('User', userSchema)
