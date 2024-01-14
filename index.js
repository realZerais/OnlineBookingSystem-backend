const express = require('express')
const cors = require('cors');
require('dotenv').config();
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT;




// Middlewares
app.use(express.json());

app.use(cors()); // Enable CORS for all routes


//ROUTES
app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.use("/user", userRoutes);


app.listen(
    PORT,
    () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    });








