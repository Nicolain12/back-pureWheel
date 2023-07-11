const express = require('express');
const path = require('path')
const cors = require('cors');
const app = express();
//routes requires
const usersApi = require('./routes/usersRoutes')
const carsApi = require('./routes/carsRoutes')

app.use(express.json())
app.use(cors());

const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

//Listener
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
    console.log('http://localhost:3000')
}) 

//Routes
app.use('/users', usersApi)
app.use('/cars', carsApi)
