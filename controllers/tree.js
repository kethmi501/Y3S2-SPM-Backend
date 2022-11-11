import Tree from '../models/tree'

export const CreateTree = async (req, res) => {
  const { userId, name, image, tags, scientificname, description } = req.body
  await Tree.create({
    createdUser: userId,
    name: name,
    image: image,
    tags: tags,
    scientificname: scientificname,
    description: description,
    imageUrl: image,
  })
    .then((treeObject) => {
      res.status(200).json(treeObject)
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}

export const retrieveAll = async (req, res) => {
  await Tree.find()
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}

export const retriveUserPosts = async (req, res) => {
  const { userId } = req.body
  await Tree.find({ createdUser: userId })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}

export const deletePost = async (req, res) => {
  const { userId, postId } = req.body
  await Tree.deleteOne({ createdUser: userId, _id: postId })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}

export const retrieveOneUpdate = async (req, res) => {
  const { postId } = req.query

  await Tree.findOne({ _id: postId })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
}

export const updatePost = async (req, res) => {
  const { userId, postId, name, image, tags, scientificname, description } =
    req.body
  const filter = { createdUser: userId, _id: postId }
  const update = {
    name: name,
    image: image,
    tags: tags,
    scientificname: scientificname,
    description: description,
  }
  await Tree.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true, // Make this update into an upsert
  })
    .then((result) => {
      return res.status(200).json(result)
    })
    .catch((err) => {
      return res.status(500).json(err)
    })
}

export const searchTrees = async (req, res) => {
  const { keyword } = req.body
  let trees = []
  let found = []
  let posts = []
  await Tree.find()
    .then((result) => {
      result.forEach((element) => {
        let tags
        element.tags.forEach((element) => {
          tags = tags + element
        })
        trees.push({
          id: element._id,
          keywords:
            element.name.toLowerCase() +
            element.scientificname.toLowerCase() +
            tags.toLowerCase(),
        })
      })
      trees.forEach((element) => {
        if (element.keywords.includes(keyword.toLowerCase())) {
          found.push(element.id)
        }
      })
    })
    .catch((err) => {
      res.status(500).json(err)
    })
  await Tree.find({ _id: { $in: found } })
    .then((result) => {
      return res.status(200).json(result)
    })
    .catch((err) => {
      return res.status(500).json(err)
    })
}
