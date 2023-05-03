require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded())
app.use(cors({
    origin: '*',
}))

app.use(require('./Routes'))


app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`)
})