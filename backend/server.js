const pool = require('./utilities/database');

require('dotenv').config();
/* const socket = require('socket.io')(3200, {
    cors: {
        origin: ['http://localhost:5173', 'http://192.168.1.19:5173'],
    }
}); */

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
app.use(cookieParser());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded())
app.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.1.19:5173'],
    credentials: true
}))
app.use(helmet());
app.use(morgan('dev'));

app.use(require('./Routes'))
/* const { CalcDist } = require('./controllers/services/calcDistance') */

/* const createNewLocation = async (lat, long, users) => {
    await pool.query('INSERT INTO locations (lat, long, users) VALUES($1,$2,$3)', [lat, long, users]);
} */

/* socket.on('connection', socket => {

    console.log('Client connected');
    // Receive the geolocation data from the client
    socket.on('geolocation', async (data) => {
      const { userId, latitude, longitude } = data;

      console.log('Received geolocation:', userId, latitude, longitude);

      const locations = await pool.query('SELECT lat, long, users FROM locations');

      let currentLocation = null

      if(locations.rowCount === 0) {
        let users = { list: [userId] };
        createNewLocation(latitude, longitude, users);
        currentLocation = { latitude, longitude, users }
      }

      for (const location of locations.rows ) {
        let { lat, long, users } = location;
      
        const distance = CalcDist(latitude, longitude, lat, long);
      
        if (distance < 100) {
        if(users.list.includes(userId)) return
          users = { list: [...users.list, userId] }
          await pool.query('UPDATE locations SET users=$1 WHERE lat=$2 AND long=$3', [users, latitude, longitude])
          currentLocation = { lat, long, users }
          break;
        }
    };
        
    if (!currentLocation) {
        console.log('Create new location')
        let users = { list: [userId] };
        createNewLocation(latitude, longitude, users);
        currentLocation = { latitude, longitude, users }
    }

    socket.emit('current-location', currentLocation);
      // Process or store the geolocation data as needed
    });
    
    // Rest of your server code
  }); */


app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`)
})