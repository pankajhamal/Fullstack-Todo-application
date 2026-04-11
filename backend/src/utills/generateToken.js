import jwt from 'jsonwebtoken'

const generateToken = (userId, res) =>{
  const payload = {id: userId};
  const secret = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secret, {
    expiresIn: '7d'
  })

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
     maxAge: (1000*60*60*24)*7,
  })
  return token;
}

export {generateToken};