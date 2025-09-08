# 🚀 Laravel Docker Setup with Nginx

**Setup Docker siap pakai untuk Laravel dengan Nginx, PHP-FPM, MySQL, Redis, dan tools development lengkap.**

## 🎯 Fitur Utama

- **Nginx** - High-performance web server dengan optimasi Laravel
- **PHP-FPM 8.4** - PHP FastCGI Process Manager untuk performa optimal
- **Laravel Reverb** - Real-time WebSocket server untuk broadcasting
- **MySQL 8.0** - Database dengan konfigurasi optimal
- **Redis** - Caching dan queue management
- **Supervisor** - Process management untuk PHP-FPM, queue, dan scheduler
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
cp -r docker-laravel-nginx/* /path/to/your/laravel-project/
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
docker-compose --profile development up -d
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
│   ├── nginx/
│   │   └── nginx.conf          # Konfigurasi Nginx untuk Laravel
│   ├── php/
│   │   ├── php.ini             # Konfigurasi PHP
│   │   └── php-fpm.conf        # Konfigurasi PHP-FPM
│   ├── supervisor/
│   │   └── supervisord.conf    # Konfigurasi process management
│   └── mysql/
│       └── my.cnf              # Konfigurasi MySQL
├── Dockerfile                  # PHP-FPM image definition
├── docker-compose.yaml         # Services orchestration
├── .dockerignore              # Files to ignore in build
└── .env.example               # Environment template
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

### Nginx & PHP-FPM
```bash
# Check Nginx status
docker-compose exec nginx nginx -t
docker-compose logs nginx

# Reload Nginx configuration
docker-compose exec nginx nginx -s reload

# Check PHP-FPM status
docker-compose exec app php-fpm -t
curl http://localhost/fpm-status

# Monitor PHP-FPM processes
docker-compose exec app ps aux | grep php-fpm
```

### Supervisor
```bash
# Check supervisor status
docker-compose exec app supervisorctl status

# Restart specific program
docker-compose exec app supervisorctl restart laravel-queue:*
docker-compose exec app supervisorctl restart php-fpm

# View logs
docker-compose exec app supervisorctl tail -f laravel-queue
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

### Custom Nginx Configuration
Edit `docker/nginx/nginx.conf` untuk konfigurasi web server khusus.

### PHP-FPM Tuning
Edit `docker/php/php-fpm.conf` untuk optimasi performa:
```ini
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35
```

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

### Nginx Issues
```bash
# Check Nginx configuration
docker-compose exec nginx nginx -t

# Check Nginx logs
docker-compose logs nginx

# Test Nginx status
curl http://localhost/nginx-status
```

### PHP-FPM Issues
```bash
# Check PHP-FPM configuration
docker-compose exec app php-fpm -t

# Check PHP-FPM status
curl http://localhost/fpm-status

# Monitor slow queries
docker-compose exec app tail -f /var/log/php-fpm-slow.log
```

### Queue Not Working
```bash
# Check supervisor status
docker-compose exec app supervisorctl status

# Restart queue workers
docker-compose exec app supervisorctl restart laravel-queue:*

# Check queue logs
docker-compose logs app | grep queue
```

## 📊 Monitoring & Performance

### Nginx Monitoring
```bash
# Access Nginx status page
curl http://localhost/nginx-status

# Monitor access logs
docker-compose exec nginx tail -f /var/log/nginx/access.log

# Monitor error logs
docker-compose exec nginx tail -f /var/log/nginx/error.log
```

### PHP-FPM Monitoring
```bash
# Access PHP-FPM status page
curl http://localhost/fpm-status

# Detailed status with full information
curl http://localhost/fpm-status?full

# Monitor PHP-FPM slow log
docker-compose exec app tail -f /var/log/php-fpm-slow.log
```

### Performance Tuning
```bash
# Enable OPcache status (add to routes)
Route::get('/opcache-status', function() {
    return opcache_get_status();
});

# Monitor Redis
docker-compose exec redis redis-cli monitor

# Check MySQL performance
docker-compose exec mysql mysql -u root -p -e "SHOW PROCESSLIST;"
```

## 📚 Tips & Best Practices

1. **Development vs Production**
   - Gunakan `npm run dev` untuk development
   - Gunakan `npm run build` untuk production
   - Set `APP_ENV=production` untuk production
   - Enable OPcache di production

2. **Nginx Optimization**
   - Sesuaikan worker_processes dengan CPU cores
   - Tune buffer sizes sesuai kebutuhan
   - Enable gzip compression
   - Set proper cache headers

3. **PHP-FPM Optimization**
   - Monitor dan tune pm.max_children
   - Set proper memory_limit
   - Enable slow log untuk debugging
   - Use proper session handler

4. **Database Performance**
   - Create proper indexes
   - Use query optimization
   - Monitor slow queries
   - Regular database maintenance

5. **Security**
   - Keep containers updated
   - Use strong passwords
   - Implement rate limiting
   - Regular security audits

## 🚀 Deployment

### Production Checklist
- [ ] Set APP_ENV=production
- [ ] Enable OPcache
- [ ] Set proper file permissions
- [ ] Configure SSL certificates
- [ ] Setup monitoring
- [ ] Configure backup strategy
- [ ] Optimize Nginx configuration
- [ ] Tune PHP-FPM settings
- [ ] Setup log rotation

## 🤝 Contributing

Silakan buat issue atau pull request untuk improvement.

## 📄 License

MIT License - silakan gunakan untuk proyek apapun.

---

**Happy Coding with Laravel + Nginx! 🚀**