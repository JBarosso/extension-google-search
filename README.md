# 🚀 Google Search Console Side Panel Extension

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-4285F4?logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)

Une extension Google Chrome moderne permettant de consulter et d'exporter vos données Google Search Console directement depuis un panneau latéral (Side Panel).

---

## ✨ Fonctionnalités

- **🌐 Panneau Latéral** : Intégration native dans le navigateur via l'API Side Panel.
- **🔐 Authentification Sécurisée** : Connexion via Google OAuth2 (API Chrome Identity).
- **📊 Visualisation des Données** :
  - Sélection des propriétés (sites) vérifiées.
  - Filtres de dates (7j, 28j, 3 mois, personnalisé).
  - Tableau interactif (Requêtes, Clics, Impressions, CTR, Position).
- **🌗 Mode Sombre/Clair** : Support natif du thème système et bascule manuelle.
- **📥 Export JSON** : Téléchargement des données brutes pour analyse externe.

---

## 🛠️ Prérequis

- **Node.js** (v18+)
- **NPM**
- Un compte **Google Cloud Platform** (pour l'API Search Console)

---

## 🚀 Installation & Développement

### 1. Cloner et Installer

```bash
git clone https://github.com/votre-user/extension-google-search.git
cd extension-google-search
npm install
```

### 2. Configurer Google Cloud (OAuth2)

Pour que l'authentification fonctionne, vous devez configurer un ID Client OAuth :

1. Aller sur la [Google Cloud Console](https://console.cloud.google.com/).
2. Activer l'API **Google Search Console API**.
3. Dans **APIs & Services > Credentials**, créer un **OAuth Client ID**.
4. Choisir **Chrome Extension**.
5. Coller l'ID de votre extension (voir étape 3 ci-dessous pour l'obtenir).
6. Copier le `Client ID` généré.
7. Ouvrir `public/manifest.json` et remplacer :
   ```json
   "client_id": "VOTRE_CLIENT_ID.apps.googleusercontent.com"
   ```

### 3. Builder et Charger dans Chrome

1. Compiler le projet :
   ```bash
   npm run build
   ```
2. Ouvrir Chrome et aller sur `chrome://extensions`.
3. Activer le **Mode développeur** (en haut à droite).
4. Cliquer sur **Charger l'extension non empaquetée** (*Load unpacked*).
5. Sélectionner le dossier `dist` du projet.
6. **Note :** Une fois chargée, copiez l'ID de l'extension affiché sur la carte (ex : `abcdef...`) pour finaliser l'étape 2 si ce n'est pas déjà fait.

---

## 📦 Scripts Disponibles

- `npm run dev` : Lance le serveur de développement Vite (utile pour le HMR des parties UI hors Chrome API).
- `npm run build` : Compile l'extension pour la production (TypeScript -> JS, Assets).
- `npm run preview` : Prévisualisation locale du build.

---

## 📂 Structure du Projet

```
├── public/              # Fichiers statiques (manifest, icons)
├── src/
│   ├── components/      # Composants React (Header, DataTable, etc.)
│   ├── hooks/           # Custom Hooks (useAuth, useSearchConsole)
│   ├── services/        # Services API & Auth
│   ├── types/           # Définitions TypeScript
│   ├── App.tsx          # Composant principal
│   └── main.tsx         # Point d'entrée
├── dist/                # Dossier de build (à charger dans Chrome)
└── vite.config.ts       # Configuration Vite (Multi-entry setup)
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une Issue ou une Pull Request.

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.
