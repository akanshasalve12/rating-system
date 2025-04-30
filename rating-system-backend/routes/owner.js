const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

// Middleware: logged in + must be store owner
router.use(authMiddleware);
router.use(checkRole('store_owner'));

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
  
// GET /api/owner/ratings → show store ratings + users
router.get('/ratings', async (req, res) => {
  try {
    // Find store by owner ID
    const [storeRows] = await db.query(
      'SELECT id, name FROM stores WHERE owner_id = ?',
      [req.user.id]
    );

    const store = storeRows[0];
    if (!store) {
      return res.status(404).json({ message: 'Store not found for this owner' });
    }

    // Get ratings for this store
    const [ratings] = await db.query(`
      SELECT u.name AS user_name, u.email, r.value
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = ?
    `, [store.id]);

    // Get average rating
    const [[{ avg_rating }]] = await db.query(
      'SELECT ROUND(AVG(value), 1) AS avg_rating FROM ratings WHERE store_id = ?',
      [store.id]
    );

    res.json({
      store: store.name,
      average_rating: avg_rating || 0,
      ratings
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
