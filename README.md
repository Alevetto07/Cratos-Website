# Cratos CanSat — sito web

Sito statico del team **Cratos** (Liceo Scientifico Enrico Fermi, Padova) per la competizione [ESERO CanSat](https://www.esero.it/cansat/).

## Struttura progetto

```
├── index.html          # pagina principale (italiano)
├── css/style.css
├── js/main.js
├── assets/
│   ├── images/         # immagini ottimizzate per il web
│   └── docs/           # CDR PDF
├── vercel.json
└── README.md
```

## Deploy su Vercel

1. Crea un repository GitHub da questa cartella.
2. Su [vercel.com](https://vercel.com) → **Add New Project** → importa il repo.
3. Impostazioni:
   - **Framework Preset:** Other
   - **Build Command:** *(vuoto)*
   - **Output Directory:** `.` (root)
4. Deploy.

CLI:

```bash
npx vercel
```

## Deploy su GitHub Pages (alternativa)

Il sito è statico. In **Settings → Pages** imposta source su branch `main`, cartella `/ (root)`.

## Git LFS (PDF ~52 MB)

Il CDR supera la soglia consigliata di GitHub. Prima del push:

```bash
git lfs install
git add .gitattributes assets/docs/TeamCratos_CriticalDesignReview.pdf
```

In alternativa comprimi il PDF o ospitalo esternamente e aggiorna il link in `index.html`.

## Sviluppo locale

Apri `index.html` nel browser oppure:

```bash
npx serve .
```

## Logo

File unico: `assets/images/logo.png` (sfondo nero). Sostituiscilo per aggiornare il brand.

## Licenza

Contenuti e immagini © Team Cratos / Liceo Enrico Fermi Padova — uso in contesto progetto educativo.
