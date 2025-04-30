exports.addUser = (req, res) => {
    const { name, email, role, password } = req.body;
    
    // Validate input
    if (!name || !email || !role || !password) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }
  
    // Simulate adding the user (e.g., saving to a database)
    // You should replace this with actual database logic
    const newUser = {
      id: Date.now(), // just a temporary ID for now
      name,
      email,
      role,
      password, // In real scenarios, never store plain passwords
    };
  
    // Respond with a success message
    res.status(201).json({ message: 'User added successfully', user: newUser });
  };
  