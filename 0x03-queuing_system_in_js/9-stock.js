// create a client
import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 },
];

function getItemById(id) {
  return listProducts.find(item => item.id === id);
}
const client = redis.createClient();
client.on('error', (err) => {
  console.error('Redis not connected to server:', err);
});
client.on('connect', () => {
  console.error('Redis connected to server');
});
const getAsync = promisify(client.get).bind(client);
const reservesStockById = (itemId, stock) => {
  client.set(`item.${itemId}`, stock);
};
const getCurrentReservedStockById = async (itemId) => {
  const stock = await getAsync(`item.${itemId}`);
  return stock;
};
const app = express();
const port = 1245;
app.get('/list_products', (req, res) => {
  const products = listProducts.map(item => ({
  itemId: item.id,
  itemName: item.name,
  price: item.price,
  initialAvailableQuantity: item.stock
  }));
  res.json(products);
});
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);
  if (!product) {
    return res.status(404).json({ status: 'Product not found' });
  }
  const currentStock = await getCurrentReservedStockById(itemId) || product.stock;
  res.json({
  itemId: product.id,
  itemName: product.name,
  price: product.price,
  initialAvailableQuantity: product.stock,
  currentQuantity: parseInt(currentStock);
  });
});
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);
  if (!product) {
    return res.status(404).json({ status: 'Product not found' });
  }
  const currentStock = await getCurrentReservedStockById(itemId) || product.stock;
  if (currentStock <= 0) {
    return res.status(400).json ({ status: 'Not enough stock available', itemId: itemId});
  }
  reserveStockById(itemId, currentStock - 1);
  res.json({ status: 'Reservation Confirmed', itemId: itemId});
});
app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
});
