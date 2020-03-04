const express = require('express');
const connectDB = require('./config/db');

// Init app
const app = express();

// Connect to database
connectDB();

// Acepting json data into our API
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servicio iniciado en puerto ${PORT}`));
