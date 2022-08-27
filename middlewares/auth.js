import jwt from 'jsonwebtoken'

export const checkUser = (req, res, next) => {
  const tokenString = req.headers.authorization

  if (!tokenString) {
    return res.status(401).json({
      message: 'No token provided Please login again',
    })
  }

  const token = tokenString.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      message: 'No token provided Please login again',
    })
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET, null, null)

  if (decoded) {
    req.body.userId = decoded._id
    next()

  } else {
    return res.status(500).json({
      message: 'Authorization failed',
    })
  }
}
