import User from '../models/user'

export const authUser = async (req, res) => {
  const { displayName, email } = req.body


  const user = await User.findOne({ email })


}
