const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');
const bcrypt = require('bcryptjs');

// ✅ Middleware: Must be logged in + must be admin
router.use(authMiddleware);
router.use(checkRole('admin'));

// POST /api/admin/add-store → Add a new store
router.post('/add-store', async (req, res) => {
    const { name, email, address } = req.body;
  
    // Basic validation
    if (!name || !email || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Insert new store into the database
      const [result] = await db.query(
        `INSERT INTO stores (name, email, address) VALUES (?, ?, ?)`,
        [name, email, address]
      );
  
      res.status(201).json({ message: 'Store added successfully', storeId: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
// POST /api/admin/add-user → add a new user
router.post('/add-user', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate input
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required: name, email, password, role' });
  }

  try {
    // Check if the user already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const [newUser] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    // Respond with success
    res.status(201).json({ message: 'User added successfully', userId: newUser.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
