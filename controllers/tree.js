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
  })
    .then((treeObject) => {
      res.status(200).json(treeObject)
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}
