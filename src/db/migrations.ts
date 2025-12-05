import pool from './connection';
import { USER_QUERIES, SUBSCRIPTION_QUERIES } from './queries';

export const initializeDatabase = async () => {
  try {
    await pool.query(USER_QUERIES.CREATE_USERS_TABLE);
    console.log('Users table created/verified');
    
    await pool.query(SUBSCRIPTION_QUERIES.CREATE_SUBSCRIPTIONS_TABLE);
    console.log('Subscriptions table created/verified');
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
