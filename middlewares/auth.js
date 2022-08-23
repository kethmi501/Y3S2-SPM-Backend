import jwt from 'jsonwebtoken'

export const checkUser = (req, res, next) => {
  const tokenString = req.headers.authorization
  const token = tokenString.split(" ")[1]

  const decoded = jwt.verify(token, process.env.JWT_SECRET, null, null)

  if (decoded) {
    next()

  } else {
    return res.status(500).json({
      message: 'Authorization failed',
    })
  }

}
