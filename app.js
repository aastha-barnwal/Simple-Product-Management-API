
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const db = require('./config/database');
const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use('/products', productRoutes);

const PORT = process.env.PORT || 5000;
db.authenticate()
  .then(() => {
    console.log('Database connected...');
    db.sync({ force: false })
      .then(() => {
        console.log('Tables created successfully.');
      })
      .catch(err => console.error('Error creating tables:', err));
  })
  .catch(err => console.error('Database connection error:', err));

app.listen(PORT, console.log(`Server running on port ${PORT}`));
    