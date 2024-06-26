// app.js

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); // Import the CORS middleware

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Use the auth routes
app.use('/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});