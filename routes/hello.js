const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKey:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 * 
 * /items:
 *   post:
 *     summary: Create a new item
 *     security:
 *       - ApiKey: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 */
router.post('/items', (req, res) => {
  const { name, description } = req.body;
  const newItem = {
    id: Math.floor(Math.random() * 1000),
    name,
    description,
  };
  res.status(201).json(newItem);
});

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     security:
 *       - ApiKey: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 */
router.get('/items', (req, res) => {
  const items = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
  ];
  res.status(200).json(items);
});

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Hello World endpoint
 *     security:
 *       - ApiKey: []
 *     responses:
 *       200:
 *         description: A simple hello world response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 */
router.get('/hello', (req, res) => {
  const apiKey = 'ayamjahe';
  const authHeader = req.headers['authorization'];

  if (!authHeader || authHeader !== `ApiKey ${apiKey}`) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }

  res.json({ response: 'Hello World!' });
});

module.exports = router;