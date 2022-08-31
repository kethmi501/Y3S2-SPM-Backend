import User from '../models/user'
import Animal from '../models/animal'

export const addAnimal = async (req, res) => {
  const {
    nameInput,
    scientificNameInput,
    tagInput,
    descriptionInput,
    avgMaleWeightInput,
    avgFemaleWeightInput,
    avgMaleHeightInput,
    avgFemaleHeightInput,
    kingdomOfAnimal,
    phylumOfAnimal,
    classOfAnimal,
    orderOfAnimal,
    familyOfAnimal,
    genusOfAnimal,
    speciesOfAnimal,
    userId,
  } = req.body


  if (!nameInput || !scientificNameInput || !tagInput || !descriptionInput || !avgMaleWeightInput || !avgFemaleWeightInput || !avgMaleHeightInput || !avgFemaleHeightInput || !kingdomOfAnimal || !phylumOfAnimal || !classOfAnimal || !orderOfAnimal || !familyOfAnimal || !genusOfAnimal || !speciesOfAnimal) {
    return res.status(400).json({
      message: 'Please fill all fields',
    })
  }

  const { _id, name } = await User.findById(userId)

  if (!_id) {
    return res.status(400).json({
      message: 'User not found',
    })
  }

  await Animal.create({
    nameInput,
    scientificNameInput,
    tagInput: [...tagInput, {
      name: name,
      hidden: true,
    }],
    descriptionInput,
    avgMaleWeightInput,
    avgFemaleWeightInput,
    avgMaleHeightInput,
    avgFemaleHeightInput,
    kingdomOfAnimal,
    phylumOfAnimal,
    classOfAnimal,
    orderOfAnimal,
    familyOfAnimal,
    genusOfAnimal,
    speciesOfAnimal,
    publisherId: _id,
  }).then((createdAnimal) => {
    return res.status(200).json({
      message: 'Animal created successfully',
      animal: createdAnimal,
    })
  }).catch((err) => {
    return res.status(500).json({
      message: 'Error creating animal',
      err,
    })
  })

}
