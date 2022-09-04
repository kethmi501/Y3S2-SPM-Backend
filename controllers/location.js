import Location from '../models/location'

export const createLocation = async (req, res) => {
  const { userId, district, image, location } = req.body
  await Location.create({
    publisherId: userId,
    images: image,
    district: district,
    location: location,
  })
    .then((treeObject) => {
      res.status(200).json(treeObject)
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}
