exports.changePassword = (req, res) => {
    const { oldPassword, newPassword } = req.body;
    
    // Logic for changing the password (e.g., verify old password, update in DB)
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide both old and new passwords.' });
    }
    
    // Simulate password change (you should add real logic)
    // e.g., updating in database
    
    res.status(200).json({ message: 'Password changed successfully.' });
  };
  