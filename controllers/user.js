import User from '../models/user'
import jwt from 'jsonwebtoken'

export const authUser = async (req, res) => {
  const { displayName, email, photoURL, district } = req.body

  const user = await User.findOne({ email })

  if (user) {
    sendUserLoginSuccessResponse(res, user, 'loggedIn')
    return
  }

  const newUser = new User({
    name: displayName,
    email: email,
    image: {
      url: photoURL || 'https://firebasestorage.googleapis.com/v0/b/susty-next.appspot.com/o/default_profile_pic.png?alt=media&token=ddfbe30b-a94f-4390-94cf-416285ac2fde',
      name: 'default_profile_pic.png',
    },
    district : district,
  })


  await User.create(newUser)
    .then(createdUser => {
      sendUserLoginSuccessResponse(res, createdUser, 'registered')
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Error creating user',
        err,
      })
    })
}

const sendUserLoginSuccessResponse = (res, user, fn) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  }, null)

  const decoded = jwt.verify(token, process.env.JWT_SECRET, null, null)


  if (user._id.toString() === decoded._id) {
    return res.status(200).json({
      message: `${fn === 'registered' ? 'User registered successfully' : 'User logged in successfully'}`,
      user:
        {
          email: user.email,
          name: user.name,
          image: user.image.url,
        },
      token,
    })
  } else {
    return res.status(500).json({
      message: 'Error creating user',
    })
  }
}
