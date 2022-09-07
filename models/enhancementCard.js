import mongoose from 'mongoose'

const { Schema } = mongoose

const enhancementCardSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    imageArray: {
      type: JSON,
      required: true,
    },
    entityType: {
      type: String,
      required: true,
    },
    entityID: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('EnhancementCard', enhancementCardSchema)
