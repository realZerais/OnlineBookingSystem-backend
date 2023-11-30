const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
});



app.listen(
    PORT, 
    () => {console.log(`Server is running on http://localhost:${PORT}`)
});
