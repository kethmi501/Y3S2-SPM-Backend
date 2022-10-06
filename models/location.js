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
      required: true,
    },
    images: {
      type: JSON,
      required: true,
    },
    address : {
      type : String,
      required : true,
    },
    publisherId: {
      type: String,
      required: true,
    },
    likes: {
      type: JSON,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Location', locationSchema)
