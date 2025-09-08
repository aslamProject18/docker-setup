# 🚀 MERN Stack Docker Setup

**Setup Docker siap pakai untuk MERN Stack (MongoDB, Express.js, React, Node.js) dengan konfigurasi development dan production.**

## 🎯 Fitur Utama

- **MongoDB 7** - Database NoSQL dengan replica set support
- **Express.js** - Backend API framework
- **React** - Frontend library dengan hot reload
- **Node.js 20** - Runtime JavaScript
- **Redis** - Caching dan session storage
- **Mongo Express** - Database admin interface
- **Nginx** - Reverse proxy untuk production
- **Hot Reload** - Development dengan live reload

## 📋 Prerequisites

- Docker & Docker Compose
- Node.js 18+ (untuk development lokal)
- Git

## 🚀 Quick Start

### 1. Clone dan Setup

```bash
# Copy setup ke proyek Anda
cp -r docker-mern/* /path/to/your/mern-project/
cd /path/to/your/mern-project/

# Setup environment
cp .env.example .env
# Edit .env sesuai kebutuhan
```

### 2. Struktur Proyek

```
your-mern-project/
├── backend/                 # Express.js API
│   ├── src/
│   ├── package.json
│   └── server.js
├── frontend/               # React App
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── docker/
│   ├── mongodb/
│   └── nginx/
├── Dockerfile
├── docker-compose.yaml
└── .env
```

### 3. Development Mode

```bash
# Build dan jalankan semua services
docker-compose up -d

# Install dependencies (jika belum)
docker-compose exec backend npm install
docker-compose exec frontend npm install

# Lihat logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 4. Production Mode

```bash
# Build untuk production
docker-compose --profile production up -d

# Atau build React app dulu
cd frontend
npm run build
cd ..
docker-compose --profile production up -d
```

## 🌐 Akses Services

- **React App**: http://localhost:3000
- **API Backend**: http://localhost:5000
- **Mongo Express**: http://localhost:8081
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379
- **Nginx (Production)**: http://localhost:80

## ⚙️ Konfigurasi Environment

### Database
```env
MONGO_URI=mongodb://mongodb:27017
MONGO_DATABASE=mern_app
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=admin123
```

### API Configuration
```env
BACKEND_PORT=5000
API_PREFIX=/api/v1
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=http://localhost:3000
```

### Frontend
```env
FRONTEND_PORT=3000
REACT_APP_API_URL=http://localhost:5000
```

## 🛠️ Commands Berguna

### Development
```bash
# Masuk ke container
docker-compose exec backend bash
docker-compose exec frontend sh

# Install package baru
docker-compose exec backend npm install package-name
docker-compose exec frontend npm install package-name

# Restart services
docker-compose restart backend
docker-compose restart frontend

# Rebuild services
docker-compose build backend
docker-compose up -d backend
```

### Database
```bash
# MongoDB shell
docker-compose exec mongodb mongosh -u admin -p admin123

# Backup database
docker-compose exec mongodb mongodump --uri="mongodb://admin:admin123@localhost:27017/mern_app" --out=/data/backup

# Restore database
docker-compose exec mongodb mongorestore --uri="mongodb://admin:admin123@localhost:27017/mern_app" /data/backup/mern_app

# Check MongoDB logs
docker-compose logs mongodb
```

### Redis
```bash
# Redis CLI
docker-compose exec redis redis-cli

# Monitor Redis
docker-compose exec redis redis-cli monitor

# Clear Redis cache
docker-compose exec redis redis-cli FLUSHALL
```

## 📁 Struktur Backend (Express.js)

```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const redis = require('redis');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI + '/' + process.env.MONGO_DATABASE);

// Redis connection
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(process.env.BACKEND_PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.BACKEND_PORT}`);
});
```

## 📁 Struktur Frontend (React)

```javascript
// src/config/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const api = {
  baseURL: API_BASE_URL,
  endpoints: {
    auth: '/api/v1/auth',
    users: '/api/v1/users',
    posts: '/api/v1/posts'
  }
};

// src/services/apiService.js
import axios from 'axios';
import { api } from '../config/api';

const apiService = axios.create({
  baseURL: api.baseURL,
  withCredentials: true
});

export default apiService;
```

## 🔧 Customization

### Menambah Package Backend
```bash
# Masuk ke container backend
docker-compose exec backend bash

# Install package
npm install express-validator helmet morgan

# Restart container
docker-compose restart backend
```

### Menambah Package Frontend
```bash
# Masuk ke container frontend
docker-compose exec frontend sh

# Install package
npm install axios react-router-dom @mui/material

# Restart container
docker-compose restart frontend
```

### Custom Nginx Configuration
Edit `docker/nginx/nginx.conf` untuk konfigurasi khusus.

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB status
docker-compose ps mongodb

# Check MongoDB logs
docker-compose logs mongodb

# Test connection
docker-compose exec backend node -e "console.log(require('mongoose').connect('mongodb://mongodb:27017/mern_app'))"
```

### Frontend Not Loading
```bash
# Check if React dev server is running
docker-compose logs frontend

# Restart frontend
docker-compose restart frontend

# Check port conflicts
netstat -tulpn | grep :3000
```

### API Not Responding
```bash
# Check backend logs
docker-compose logs backend

# Test API endpoint
curl http://localhost:5000/health

# Check backend container
docker-compose exec backend ps aux
```

## 📚 Best Practices

1. **Environment Variables**
   - Gunakan .env untuk konfigurasi
   - Jangan commit .env ke repository
   - Gunakan .env.example sebagai template

2. **Database**
   - Gunakan indexes untuk query yang sering
   - Implement proper validation
   - Backup database secara berkala

3. **API Security**
   - Implement rate limiting
   - Validate input data
   - Use HTTPS di production
   - Implement proper authentication

4. **Frontend**
   - Optimize bundle size
   - Implement error boundaries
   - Use lazy loading untuk routes
   - Implement proper state management

## 🚀 Deployment

### Production Checklist
- [ ] Set NODE_ENV=production
- [ ] Update CORS_ORIGIN ke domain production
- [ ] Generate strong JWT_SECRET
- [ ] Setup SSL certificates
- [ ] Configure proper MongoDB credentials
- [ ] Setup monitoring dan logging
- [ ] Implement backup strategy

## 🤝 Contributing

Silakan buat issue atau pull request untuk improvement.

## 📄 License

MIT License - silakan gunakan untuk proyek apapun.

---

**Happy Coding with MERN Stack! 🚀**