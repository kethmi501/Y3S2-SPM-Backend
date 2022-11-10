import mongoose from 'mongoose'

const {Schema} = mongoose

const animalSchema = new Schema({
    nameInput: {
        type: String, required: true,
    }, scientificNameInput: {
        type: String, required: true,
    }, descriptionInput: {
        type: String, required: true,
    }, enhancementCardIds: {
        type: [String], required: true,
    }
}, {
    timestamps: true,
})

export default mongoose.model('Animal', animalSchema)
