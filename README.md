# 🐳 Docker Setup Collection

**Koleksi setup Docker siap pakai untuk berbagai stack development modern. Semua setup sudah dioptimasi untuk development dan production.**

## 📦 Available Stacks

### 🐘 Laravel Stacks

#### 1. Laravel + FrankenPHP
**Lokasi**: `docker-laravel-frankenphp/`

- **FrankenPHP** - Modern web server dengan HTTP/3 support
- **Laravel Reverb** - Real-time WebSocket server
- **MySQL 8.0** - Database dengan optimasi
- **Redis** - Caching dan queue management
- **Supervisor** - Process management
- **Mailhog** - Email testing
- **phpMyAdmin** - Database admin

```bash
cd docker-laravel-frankenphp
cp .env.example .env
docker-compose up -d
```

#### 2. Laravel + Nginx
**Lokasi**: `docker-laravel-nginx/`

- **Nginx** - High-performance web server
- **PHP-FPM 8.4** - FastCGI Process Manager
- **Laravel Reverb** - Real-time WebSocket server
- **MySQL 8.0** - Database dengan optimasi
- **Redis** - Caching dan queue management
- **Supervisor** - Process management
- **Mailhog** - Email testing
- **phpMyAdmin** - Database admin

```bash
cd docker-laravel-nginx
cp .env.example .env
docker-compose build
docker-compose up -d
```

### ⚛️ JavaScript Stacks

#### 3. MERN Stack
**Lokasi**: `docker-mern/`

- **MongoDB 7** - NoSQL database
- **Express.js** - Backend API framework
- **React** - Frontend library
- **Node.js 20** - JavaScript runtime
- **Redis** - Caching dan sessions
- **Mongo Express** - Database admin
- **Nginx** - Reverse proxy (production)

```bash
cd docker-mern
cp .env.example .env
docker-compose up -d
```

#### 4. MEVN Stack
**Lokasi**: `docker-mevn/`

- **MongoDB 7** - NoSQL database
- **Express.js** - Backend API framework
- **Vue.js 3** - Progressive frontend framework
- **Node.js 20** - JavaScript runtime
- **Vite** - Build tool untuk Vue.js
- **Redis** - Caching dan sessions
- **Mongo Express** - Database admin
- **Nginx** - Reverse proxy (production)

```bash
cd docker-mevn
cp .env.example .env
docker-compose up -d
```

## 🚀 Quick Start Guide

### 1. Pilih Stack yang Diinginkan

```bash
# Untuk Laravel dengan FrankenPHP
cp -r docker-laravel-frankenphp/* /path/to/your/laravel-project/

# Untuk Laravel dengan Nginx
cp -r docker-laravel-nginx/* /path/to/your/laravel-project/

# Untuk MERN Stack
cp -r docker-mern/* /path/to/your/mern-project/

# Untuk MEVN Stack
cp -r docker-mevn/* /path/to/your/mevn-project/
```

### 2. Setup Environment

```bash
cd /path/to/your/project/
cp .env.example .env
# Edit .env sesuai kebutuhan
```

### 3. Build dan Jalankan

```bash
# Build (jika diperlukan)
docker-compose build

# Jalankan semua services
docker-compose up -d

# Install dependencies
# Untuk Laravel:
docker-compose exec app composer install
docker-compose exec app npm install

# Untuk MERN/MEVN:
docker-compose exec backend npm install
docker-compose exec frontend npm install
```

## 🌐 Default Ports

### Laravel Stacks
- **Laravel App**: http://localhost:80
- **Laravel Reverb**: http://localhost:8081
- **phpMyAdmin**: http://localhost:8080
- **Mailhog**: http://localhost:8025
- **MySQL**: localhost:3306
- **Redis**: localhost:6379

### MERN/MEVN Stacks
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Mongo Express**: http://localhost:8081
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379
- **Nginx (Production)**: http://localhost:80

## 📁 Struktur Umum

```
stack-folder/
├── Dockerfile              # Container definition
├── docker-compose.yaml     # Services orchestration
├── .env.example           # Environment template
├── .dockerignore          # Build optimization
├── README.md              # Panduan spesifik stack
└── docker/                # Konfigurasi services
    ├── nginx/             # Nginx config (jika ada)
    ├── php/               # PHP config (Laravel)
    ├── mysql/             # MySQL config (Laravel)
    ├── mongodb/           # MongoDB config (MERN/MEVN)
    └── supervisor/        # Process management
```

## ⚙️ Environment Variables

### Laravel (.env)
```env
# Application
APP_NAME="Laravel App"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

# Database
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel_app
DB_USERNAME=laravel
DB_PASSWORD=password

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Broadcasting (Reverb)
BROADCAST_DRIVER=reverb
REVERB_HOST=localhost
REVERB_PORT=8081
```

### MERN/MEVN (.env)
```env
# Application
APP_NAME="MERN/MEVN App"
NODE_ENV=development
API_URL=http://localhost:5000

# Database
MONGO_URI=mongodb://mongodb:27017
MONGO_DATABASE=app_database
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=admin123

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# JWT
JWT_SECRET=your-jwt-secret
```

## 🛠️ Common Commands

### Development
```bash
# Lihat status containers
docker-compose ps

# Lihat logs
docker-compose logs -f [service_name]

# Masuk ke container
docker-compose exec [service_name] bash

# Restart service
docker-compose restart [service_name]

# Stop semua services
docker-compose down

# Stop dan hapus volumes
docker-compose down -v
```

### Laravel Specific
```bash
# Artisan commands
docker-compose exec app php artisan migrate
docker-compose exec app php artisan make:model ModelName
docker-compose exec app php artisan queue:work

# Composer
docker-compose exec app composer install
docker-compose exec app composer require package/name

# NPM
docker-compose exec app npm install
docker-compose exec app npm run dev
```

### MERN/MEVN Specific
```bash
# Backend commands
docker-compose exec backend npm install
docker-compose exec backend npm start

# Frontend commands
docker-compose exec frontend npm install
docker-compose exec frontend npm run dev

# Database
docker-compose exec mongodb mongosh
```

## 🔧 Customization

### Mengubah Port
Edit file `.env`:
```env
# Laravel
APP_PORT=8000
DB_FORWARD_PORT=3307
REDIS_FORWARD_PORT=6380

# MERN/MEVN
FRONTEND_PORT=3001
BACKEND_PORT=5001
MONGO_PORT=27018
```

### Menambah Service
Edit `docker-compose.yaml` dan tambahkan service baru:
```yaml
services:
  new-service:
    image: service-image:tag
    container_name: app-new-service
    ports:
      - "8080:80"
    networks:
      - app-network
```

### Custom Configuration
Setiap stack memiliki folder `docker/` dengan konfigurasi yang bisa disesuaikan:
- **Nginx**: `docker/nginx/nginx.conf`
- **PHP**: `docker/php/php.ini`
- **MySQL**: `docker/mysql/my.cnf`
- **MongoDB**: `docker/mongodb/init-mongo.js`

## 🐛 Troubleshooting

### Port Conflicts
```bash
# Check port usage
netstat -tulpn | grep :80

# Change ports in .env file
APP_PORT=8080
```

### Permission Issues
```bash
# Fix Laravel storage permissions
docker-compose exec app chown -R www-data:www-data storage bootstrap/cache
docker-compose exec app chmod -R 775 storage bootstrap/cache
```

### Database Connection
```bash
# Check database status
docker-compose ps mysql  # Laravel
docker-compose ps mongodb # MERN/MEVN

# Check logs
docker-compose logs mysql
docker-compose logs mongodb
```

### Container Issues
```bash
# Rebuild containers
docker-compose build --no-cache

# Remove all containers and volumes
docker-compose down -v
docker system prune -a
```

## 📊 Monitoring

### Health Checks
```bash
# Laravel
curl http://localhost/health

# MERN/MEVN
curl http://localhost:5000/health
```

### Service Status
```bash
# Nginx status (Laravel Nginx)
curl http://localhost/nginx-status

# PHP-FPM status (Laravel Nginx)
curl http://localhost/fpm-status

# MongoDB status
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"
```

## 🚀 Production Deployment

### Laravel
```bash
# Set production environment
APP_ENV=production
APP_DEBUG=false

# Optimize Laravel
docker-compose exec app php artisan config:cache
docker-compose exec app php artisan route:cache
docker-compose exec app php artisan view:cache
docker-compose exec app composer install --optimize-autoloader --no-dev
```

### MERN/MEVN
```bash
# Build for production
docker-compose --profile production up -d

# Or build frontend first
cd frontend
npm run build
cd ..
docker-compose --profile production up -d
```

## 📚 Best Practices

1. **Environment Management**
   - Gunakan `.env` untuk konfigurasi
   - Jangan commit `.env` ke repository
   - Gunakan `.env.example` sebagai template

2. **Security**
   - Update containers secara berkala
   - Gunakan strong passwords
   - Implement rate limiting
   - Regular security audits

3. **Performance**
   - Monitor resource usage
   - Optimize database queries
   - Use proper caching strategies
   - Regular maintenance

4. **Development**
   - Use version control
   - Document changes
   - Test before deployment
   - Backup important data

## 🤝 Contributing

Silakan buat issue atau pull request untuk:
- Bug fixes
- Feature improvements
- Documentation updates
- New stack additions

## 📄 License

MIT License - silakan gunakan untuk proyek apapun.

---

## 📞 Support

Jika mengalami masalah:
1. Baca README.md di folder stack yang digunakan
2. Check troubleshooting section
3. Lihat logs dengan `docker-compose logs`
4. Buat issue di repository

**Happy Coding with Docker! 🚀**