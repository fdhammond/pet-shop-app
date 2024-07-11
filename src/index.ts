import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

app.use(cors());

// Read the products.json file
const productsFilePath = path.join(__dirname, 'products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Define the GET /products endpoint
app.get('/products', (req, res) => {
  res.json(products);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
