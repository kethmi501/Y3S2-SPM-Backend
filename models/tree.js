import mongoose from 'mongoose'

const { Schema } = mongoose

const treeSchema = new Schema(
  {
    createdUser: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: JSON,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    scientificname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    enhancementCardIds: {
      type: [String],
      required: true,
      default: [],
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Tree', treeSchema)
