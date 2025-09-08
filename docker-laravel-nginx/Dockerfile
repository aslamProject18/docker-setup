FROM php:8.4-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    zip \
    unzip \
    supervisor \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    icu-dev \
    oniguruma-dev \
    && rm -rf /var/cache/apk/*

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
    pdo_mysql \
    pdo_pgsql \
    mbstring \
    xml \
    zip \
    bcmath \
    gd \
    intl \
    opcache \
    pcntl \
    posix \
    sockets \
    exif \
    fileinfo

# Install Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Install Node.js (20.x LTS)
RUN apk add --no-cache nodejs npm

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application code (akan di-mount sebagai volume)
# COPY . .

# Copy PHP configuration
COPY docker/php/php.ini /usr/local/etc/php/conf.d/custom.ini
COPY docker/php/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

# Copy supervisor configuration
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Create directories
RUN mkdir -p /var/log/supervisor /run/php

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port
EXPOSE 9000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD php-fpm-healthcheck || exit 1

# Start supervisor (manages PHP-FPM and queue workers)
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]