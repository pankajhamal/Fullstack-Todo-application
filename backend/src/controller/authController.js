import {prisma} from '../config/db.js'
import bcrypt from 'bcryptjs';
import {generateToken} from '../utills/generateToken.js'

const register = async (req, res) =>{
  const {email, name, password} = req.body;

  if(!name || !email || !password){
    return res.status(400).json({message: "All field are required"});
  }

  const userExist = await prisma.user.findUnique({
    where: {email}
  })

  if(userExist){
    return res.status(200).json({message: "User already exist"});
  }

  //Password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      name, 
      email,
      password: hashedPassword,
    },
  });
  
  //Generate jwt token 
  const token = generateToken(user.id, res)

  return res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  })

}

export {register}