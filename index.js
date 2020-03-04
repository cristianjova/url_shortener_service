const express = require('express');

// Init app
const app = express();

// Acepting json data to API
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servicio iniciado en puerto ${PORT}`));
