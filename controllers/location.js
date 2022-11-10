import Location from '../models/location'

export const createLocation = async (req, res) => {
  const { userId, district, image, location, address } = req.body
  await Location.create({
    publisherId: userId,
    images: image,
    district: district,
    address: address,
    location: location,
    likes: [],
  })
    .then((treeObject) => {
      res.status(200).json(treeObject)
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}

export const retrieveAll = async (req, res) => {
  const { userId } = req.body

  await Location.find()
    .then((result) => {
      res.status(200).json({ result, userId })
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}

export const retrieveUserPosts = async (req, res) => {
  const { userId } = req.body

  await Location.find({ publisherId: userId })
    .then((result) => {
      res.status(200).json({ result, userId })
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}

export const likePost = async (req, res) => {
  const { postId, userId } = req.body
  let likesArr = []
  const likes = await Location.findOne({ _id: postId })
    .then((res) => {
      likesArr = res.likes
      const index = likesArr.findIndex((object) => object === userId)
      if (index !== -1) {
        const idx = likesArr.indexOf(userId)
        if (idx > -1) {
          // only splice array when item is found
          likesArr.splice(idx, 1) // 2nd parameter means remove one item only
        }
      } else if (index === -1) {
        likesArr.push(userId)
      }
    })
    .then(async () => {
      await Location.findOneAndUpdate(
        { _id: postId },
        { likes: likesArr },
        {
          new: true,
          upsert: true, // Make this update into an upsert
        }
      )
        .then((result) => {
          res.status(200).json(result)
        })
        .catch((err) => {
          res.status(500).json(err)
        })
    })
}

export const deletePost = async (req, res) => {
  const { userId, postId } = req.body
  await Location.deleteOne({ publisherId: userId, _id: postId })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}

export const retrieveOneUpdate = async (req, res) => {
  const { userId, postId } = req.body
  await Location.findOne({ publisherId: userId, _id: postId })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}

export const searchLocation = async (req, res) => {
  const { keyword } = req.body
  let locations = []
  let found = []
  await Location.find()
    .then((result) => {
      result.forEach((element) => {
        locations.push({
          id: element._id,
          keywords:
            element.district.toLowerCase() + element.address.toLowerCase(),
        })
      })
      locations.forEach((element) => {
        if (element.keywords.includes(keyword.toLowerCase())) {
          found.push(element.id)
        }
      })
    })
    .catch((err) => {
      res.status(500).json(err)
    })

  await Location.find({ _id: { $in: found } })
    .then((result) => {
      return res.status(200).json(result)
    })
    .catch((err) => {
      return res.status(500).json(err)
    })
}

export const updateLocation = async (req, res) => {
  const { userId, postId, image, address, district } = req.body

  const filter = { publisherId: userId, _id: postId }
  const update = {
    images: image,
    address: address,
    district: district,
  }

  await Location.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}
