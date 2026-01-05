# Billzen - Générateur de Factures Professionnelles

**Billzen** est une application web moderne de génération de factures professionnelles développée en HTML/CSS/JavaScript vanilla. Créez des factures élégantes et personnalisables en quelques clics.

## 🎨 Fonctionnalités

- **Création de factures au format A4** avec mise en page professionnelle
- **7 thèmes prédéfinis** avec prévisualisation en temps réel
- **Gestion complète des informations d'entreprise** avec upload de logo
- **Articles et prestations horaires** avec calculs automatiques
- **Personnalisation avancée** : couleurs, polices, textes
- **Export PDF et JPG** haute qualité sans watermark
- **Interface responsive** adaptée à tous les écrans
- Support multi-devises
- Thèmes personnalisables
- Export PDF et JPG côté client
- Traitement 100% local (aucune donnée envoyée vers un serveur)

## Structure du Projet

```
├── index.html                 # Page principale
├── css/
│   └── main.css              # Styles principaux
├── js/
│   ├── models/
│   │   └── state.js          # Gestionnaire d'état global
│   ├── calculators/
│   │   ├── ItemCalculator.js     # Calculs d'articles
│   │   ├── HourlyCalculator.js   # Calculs horaires
│   │   └── TotalCalculator.js    # Calculs de totaux
│   ├── managers/
│   │   ├── InvoiceManager.js     # Gestionnaire de factures
│   │   ├── ThemeManager.js       # Gestionnaire de thèmes
│   │   └── CurrencyManager.js    # Gestionnaire de devises
│   ├── engines/
│   │   ├── PDFEngine.js          # Moteur d'export PDF
│   │   └── ImageEngine.js        # Moteur d'export image
│   └── invoice-engine.js         # Moteur principal
├── tests/
│   ├── test-runner.html          # Interface de test
│   ├── simple-test-framework.js  # Framework de test
│   └── browser-tests.js          # Tests principaux
└── package.json              # Configuration du projet
```

## Installation et Utilisation

### Développement Local

1. Cloner le projet
2. Ouvrir `index.html` dans un navigateur moderne
3. Ou utiliser un serveur local :
   ```bash
   python -m http.server 8000
   ```
   Puis ouvrir http://localhost:8000

### Tests

Ouvrir `tests/test-runner.html` dans un navigateur pour exécuter les tests.

## Architecture

L'application suit une architecture modulaire avec :

- **Gestionnaire d'État** : Centralise les données de l'application
- **Calculateurs** : Logique métier pour les calculs financiers
- **Gestionnaires** : Orchestrent les fonctionnalités principales
- **Moteurs** : Gèrent les exports et le rendu

## Technologies

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Export PDF** : html2pdf.js
- **Export Image** : html2canvas
- **Tests** : Framework de test personnalisé (compatible navigateur)

## Compatibilité

- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Desktop (priorité) et mobile (prévisualisation)
- Traitement 100% côté client

## Sécurité et Confidentialité

- Aucune donnée envoyée vers un serveur
- Traitement entièrement local
- Aucune persistance des données après fermeture

## Développement

Le projet suit les spécifications définies dans `.kiro/specs/invoice-generator/` :
- `requirements.md` : Exigences fonctionnelles
- `design.md` : Architecture et conception
- `tasks.md` : Plan d'implémentation

## Licence

MIT License