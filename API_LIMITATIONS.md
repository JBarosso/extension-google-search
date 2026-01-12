# Limitations de l'API Google Search Console & Solutions

Ce document explique les contraintes techniques imposées par Google concernant la récupération des erreurs d'indexation et la solution mise en place.

## 🔴 Le Problème : Récupérer la liste des erreurs (404, 500...)

Il est **impossible** via l'API publique actuelle (`Google Search Console API v3`) de récupérer la liste complète des URLs en erreur (le rapport "Pages" ou "Couverture" visible dans l'interface GSC).

### Pourquoi ?
*   Google a **supprimé** les endpoints permettant de lister les "Crawl Errors" il y a plusieurs années.
*   Ces données sont réservées à l'interface web de la Search Console ou à l'export manuel (CSV/Excel).
*   L'API ne fournit que les **Performances** (Clics, Impressions) et les **Sitemaps**.

### Ce que l'API NE PEUT PAS faire :
*   ❌ "Donne-moi toutes les pages en 404 sur mon site".
*   ❌ "Liste toutes les pages exclues par la balise noindex".
*   ❌ "Donne-moi les erreurs serveur (5xx)".

---

## 🟢 La Solution : L'Inspecteur d'URL (URL Inspection API)

Pour contourner cette limitation, nous avons implémenté un **Inspecteur d'URL**.

### Principe
Au lieu de demander à Google "Quelles sont mes erreurs ?", nous lui donnons une liste d'URLs (par exemple issues de votre Sitemap ou d'un crawl Screaming Frog) et nous lui demandons : "**Quel est le statut de CETTE url ?**".

### Comment l'utiliser avec l'extension ?
1.  **Récupérez vos URLs** : Exportez votre Sitemap ou la liste de vos pages depuis votre CMS/Crawler.
2.  **Collez-les dans l'extension** : Onglet "Inspecteur".
3.  **Lancez l'analyse** : L'extension va interroger Google pour chaque URL.
4.  **Résultat** : Vous obtiendrez le statut précis pour chaque ligne (Indexée, Non indexée, Erreur 404 détectée par Google, etc.).

### Quotas & Limites
*   L'API d'inspection est limitée à **2 000 requêtes par jour** et par propriété.
*   L'outil est donc idéal pour vérifier des lots d'URLs spécifiques ou des nouvelles pages, mais pas pour auditer un site de 100 000 pages en une fois (pour cela, l'export BigQuery est nécessaire).
