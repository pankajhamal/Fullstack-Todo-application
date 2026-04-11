import express from 'express'
import {config} from 'dotenv'
const app = express();

//Import Routes
import authRoutes from './routes/authRoutes.js'

config();
app.use(express.json());

app.use("/auth", authRoutes);


const port = 3000;
app.listen(port, () =>{
  console.log(`App listening at http://localhost:${port}`)
});