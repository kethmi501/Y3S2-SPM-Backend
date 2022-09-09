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
    topic, description, userId: _id, imageArray, entityType, entityID, reports: [],
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
  const { enhancementCardId } = req.query

  if (!enhancementCardId) {
    return res.status(400).json({
      message: 'Please enter all fields',
    })
  }

  await EnhancementCard.findById(enhancementCardId)
    .then((enhancementCard) => {
      return res.status(200).json({
        message: 'Enhancement Card found successfully', enhancementCard: enhancementCard,
      })
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Error finding Enhancement Card', err,
      })
    })

}


export const reportEnhancementCards = async (req, res) => {
  const { enhancementCardId, userId } = req.body

  if (!enhancementCardId || !userId) {
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

  await EnhancementCard.findById(enhancementCardId)
    .then(async (enhancementCard) => {


      if (enhancementCard.reports.length >= 5 || enhancementCard.userId.toString() === _id.toString()) {
        await EnhancementCard.findByIdAndDelete(enhancementCardId)

        if (enhancementCard.entityType === 'tree') {
          Tree.findByIdAndUpdate(
            enhancementCard.entityID,
            {
              $pull:
                { enhancementCardIds: enhancementCardId },
            },
            { new: true },
            (err, tree) => {
              if (err) {
                return res.status(400).json({
                  message: 'Error deleting enhancement card from tree',
                })
              }
            })
        }

        if (enhancementCard.entityType === 'animal') {
          Animal.findByIdAndUpdate(
            enhancementCard.entityID,
            {
              $pull:
                { enhancementCardIds: enhancementCardId },
            },
            { new: true },
            (err, animal) => {
              if (err) {
                return res.status(400).json({
                  message: 'Error deleting enhancement card from animal',
                })
              }
            })
        }

        return res.status(200).json({
          message: 'Enhancement Card deleted successfully',
        })
      }

      if (enhancementCard.reports.includes(_id)) {
        return res.status(400).json({
          message: 'User already reported this enhancement card',
        })
      }

      await EnhancementCard.findByIdAndUpdate(
        enhancementCardId,
        {
          $push:
            { reports: _id },
        },
        { new: true },
        (err, enhancementCard) => {
          if (err) {
            return res.status(400).json({
              message: 'Error reporting enhancement card',
            })
          }
        }).then((enhancementCard) => {
        return res.status(200).json({
          message: 'Enhancement Card reported successfully', enhancementCard: enhancementCard,
        })
      }).catch((err) => {
        return res.status(500).json({
          message: 'Error reporting Enhancement Card', err,
        })
      })

    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Error reporting Enhancement Card', err,
      })
    })


}

export const editEnhancementCards = async (req, res) => {
  const { enhancementCardId, topic, description, imageArray } = req.body

  if (!enhancementCardId || !topic || !description || !imageArray) {
    return res.status(400).json({
      message: 'Please enter all fields',
    })
  }


  await EnhancementCard.findById(enhancementCardId)
    .then(async (enhancementCard) => {

      await EnhancementCard.findByIdAndUpdate(
        enhancementCard._id,
        {
          topic, description, imageArray,
        },
        { new: true })
        .then((enhancementCard) => {
          return res.status(200).json({
            message: 'Enhancement Card edited successfully', enhancementCard: enhancementCard,
          })
        }).catch((err) => {
          return res.status(500).json({
            message: 'Error editing Enhancement Card', err,
          })
        })
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Error editing Enhancement Card', err,
      })
    })

}
