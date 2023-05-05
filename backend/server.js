require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors')
const morgan = require('morgan')

app.use(express.json());
app.use(express.urlencoded())
app.use(cors({
    origin: '*',
}))
app.use(morgan('dev'));

app.use(require('./Routes'))


app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`)
})