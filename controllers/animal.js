import User from '../models/user'
import Animal from '../models/animal'
import {addTrophies} from '../helpers/trophies'

export const addAnimal = async (req, res) => {
    const {
        nameInput,
        scientificNameInput,
        descriptionInput,
        userId,
        imageUrl
    } = req.body


    if (!nameInput || !scientificNameInput || !descriptionInput || !userId) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const {_id, name} = await User.findById(userId)

    if (!_id) {
        return res.status(400).json({
            message: 'User not found',
        })
    }

    await Animal.create({
        nameInput,
        scientificNameInput,
        descriptionInput,
        imageUrl,
        publisherId: _id,
        enhancementCardIds: [],
    }).then(async (createdAnimal) => {
        await addTrophies(_id, 1)


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

export const getAnimalsList = async (req, res) => {
    await Animal.find().then((animals) => {

        return res.status(200).json({
            message: 'Animals List Fetched Successfully',
            animalsList: animals,
        })
    })
}

export const getSingleAnimal = async (req, res) => {
    const {id} = req.query

    await Animal.findById(id).then((animal) => {
        return res.status(200).json({
            message: 'Animal Fetched Successfully',
            animal: animal,
        })
    })
}

export const deleteSingleAnimal = async (req, res) => {
    const {id} = req.body

    await Animal.findByIdAndDelete(id).then((animal) => {
        return res.status(200).json({
            message: 'Animal Deleted Successfully',
            animal: animal,
        })
    }).catch((err) => {
        return res.status(500).json({
            message: 'Error deleting animal',
            err,
        })
    })

}

export const editSingleAnimal = async (req, res) => {
    const {
        id,
        nameInput,
        scientificNameInput,
        descriptionInput,
        imageUrl,
        userId,
    } = req.body


    if (!nameInput || !scientificNameInput || !descriptionInput || !imageUrl) {
        return res.status(400).json({
            message: 'Please check request body',
        })
    }

    const {_id} = await User.findById(userId)

    if (!_id) {
        return res.status(400).json({
            message: 'User not found',
        })
    }

    await Animal.findOneAndUpdate(
        {
            _id: id,
            publisherId: _id,
        },
        {
            nameInput,
            scientificNameInput,
            descriptionInput,
            imageUrl,
        }).then((createdAnimal) => {
        return res.status(200).json({
            message: 'Animal updated successfully',
            animal: createdAnimal,
        })
    }).catch((err) => {
        return res.status(500).json({
            message: 'Error updating animal',
            err,
        })
    })

}
