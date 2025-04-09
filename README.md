# Blog Application

Modern bir blog uygulaması - React frontend ve Laravel backend.

## Özellikler

- JWT tabanlı kimlik doğrulama
- Blog gönderilerinin CRUD işlemleri
- Kullanıcı profil yönetimi
- Responsive tasarım
- Modern UI/UX

## Teknolojiler

### Frontend
- React 19
- React Router v6
- Tailwind CSS
- Vite
- Bun paket yöneticisi

### Backend
- Laravel 11
- JWT Authentication
- SQLite veya MySQL veritabanı
- RESTful API

## Kurulum

### Ön Gereksinimler
- Bun >= 1.0.0
- PHP >= 8.2
- Composer
- SQLite veya MySQL veritabanı

### Frontend (Client)

```bash
# Client dizinine git
cd client

# Bağımlılıkları yükle
bun install

# .env dosyasını oluştur
cp .env.example .env

# Geliştirme sunucusunu başlat
bun dev
```

### Backend (Server)

```bash
# Server dizinine git
cd server

# Bağımlılıkları yükle
composer install

# .env dosyasını oluştur
cp .env.example .env

# Uygulama anahtarını oluştur
php artisan key:generate

# JWT secret anahtarını oluştur
php artisan jwt:secret

# Veritabanını oluştur
php artisan migrate

# API sunucusunu başlat
php artisan serve
```

## API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/logout` - Kullanıcı çıkışı
- `GET /api/auth/user` - Giriş yapmış kullanıcı bilgisi

### Blog Gönderileri
- `GET /api/posts` - Tüm gönderileri listele
- `GET /api/posts/{id}` - Belirli bir gönderiyi görüntüle
- `POST /api/posts` - Yeni gönderi oluştur
- `PUT /api/posts/{id}` - Gönderiyi güncelle
- `DELETE /api/posts/{id}` - Gönderiyi sil

## Geliştirme

### Frontend Yapısı
```
client/
├── src/
│   ├── components/     # Yeniden kullanılabilir bileşenler
│   ├── contexts/       # React context'leri
│   ├── pages/         # Sayfa bileşenleri
│   ├── services/      # API servisleri
│   └── hooks/         # Custom React hooks
```

### Backend Yapısı
```
server/
├── app/
│   ├── Http/
│   │   ├── Controllers/  # API controller'ları
│   │   └── Middleware/   # Custom middleware'ler
│   └── Models/          # Eloquent modeller
├── routes/
│   └── api.php         # API route tanımları
└── database/
    └── migrations/     # Veritabanı migrasyonları
```

## Project Structure

- `blog-client`: React client application
- `blog-api`: Laravel API
- `blog-api`: Laravel API
