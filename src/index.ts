import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

app.use(cors());

const productsFilePath = path.join(__dirname, 'products.json');

// Define the GET /products endpoint
app.get('/products', (req, res) => {
  // Read products.json file dynamically on each request
  fs.readFile(productsFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading products.json:', err);
      res.status(500).json({ error: 'Failed to read products' });
      return;
    }

    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch (error) {
      console.error('Error parsing products.json:', error);
      res.status(500).json({ error: 'Failed to parse products data' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
