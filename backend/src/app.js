import express from 'express'
import {config} from 'dotenv'

const app = express();

config();

app.get('/', (req, res) =>{
  res.send("Hello world");
})

const port = 3000;
app.listen(port, () =>{
  console.log(`App listening at http://localhost:${port}`)
});