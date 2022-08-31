import mongoose from 'mongoose'

const { Schema } = mongoose

const animalSchema = new Schema({
  nameInput: {
    type: String, required: true,
  }, scientificNameInput: {
    type: String, required: true,
  }, tagInput: {
    type: JSON, required: true,
  }, descriptionInput: {
    type: String, required: true,
  }, avgMaleWeightInput: {
    type: String, required: true,
  }, avgFemaleWeightInput: {
    type: String, required: true,
  }, avgMaleHeightInput: {
    type: String, required: true,
  }, avgFemaleHeightInput: {
    type: String, required: true,
  }, kingdomOfAnimal: {
    type: String, required: true,
  }, phylumOfAnimal: {
    type: String, required: true,
  }, classOfAnimal: {
    type: String, required: true,
  }, orderOfAnimal: {
    type: String, required: true,
  }, familyOfAnimal: {
    type: String, required: true,
  }, genusOfAnimal: {
    type: String, required: true,
  }, speciesOfAnimal: {
    type: String, required: true,
  }, publisherId: {
    type: String, required: true,
  },
}, {
  timestamps: true,
})

export default mongoose.model('Animal', animalSchema)
