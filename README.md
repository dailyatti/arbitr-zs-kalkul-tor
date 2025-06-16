# Arbitrázs Kalkulátor

Professzionális sport arbitrázs kalkulátor Node.js + Express alapon.

## Fájlstruktúra

```
project-root/
├── public/
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── server.js
├── package.json
└── README.md
```

## Telepítés és futtatás

1. Függőségek telepítése:
   ```bash
   npm install
   ```
2. Szerver indítása:
   ```bash
   npm start
   ```
3. Alapértelmezett elérési út: [http://localhost:3000](http://localhost:3000)

## Deploy Render.com-ra
- A `Build Command` legyen üres vagy: `npm install`
- A `Start Command`: `npm start`
- A statikus fájlokat a `public` mappába tedd!

## Biztonság
- Helmet middleware a biztonságért
- Compression middleware a gyorsabb betöltésért

## Hibakezelés
- 404 és 500-as hibák kezelése szerver oldalon

## Szerző
- dailyatti 