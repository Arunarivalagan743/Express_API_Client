const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Add CORS headers
// Update the CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Debug middleware - enhanced to log more details
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Request Headers:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request Body:', req.body);
  }
  
  const originalJson = res.json;
  res.json = function(body) {
    console.log(`Response: ${JSON.stringify(body)}`);
    return originalJson.call(this, body);
  };
  next();
});

<<<<<<< HEAD
// Serve static files
app.use(express.static(path.join(__dirname)));
=======
app.use(express.static(path.join(__dirname, 'public')));
>>>>>>> 9c5c87b (delpy)

// Sample data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
];

// Welcome route
<<<<<<< HEAD
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
=======

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
>>>>>>> 9c5c87b (delpy)
});

// API Routes - explicitly define the path prefix
app.get('/api/users', (req, res) => {
  console.log('GET /api/users called');
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  console.log(`GET /api/users/${req.params.id} called`);
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user);
});

app.post('/api/users', (req, res) => {
  console.log('POST /api/users called');
  console.log('POST body:', req.body);
  
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  console.log(`PUT /api/users/${req.params.id} called`);
  
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const { name, email } = req.body;
  
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  
  res.json(users[userIndex]);
});

app.delete('/api/users/:id', (req, res) => {
  console.log(`DELETE /api/users/${req.params.id} called`);
  
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({ message: 'User deleted', user: deletedUser });
});

// Add a test route to confirm API is working
app.get('/api/test', (req, res) => {
  console.log('GET /api/test called');
  res.json({ message: 'API is working!' });
});

// Catch-all route handler for any requests to an undefined route
app.use((req, res) => {
  console.log(`404: ${req.method} ${req.path}`);
  res.status(404).json({ message: `Cannot ${req.method} ${req.path}` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/users`);
});