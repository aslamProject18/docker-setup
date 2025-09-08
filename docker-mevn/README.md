# 🚀 MEVN Stack Docker Setup

**Setup Docker siap pakai untuk MEVN Stack (MongoDB, Express.js, Vue.js, Node.js) dengan konfigurasi development dan production.**

## 🎯 Fitur Utama

- **MongoDB 7** - Database NoSQL dengan replica set support
- **Express.js** - Backend API framework
- **Vue.js 3** - Progressive frontend framework dengan Composition API
- **Node.js 20** - Runtime JavaScript
- **Vite** - Build tool yang cepat untuk Vue.js
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
cp -r docker-mevn/* /path/to/your/mevn-project/
cd /path/to/your/mevn-project/

# Setup environment
cp .env.example .env
# Edit .env sesuai kebutuhan
```

### 2. Struktur Proyek

```
your-mevn-project/
├── backend/                 # Express.js API
│   ├── src/
│   ├── package.json
│   └── server.js
├── frontend/               # Vue.js App
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

# Atau build Vue app dulu
cd frontend
npm run build
cd ..
docker-compose --profile production up -d
```

## 🌐 Akses Services

- **Vue.js App**: http://localhost:3000
- **API Backend**: http://localhost:5000
- **Mongo Express**: http://localhost:8081
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379
- **Nginx (Production)**: http://localhost:80

## ⚙️ Konfigurasi Environment

### Database
```env
MONGO_URI=mongodb://mongodb:27017
MONGO_DATABASE=mevn_app
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

### Frontend (Vue.js)
```env
FRONTEND_PORT=3000
VITE_API_URL=http://localhost:5000
VITE_APP_TITLE="MEVN Stack App"
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
docker-compose exec mongodb mongodump --uri="mongodb://admin:admin123@localhost:27017/mevn_app" --out=/data/backup

# Restore database
docker-compose exec mongodb mongorestore --uri="mongodb://admin:admin123@localhost:27017/mevn_app" /data/backup/mevn_app

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

## 📁 Struktur Frontend (Vue.js)

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  define: {
    __VUE_PROD_DEVTOOLS__: false
  }
})

// src/config/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

## 🎨 Vue.js Best Practices

### Composition API Example
```vue
<template>
  <div class="user-list">
    <h2>{{ title }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="user in users" :key="user.id" class="user-card">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiService from '@/services/apiService'

// Reactive data
const title = ref('User List')
const users = ref([])
const loading = ref(false)

// Methods
const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await apiService.get('/api/v1/users')
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchUsers()
})
</script>
```

### Pinia Store Example
```javascript
// src/stores/auth.js
import { defineStore } from 'pinia'
import apiService from '@/services/apiService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user
  },
  
  actions: {
    async login(credentials) {
      try {
        const response = await apiService.post('/api/v1/auth/login', credentials)
        this.token = response.data.token
        this.user = response.data.user
        this.isAuthenticated = true
        localStorage.setItem('token', this.token)
        return response.data
      } catch (error) {
        throw error
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    }
  }
})
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
npm install axios pinia vue-router @vueuse/core

# Restart container
docker-compose restart frontend
```

### Vue.js Plugins
```bash
# Install popular Vue.js plugins
npm install @vue/router pinia
npm install @headlessui/vue @heroicons/vue
npm install tailwindcss @tailwindcss/forms
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB status
docker-compose ps mongodb

# Check MongoDB logs
docker-compose logs mongodb

# Test connection
docker-compose exec backend node -e "console.log(require('mongoose').connect('mongodb://mongodb:27017/mevn_app'))"
```

### Vue.js Not Loading
```bash
# Check if Vite dev server is running
docker-compose logs frontend

# Restart frontend
docker-compose restart frontend

# Check Vite config
docker-compose exec frontend cat vite.config.js
```

### API Not Responding
```bash
# Check backend logs
docker-compose logs backend

# Test API endpoint
curl http://localhost:5000/health

# Check CORS configuration
curl -H "Origin: http://localhost:3000" http://localhost:5000/api/v1/users
```

## 📚 Best Practices

1. **Vue.js Development**
   - Gunakan Composition API untuk logic yang kompleks
   - Implement proper TypeScript support
   - Use Pinia untuk state management
   - Implement proper error handling

2. **Performance**
   - Lazy load routes dan components
   - Optimize bundle size dengan tree shaking
   - Use virtual scrolling untuk list panjang
   - Implement proper caching strategy

3. **Security**
   - Validate input di frontend dan backend
   - Implement proper authentication
   - Use HTTPS di production
   - Sanitize user input

4. **Development**
   - Use ESLint dan Prettier
   - Implement proper testing
   - Use environment variables
   - Document API endpoints

## 🚀 Deployment

### Production Checklist
- [ ] Set NODE_ENV=production
- [ ] Build Vue.js app dengan `npm run build`
- [ ] Update CORS_ORIGIN ke domain production
- [ ] Generate strong JWT_SECRET
- [ ] Setup SSL certificates
- [ ] Configure proper MongoDB credentials
- [ ] Setup monitoring dan logging
- [ ] Implement backup strategy
- [ ] Optimize Vue.js bundle size

## 🤝 Contributing

Silakan buat issue atau pull request untuk improvement.

## 📄 License

MIT License - silakan gunakan untuk proyek apapun.

---

**Happy Coding with MEVN Stack! 🚀**