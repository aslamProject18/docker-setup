# 🐳 Laravel Docker Module

**Modul Docker siap pakai untuk proyek Laravel dengan FrankenPHP, MySQL, Redis, dan tools development lengkap.**

## 🎯 Fitur Utama

- **FrankenPHP** - Web server modern dengan HTTP/3 support
- **Laravel Reverb** - Real-time WebSocket server untuk broadcasting
- **MySQL 8.0** - Database dengan konfigurasi optimal
- **Redis** - Caching dan queue management
- **Supervisor** - Process management untuk queue dan scheduler
- **Mailhog** - Email testing untuk development
- **phpMyAdmin** - Database management interface
- **Hot Reload** - Development dengan live reload

## 📋 Prerequisites

- Docker & Docker Compose
- Proyek Laravel yang sudah ada

## 🚀 Cara Penggunaan

### 1. Copy Modul ke Proyek Laravel

```bash
# Copy semua file dari modul ini ke root proyek Laravel Anda
cp -r docker-setup/* /path/to/your/laravel-project/
```

### 2. Setup Environment

```bash
# Copy file environment
cp .env.example .env

# Edit .env sesuai kebutuhan proyek Anda
# Pastikan konfigurasi database sesuai:
# DB_HOST=mysql
# DB_PORT=3306
# REDIS_HOST=redis
# MAIL_HOST=mailhog
```

### 3. Build dan Jalankan

```bash
# Build image Docker
docker-compose build

# Jalankan semua services
docker-compose up -d

# Install dependencies Laravel (jika belum)
docker-compose exec app composer install
docker-compose exec app npm install

# Generate key dan setup Laravel
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan storage:link

# Jalankan migrasi
docker-compose exec app php artisan migrate

# Build assets (untuk production)
docker-compose exec app npm run build

# Atau untuk development dengan hot reload
docker-compose exec app npm run dev
```

### 4. Akses Aplikasi

- **Laravel App**: http://localhost
- **Laravel Reverb**: http://localhost:8081
- **phpMyAdmin**: http://localhost:8080
- **Mailhog**: http://localhost:8025
- **MySQL**: localhost:3306
- **Redis**: localhost:6379

## 📁 Struktur File

```
your-laravel-project/
├── docker/
│   ├── frankenphp/
│   │   └── Caddyfile          # Konfigurasi web server
│   ├── mysql/
│   │   └── my.cnf             # Konfigurasi MySQL
│   └── supervisor/
│       └── supervisord.conf   # Konfigurasi process management
├── Dockerfile                 # Image definition
├── docker-compose.yaml        # Services orchestration
├── .dockerignore             # Files to ignore in build
└── .env.example              # Environment template
```

## ⚙️ Konfigurasi Environment

### Database
```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel_app
DB_USERNAME=laravel
DB_PASSWORD=password
DB_ROOT_PASSWORD=root_password
```

### Redis
```env
REDIS_HOST=redis
REDIS_PORT=6379
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
```

### Laravel Reverb (Broadcasting)
```env
BROADCAST_DRIVER=reverb
BROADCAST_CONNECTION=reverb
REVERB_APP_ID=local
REVERB_APP_KEY=local-key
REVERB_APP_SECRET=local-secret
REVERB_HOST=localhost
REVERB_PORT=8081
REVERB_SCHEME=http
```

### Mail (Development)
```env
MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
```

## 🛠️ Commands Berguna

### Development
```bash
# Masuk ke container app
docker-compose exec app bash

# Install package baru
docker-compose exec app composer require package/name
docker-compose exec app npm install package-name

# Artisan commands
docker-compose exec app php artisan migrate
docker-compose exec app php artisan make:model ModelName
docker-compose exec app php artisan queue:work

# Clear cache
docker-compose exec app php artisan cache:clear
docker-compose exec app php artisan config:clear
docker-compose exec app php artisan route:clear
docker-compose exec app php artisan view:clear
```

### Production
```bash
# Optimize untuk production
docker-compose exec app php artisan config:cache
docker-compose exec app php artisan route:cache
docker-compose exec app php artisan view:cache
docker-compose exec app composer install --optimize-autoloader --no-dev
docker-compose exec app npm run build
```

### Database
```bash
# Backup database
docker-compose exec mysql mysqldump -u root -p laravel_app > backup.sql

# Restore database
docker-compose exec -T mysql mysql -u root -p laravel_app < backup.sql

# Access MySQL CLI
docker-compose exec mysql mysql -u root -p
```

## 🔧 Customization

### Menambah PHP Extension
Edit `Dockerfile` dan tambahkan extension yang dibutuhkan:
```dockerfile
RUN docker-php-ext-install extension_name
```

### Mengubah Port
Edit `.env` file:
```env
APP_PORT=8000          # Laravel app port
REVERB_PORT=8082       # Reverb WebSocket port
DB_FORWARD_PORT=3307   # MySQL port
REDIS_FORWARD_PORT=6380 # Redis port
```

### Custom Caddyfile
Edit `docker/frankenphp/Caddyfile` untuk konfigurasi web server khusus.

## 🐛 Troubleshooting

### Permission Issues
```bash
# Fix storage permissions
docker-compose exec app chown -R www-data:www-data storage bootstrap/cache
docker-compose exec app chmod -R 775 storage bootstrap/cache
```

### Database Connection Issues
```bash
# Check if MySQL is running
docker-compose ps mysql

# Check MySQL logs
docker-compose logs mysql

# Test connection
docker-compose exec app php artisan db:show
```

### Queue Not Working
```bash
# Check supervisor status
docker-compose exec app supervisorctl status

# Restart queue workers
docker-compose exec app supervisorctl restart laravel-queue:*

# Check Reverb status
docker-compose logs reverb

# Restart Reverb
docker-compose restart reverb
```

## 📚 Tips & Best Practices

1. **Development vs Production**
   - Gunakan `npm run dev` untuk development
   - Gunakan `npm run build` untuk production
   - Set `APP_ENV=production` untuk production

2. **Database Seeding**
   - Buat seeder untuk data development
   - Gunakan factory untuk testing data

3. **Queue Management**
   - Monitor queue dengan `php artisan queue:monitor`
   - Gunakan `php artisan queue:restart` setelah deploy

4. **Caching Strategy**
   - Cache config di production
   - Gunakan Redis untuk session dan cache
   - Clear cache setelah update konfigurasi

## 🤝 Contributing

Silakan buat issue atau pull request untuk improvement.

## 📄 License

MIT License - silakan gunakan untuk proyek apapun.

---

**Happy Coding! 🚀**