

# Blog API - Laravel Backend

Bu API, blog uygulaması için gerekli tüm backend işlevlerini sağlar.

## Özellikler

- JWT tabanlı kimlik doğrulama sistemi
- Blog gönderilerinin CRUD işlemleri
- Kullanıcı yönetimi

## Kurulum

1. Bağımlılıkları yükleyin:
   ```
   composer install
   ```

2. `.env` dosyasını oluşturun:
   ```
   cp .env.example .env
   ```

3. Uygulama anahtarını oluşturun:
   ```
   php artisan key:generate
   ```

4. Veritabanı yapılandırması:
   ```
   php artisan migrate
   ```

5. JWT anahtarını oluşturun:
   ```
   php artisan jwt:secret
   ```

6. Sunucuyu başlatın:
   ```
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
- `POST /api/posts` - Yeni gönderi oluştur (kimlik doğrulama gerekli)
- `PUT /api/posts/{id}` - Gönderiyi güncelle (kimlik doğrulama gerekli)
- `DELETE /api/posts/{id}` - Gönderiyi sil (kimlik doğrulama gerekli)

## Postman Koleksiyonu Kullanımı

API'yi test etmek için aşağıdaki adımları izleyin:

1. `server/postman/blog_api.json` dosyasını Postman'e aktarın
2. Koleksiyonun değişkenlerini düzenleyin:
   - `base_url`: API'nizin çalıştığı URL (varsayılan: http://localhost:8000)
3. Önce "Register" veya "Login" isteğini kullanarak bir token alın
4. Dönen yanıttaki token'ı kopyalayın ve koleksiyon değişkenlerindeki `token` değişkenine ekleyin
5. Artık kimlik doğrulama gerektiren istekleri kullanabilirsiniz

Koleksiyon, tüm API endpointlerini içerir ve örneklerle birlikte gelmektedir.
