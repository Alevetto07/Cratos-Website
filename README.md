# Cratos CanSat — sito web

Sito statico del team **Cratos** (Liceo Scientifico Enrico Fermi, Padova) per la competizione [ESERO CanSat](https://www.esero.it/cansat/).

## Struttura progetto

```
├── index.html          # pagina principale (italiano)
├── css/style.css
├── js/main.js
├── assets/
│   ├── images/         # immagini ottimizzate per il web
│   ├── flight/         # post-flight charts, telemetry screenshots, REPORT.md
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

## Git LFS (PDF)

Large files use Git LFS:

- `assets/docs/TeamCratos_CriticalDesignReview.pdf` (~52 MB)

```bash
git lfs install
git add .gitattributes assets/docs/TeamCratos_CriticalDesignReview.pdf
```

## Sviluppo locale

Apri `index.html` nel browser oppure:

```bash
npx serve .
```

## Logo

File unico: `assets/images/logo.png` (sfondo nero). Sostituiscilo per aggiornare il brand.

## Licenza

Contenuti e immagini © Team Cratos / Liceo Enrico Fermi Padova — uso in contesto progetto educativo.
