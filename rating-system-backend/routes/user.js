const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

// Middleware: user must be logged in & have 'user' role
router.use(authMiddleware);
router.use(checkRole('user'));

// GET /api/user/stores → view + search stores
router.get('/stores', async (req, res) => {
  const { name = '', address = '' } = req.query;

  try {
    const [stores] = await db.query(`
      SELECT s.id, s.name, s.address,
             ROUND(AVG(r.value), 1) AS average_rating,
             (
               SELECT value FROM ratings 
               WHERE user_id = ? AND store_id = s.id
               LIMIT 1
             ) AS user_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE s.name LIKE ? AND s.address LIKE ?
      GROUP BY s.id
    `, [req.user.id, `%${name}%`, `%${address}%`]);

    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/change-password', async (req, res) => {
    const { currentPassword, newPassword } = req.body;
  
    if (
      !newPassword ||
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/[!@#$%^&*]/.test(newPassword)
    ) {
      return res.status(400).json({
        message:
          'New password must be 8-16 characters long, include an uppercase letter and a special character.',
      });
    }
  
    try {
      // Get current user
      const [rows] = await db.query('SELECT password FROM users WHERE id = ?', [req.user.id]);
      const user = rows[0];
  
      const bcrypt = require('bcryptjs');
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, req.user.id]);
  
      res.json({ message: 'Password updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
// POST /api/user/rate → submit or update rating
router.post('/rate', async (req, res) => {
  const { store_id, value } = req.body;

  if (!store_id || !value || value < 1 || value > 5) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    // Check if user has already rated
    const [existing] = await db.query(
      'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?',
      [req.user.id, store_id]
    );

    if (existing.length > 0) {
      // Update existing rating
      await db.query(
        'UPDATE ratings SET value = ? WHERE user_id = ? AND store_id = ?',
        [value, req.user.id, store_id]
      );
    } else {
      // Insert new rating
      await db.query(
        'INSERT INTO ratings (user_id, store_id, value) VALUES (?, ?, ?)',
        [req.user.id, store_id, value]
      );
    }

    res.json({ message: 'Rating saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
