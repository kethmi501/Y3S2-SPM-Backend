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
    entityType: {
      type: String,
      required: true,
    },
    entityID: {
      type: String,
      required: true,
    },
    reports: {
      type: [String],
      required: false,
    }
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('EnhancementCard', enhancementCardSchema)
