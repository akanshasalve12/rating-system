CREATE DATABASE rating_system_dev;
CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(60) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(225) NOT NULL,
address VARCHAR(400),
role ENUM('admin', 'user', 'store_owner') NOT NULL
);

CREATE TABLE stores(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
address VARCHAR(400),
owner_id INT,
FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE ratings(
id INT auto_increment PRIMARY KEY,
user_id INT NOT NULL,
store_id INT NOT NULL,
value INT CHECK(VALUE BETWEEN 1 AND 5),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', 'hashed_password', 'admin'),
('Store Owner', 'owner@example.com', 'hashed_password', 'store_owner'),
('Normal User', 'user@example.com', 'hashed_password', 'user');

INSERT INTO stores (name, location, owner_id) VALUES
('Coffee House', 'Mumbai', 2),
('Book Bazaar', 'Delhi', 2);
