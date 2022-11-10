import mongoose from 'mongoose'

const { Schema } = mongoose

const locationSchema = new Schema(
  {
    district: {
      type: String,
      required: true,
    },
    location: {
      type: JSON,
      default: [''],
    },
    images: {
      type: JSON,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    publisherId: {
      type: String,
      required: true,
    },
    likes: {
      type: JSON,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Location', locationSchema)
