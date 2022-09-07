import EnhancementCard from '../models/enhancementCard'
import User from '../models/user'
import Tree from '../models/tree'
import Animal from '../models/animal'

export const addEnhancementCards = async (req, res) => {
  const { topic, description, userId, imageArray, entityType, entityID } = req.body

  if (topic.toString().trim() === '' || description.toString().trim() === '' || entityType.toString().trim() === '' || entityID.toString().trim() === '') {
    return res.status(400).json({
      message: 'Please enter all fields',
    })
  }

  const { _id } = await User.findById(userId)

  if (!_id) {
    return res.status(400).json({
      message: 'User not found',
    })
  }

  if (entityType !== 'tree' && entityType !== 'animal') {
    return res.status(400).json({
      message: 'Entity Type not found', entityType,
    })
  }

  if (entityType === 'tree') {
    const tree = await Tree.findById(entityID)
    if (!tree) {
      return res.status(400).json({
        message: 'Tree not found',
      })
    }
  } else if (entityType === 'animal') {
    const animal = await Animal.findById(entityID)
    if (!animal) {
      return res.status(400).json({
        message: 'Animal not found',
      })
    }
  }

  await EnhancementCard.create({
    topic, description, userId: _id, imageArray, entityType, entityID,
  }).then((enhancementCard) => {

    if (entityType === 'tree') {
      Tree.findByIdAndUpdate(
        entityID,
        {
          $push:
            { enhancementCardIds: enhancementCard._id },
        },
        { new: true },
        (err, tree) => {
          if (err) {
            return res.status(400).json({
              message: 'Error adding enhancement card to tree',
            })
          }
        })
    } else if (entityType === 'animal') {
      Animal.findByIdAndUpdate(entityID, {
          $push:
            {
              enhancementCardIds: enhancementCard._id,
            },
        },
        { new: true },
        (err, animal) => {
          if (err) {
            return res.status(400).json({
              message: 'Error adding enhancement card to animal',
            })
          }
        })
    }

    return enhancementCard

  }).then((enhancementCard) => {
    return res.status(200).json({
      message: 'Enhancement Card created successfully', enhancementCard: enhancementCard,
    })
  }).catch((err) => {
    return res.status(500).json({
      message: 'Error creating Enhancement Card', err,
    })
  })

}

export const viewEnhancementCards = async (req, res) => {
  const { entityType, entityID, enhancementCardId } = req.body

  if (entityType !== 'tree' || entityType !== 'animal') {
    return res.status(400).json({
      message: 'Entity Type not found',
    })
  }

  if (entityType === 'tree') {
    const tree = await Tree.findById(entityID)

    if (!tree) {
      return res.status(400).json({
        message: 'Tree not found',
      })
    }

    if (tree.enhancementCardIds.length === 0) {
      return res.status(400).json({
        message: 'No Enhancement Cards found',
      })
    }

    const enhancementCards = []

    for (let i = 0; i < enhancementCards.length; i++) {
      enhancementCards.push(await EnhancementCard.findById(tree.enhancementCardIds[i]))
    }

    return res.status(200).json({
      message: 'Enhancement Cards found', enhancementCards,
    })


  } else if (entityType === 'animal') {
    const animal = await Animal.findById(entityID)

    if (!animal) {
      return res.status(400).json({
        message: 'Animal not found',
      })
    }

    if (animal.enhancementCardIds.length === 0) {
      return res.status(400).json({
        message: 'No Enhancement Cards found',
      })
    }

    const enhancementCards = []

    for (let i = 0; i < enhancementCards.length; i++) {
      enhancementCards.push(await EnhancementCard.findById(animal.enhancementCardIds[i]))
    }

    return res.status(200).json({
      message: 'Enhancement Cards found', enhancementCards,
    })
  }
}
