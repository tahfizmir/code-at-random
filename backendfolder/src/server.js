const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/apiRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


import cors from "cors";

app.use(
  cors({
    origin: ["https://your-frontend.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());


app.use('/', apiRoutes);

app.get('/', (req, res) => {
  res.send('Career Path Analyzer API is running');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
