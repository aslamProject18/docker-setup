// MongoDB initialization script
// This script runs when MongoDB container starts for the first time

print('Starting MongoDB initialization...');

// Switch to the application database
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE || 'mern_app');

// Create application user
db.createUser({
  user: process.env.MONGO_USERNAME || 'mern_user',
  pwd: process.env.MONGO_PASSWORD || 'mern_password',
  roles: [
    {
      role: 'readWrite',
      db: process.env.MONGO_INITDB_DATABASE || 'mern_app'
    }
  ]
});

// Create sample collections with indexes
db.createCollection('users');
db.createCollection('posts');
db.createCollection('sessions');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "createdAt": 1 });

db.posts.createIndex({ "author": 1 });
db.posts.createIndex({ "createdAt": -1 });
db.posts.createIndex({ "title": "text", "content": "text" });

db.sessions.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });

// Insert sample data (optional for development)
if (process.env.NODE_ENV === 'development') {
  print('Inserting sample data for development...');
  
  // Sample user
  db.users.insertOne({
    username: 'admin',
    email: 'admin@example.com',
    password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LrUpm', // password: admin123
    role: 'admin',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  // Sample post
  db.posts.insertOne({
    title: 'Welcome to MERN Stack',
    content: 'This is a sample post created during MongoDB initialization.',
    author: 'admin',
    tags: ['mern', 'mongodb', 'express', 'react', 'nodejs'],
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

print('MongoDB initialization completed successfully!');