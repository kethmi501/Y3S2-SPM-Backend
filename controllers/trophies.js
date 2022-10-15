import User from '../models/user'

export const getTrophyCount = async (req, res) => {
  User.find({})
    .then((users) => {
      const trophies = users.map((user) => {
        return {
          district: user.district,
          trophyCount: user.trophies,
        }
      })

      //group into districts and sum the trophy count
      const trophyCount = trophies.reduce((acc, curr) => {
        if (acc[curr.district]) {
          acc[curr.district] += curr.trophyCount
        } else {
          acc[curr.district] = curr.trophyCount
        }
        return acc
      }, {})

      const tropiesCount = Object.keys(trophyCount).map((key) => {
        return {
          district: key,
          trophyCount: trophyCount[key],
        }
      }).sort((a, b) => b.trophyCount - a.trophyCount)

      res.status(200).json(tropiesCount)
    })
}