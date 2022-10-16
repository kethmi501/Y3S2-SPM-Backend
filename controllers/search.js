import Tree from '../models/tree'
import Animal from '../models/animal'
import Location from '../models/location'

export const searchEntities = async (req, res) => {
  const { query } = req.query

  const animalResults = await Animal.find({ nameInput: { $regex: query, $options: 'i' } })
  const treeResults = await Tree.find({ name: { $regex: query, $options: 'i' } })
  const LocationResults = await Location.find({ address: { $regex: query, $options: 'i' } })


  res.status(200).json({ animalResults, treeResults, LocationResults })


}

const entities = async (req, res) => {
  const { query } = req.query

  const animalResults = await Animal.find({ nameInput: { $regex: query, $options: 'i' } })
  const treeResults = await Tree.find({ name: { $regex: query, $options: 'i' } })
  const LocationResults = await Location.find({ address: { $regex: query, $options: 'i' } })


  res.status(200).json({ animalResults, treeResults, LocationResults })


}