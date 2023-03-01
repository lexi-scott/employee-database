const express = require('express');
const db = require('./db/dbConnector');
const openPrompt = require('./routes/functions')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.connect(err => {
  if (err) throw err;
  console.log("Database connected");
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  openPrompt();
});
