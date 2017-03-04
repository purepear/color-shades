# Color shades

> A Vue.js v2 clone of http://www.0to255.com

## [Demo](https://color-shades.surge.sh)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

Build script produces `./dist/200.hmtl` which is about ~85kb(30kb gzipped) with inlined JS and CSS. It works offline too. Meaning you can download `dist/200.hmtl` and open it in browser.


[surge.sh](https://surge.sh/help/adding-a-200-page-for-client-side-routing) needs `200.html` so it can work with pushState. Hence the filename.

## Features
 - Single file
 - `pushState` used so you can send direct url to the color you use
 - Favicon changes according to the color
 - No Flash is used to copy to clipboard

Components are written with **pug** and **stylus**