const mix = require('laravel-mix');

mix.setPublicPath('./client');
mix.options({
    processCssUrls: false
});
mix.postCss('./src/index.css', './client/main.css', [
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano')({
        preset: 'default',
    }),
]);
mix.disableSuccessNotifications();