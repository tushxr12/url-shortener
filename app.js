const express = require('express');
const app = express();
const dotenv = require('dotenv');
const urlRoutes = require('./routes/urlRoutes');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use("/" , urlRoutes);

dotenv.config();

// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   next();
// });

// app.get('/', (req, res) => {
//   res.send('URL shortener API is running');
// });


module.exports = app;