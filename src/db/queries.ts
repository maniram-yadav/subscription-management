// Database Queries Constants

export const USER_QUERIES = {
  // Check if user exists by username or email
  CHECK_USER_EXISTS: 'SELECT * FROM users WHERE username = $1 OR email = $2',

  // Insert new user
  CREATE_USER:
    'INSERT INTO users (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, first_name, last_name, created_at',

  // Find user by username
  FIND_USER_BY_USERNAME: 'SELECT * FROM users WHERE username = $1',

  // Find user by id (without password)
  FIND_USER_BY_ID:
    'SELECT id, username, email, first_name, last_name, created_at, updated_at FROM users WHERE id = $1',

  // Find all users (without password)
  FIND_ALL_USERS:
    'SELECT id, username, email, first_name, last_name, created_at, updated_at FROM users ORDER BY id DESC',

  // Update user by id (without changing password)
  UPDATE_USER:
    `UPDATE users SET username = $1, email = $2, first_name = $3, last_name = $4, updated_at = NOW()
     WHERE id = $5 RETURNING id, username, email, first_name, last_name, created_at, updated_at`,

  // Create users table
  CREATE_USERS_TABLE: `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `,
};

export const SUBSCRIPTION_QUERIES = {
  // Create subscriptions table
  CREATE_SUBSCRIPTIONS_TABLE: `
    CREATE TABLE IF NOT EXISTS subscriptions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      due_date DATE NOT NULL,
      web_url VARCHAR(500),
      description TEXT,
      status VARCHAR(50) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `,

  // Create subscription
  CREATE_SUBSCRIPTION:
    `INSERT INTO subscriptions (user_id, name, amount, due_date, web_url, description, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, user_id, name, amount, due_date, web_url, description, status, created_at, updated_at`,

  // Get all subscriptions for a user
  GET_USER_SUBSCRIPTIONS:
    `SELECT id, user_id, name, amount, due_date, web_url, description, status, created_at, updated_at
     FROM subscriptions WHERE user_id = $1 ORDER BY due_date ASC`,

  // Get single subscription
  GET_SUBSCRIPTION_BY_ID:
    `SELECT id, user_id, name, amount, due_date, web_url, description, status, created_at, updated_at
     FROM subscriptions WHERE id = $1`,

  // Update subscription
  UPDATE_SUBSCRIPTION:
    `UPDATE subscriptions SET name = $1, amount = $2, due_date = $3, web_url = $4, description = $5, status = $6, updated_at = NOW()
     WHERE id = $7 AND user_id = $8
     RETURNING id, user_id, name, amount, due_date, web_url, description, status, created_at, updated_at`,

  // Delete subscription
  DELETE_SUBSCRIPTION:
    `DELETE FROM subscriptions WHERE id = $1 AND user_id = $2`,
};
