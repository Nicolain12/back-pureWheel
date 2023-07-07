const express = require('express');
const path = require('path')
const app = express();

app.use(express.json())

const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
    console.log('http://localhost:3000')
}) 
