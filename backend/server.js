require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded())
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}))
app.use(morgan('dev'));

app.use(require('./Routes'))


app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`)
})