# Daybook (Diary Web App)

Technologies, apps and library used:

Backend:
- [Lumen 5.8](https://lumen.laravel.com/docs/5.8)
- [Visual Studio Code 1.38](https://code.visualstudio.com)
- [Postman 7.3.6](https://www.getpostman.com)
- [TablePlus 2.3](http://tableplus.io)
- [myclabs/php-enum 1.7](https://github.com/myclabs/php-enum)
- [webpatser/laravel-uuid 3.0](https://github.com/webpatser/laravel-uuid)
- [MySQL 5](https://www.mysql.com)
- [Eloquent](https://laravel.com/docs/5.8/eloquent)
- [phpUnit](https://phpunit.de)
- [Valet](https://laravel.com/docs/5.8/valet)

Frontend:
- [Visual Studio Code 1.38](https://code.visualstudio.com)
- [Gulp 3.9.1](https://gulpjs.com)
- [HTML 5]
- [CSS 3]
- [SASS](https://sass-lang.com)
- [Jquery 1.11.2](https://jquery.com)
- [Angularjs 1.5.5](https://angularjs.org)
- [Bootstrap 3.4.1](https://getbootstrap.com/docs/3.4/)
- [Moment.js 2.24.0](https://momentjs.com)
- [grevory/angular-local-storage 0.5.2](https://github.com/grevory/angular-local-storage)
- [angular-ui-bootstrap 1.3.2](https://angular-ui.github.io/bootstrap/)
- [offline-js 0.7.14](https://github.com/HubSpot/offline)
- [animate.css 3.7.0](https://daneden.github.io/animate.css/)

## Quick Start

### Backend

```bash
cd daybook-api
composer install # install all dependencies
# configure your key, database, etc in `.env` file
php artisan migrate
php -S localhost:9000 -t public # you can also use Vault (https://laravel.com/docs/5.8/valet)
```

### Frontend

```bash
cd daybook-webui
npm install # install all dependencies
gulp # for development
grulp deploy # for deployment
```
