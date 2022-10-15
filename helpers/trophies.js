import User from '../models/user'

export const addTrophies = (user, trophies) => {
  User.findOneAndUpdate(
    { _id: user._id },
    { $inc: { trophies: trophies } },
    { new: true },
  )
    .then((user) => {
      // console.log(user)
    })
    .catch((err) => {
      console.log(err)
    })
}