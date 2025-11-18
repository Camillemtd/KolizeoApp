# Kolizeo App - Expérience de développement

## 📋 Contexte

Application Next.js permettant d'afficher dynamiquement les liens officiels des clubs sportifs via Unity Remote Config.

## 🎯 Approche et réflexions

### Structure du projet

J'ai structuré le projet de manière modulaire :

- **Séparation des responsabilités** : Logique Unity dans `lib/unity/`, routes API dans `app/api/`, pages dans `app/`
- **Centralisation des types** : Tous les types TypeScript dans `types.ts`
- **Composants réutilisables** : Extraction de `ClubNotFound` pour éviter la duplication

### Choix techniques

**Next.js App Router** : Utilisation des Server Components pour récupérer les données côté serveur sans exposer d'API client.

**TypeScript** : Typage strict pour éviter les erreurs lors de l'intégration avec les APIs Unity.

**Tailwind CSS** : Rapidité de développement et cohérence du design.

## 🚧 Difficultés rencontrées

### Structure de la réponse Remote Config

La structure de la réponse était différente de ce que j'attendais. La config est imbriquée dans `data.configs.settings[configName]`. J'ai résolu cela en inspectant la réponse JSON complète et en ajustant le parsing.

### Gestion du cache du token

Initialement, je faisais un appel API Unity à chaque requête. J'ai implémenté un cache en mémoire avec vérification de l'expiration et un buffer de 5 minutes avant expiration pour éviter les tokens expirés.

### Loading states

Pendant le chargement, l'utilisateur voyait une page blanche. J'ai ajouté un skeleton loader avec `loading.tsx` de Next.js pour améliorer l'UX.

## 💡 Décisions d'architecture

### Validation des clubs

Validation explicite avec `isValidClub()` pour une meilleure UX et un contrôle total sur les clubs autorisés.

### Page d'erreur personnalisée

Composant `ClubNotFound` au lieu de `notFound()` de Next.js pour afficher les clubs disponibles et faciliter la navigation.

## 🔄 Itérations

1. **Structure basique** : Authentification et récupération de config
2. **Cache du token** : Optimisation des performances
3. **Loading states** : Amélioration de l'UX
4. **Page d'erreur personnalisée** : Meilleure gestion des erreurs
5. **Séparation des composants** : Meilleure maintenabilité


## 🎯 Conclusion

Ce projet m'a permis de faire des choix d'architecture réfléchis et d'itérer pour améliorer l'UX et les performances. Le code est structuré, typé, et prêt pour être étendu.
