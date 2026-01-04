# Document des Exigences

## Introduction

Le générateur de factures professionnelles est une application web permettant aux entreprises, freelances et PME de créer des factures A4 esthétiques, personnalisables et conformes aux standards business. L'application génère des factures exportables en PDF et image sans stockage des données utilisateur.

## Glossaire

- **Système**: Le générateur de factures professionnelles
- **Utilisateur**: Freelance, PME, consultant ou prestataire utilisant l'application
- **Facture**: Document commercial A4 contenant les informations de facturation
- **Article**: Produit ou service avec référence, description, quantité et prix
- **Prestation_Horaire**: Service facturé à l'heure avec taux horaire et durée
- **Thème**: Ensemble prédéfini de couleurs, polices et mise en page
- **Export**: Génération d'un fichier PDF ou image de la facture

## Exigences

### Exigence 1: Création de Factures

**User Story:** En tant qu'utilisateur, je veux créer des factures professionnelles au format A4, afin de facturer mes clients de manière professionnelle.

#### Critères d'Acceptation

1. LE Système DOIT générer des factures au format A4 (210 × 297 mm)
2. QUAND une facture est créée, LE Système DOIT structurer le document avec en-tête, corps et pied de page distincts
3. LE Système DOIT adapter les marges pour l'impression
4. QUAND l'utilisateur visualise la facture à l'écran, LE Système DOIT garantir un rendu fidèle à l'impression

### Exigence 2: Informations d'Entreprise

**User Story:** En tant qu'utilisateur, je veux saisir les informations de mon entreprise, afin qu'elles apparaissent sur mes factures.

#### Critères d'Acceptation

1. LE Système DOIT permettre la saisie du nom de l'entreprise
2. LE Système DOIT permettre l'upload d'un logo d'entreprise
3. LE Système DOIT permettre la saisie des coordonnées complètes de l'entreprise
4. LE Système DOIT permettre la saisie d'informations légales dans un champ libre
5. LE Système DOIT permettre la saisie d'un numéro de facture
6. QUAND une facture est créée, LE Système DOIT automatiquement ajouter la date et l'heure courantes

### Exigence 3: Gestion des Articles

**User Story:** En tant qu'utilisateur, je veux ajouter des articles à ma facture, afin de facturer des produits ou services standards.

#### Critères d'Acceptation

1. QUAND un article est ajouté, LE Système DOIT exiger une référence article
2. QUAND un article est ajouté, LE Système DOIT exiger une description
3. QUAND un article est ajouté, LE Système DOIT exiger une quantité
4. QUAND un article est ajouté, LE Système DOIT exiger un prix unitaire
5. LE Système DOIT permettre l'ajout d'une remise en pourcentage pour chaque article
6. LE Système DOIT permettre l'ajout d'un taux de TVA en pourcentage pour chaque article
7. QUAND les informations d'un article sont saisies, LE Système DOIT calculer automatiquement le total de la ligne

### Exigence 4: Gestion des Prestations Horaires

**User Story:** En tant qu'utilisateur, je veux facturer des prestations horaires, afin de facturer mes services basés sur le temps.

#### Critères d'Acceptation

1. QUAND une prestation horaire est ajoutée, LE Système DOIT exiger une description de prestation
2. QUAND une prestation horaire est ajoutée, LE Système DOIT exiger le nombre d'heures
3. QUAND une prestation horaire est ajoutée, LE Système DOIT exiger un taux horaire
4. QUAND les informations d'une prestation horaire sont saisies, LE Système DOIT calculer automatiquement le total (Heures × Taux horaire)
5. LE Système DOIT permettre de mélanger articles et prestations horaires sur une même facture

### Exigence 5: Calculs Automatiques

**User Story:** En tant qu'utilisateur, je veux que les calculs soient automatiques, afin d'éviter les erreurs de calcul.

#### Critères d'Acceptation

1. LE Système DOIT calculer automatiquement le sous-total HT
2. LE Système DOIT calculer automatiquement le total des remises
3. LE Système DOIT calculer automatiquement le total de la TVA
4. LE Système DOIT calculer automatiquement le total TTC final
5. QUAND une modification est apportée à un élément de la facture, LE Système DOIT mettre à jour tous les calculs en temps réel

### Exigence 6: Gestion Multi-Devises

**User Story:** En tant qu'utilisateur, je veux choisir la devise de ma facture, afin de facturer dans différentes monnaies selon mes clients.

#### Critères d'Acceptation

1. LE Système DOIT proposer un sélecteur de devises global
2. LE Système DOIT inclure toutes les devises mondiales selon la norme ISO 4217
3. LE Système DOIT définir EUR (€) comme devise par défaut
4. LE Système DOIT permettre de configurer la position du symbole monétaire (gauche/droite)
5. LE Système DOIT formater les nombres selon les conventions locales de la devise sélectionnée

### Exigence 7: Personnalisation Graphique

**User Story:** En tant qu'utilisateur, je veux personnaliser l'apparence de mes factures, afin qu'elles reflètent l'identité de mon entreprise.

#### Critères d'Acceptation

1. LE Système DOIT proposer une bibliothèque de polices professionnelles (sans-serif, serif, monospace)
2. LE Système DOIT proposer 5 à 10 thèmes professionnels prédéfinis
3. QUAND un thème est sélectionné, LE Système DOIT appliquer automatiquement les couleurs, typographie et mise en page associées
4. LE Système DOIT permettre la personnalisation de la couleur du texte
5. LE Système DOIT permettre la personnalisation du fond de facture
6. LE Système DOIT proposer un toggle pour les majuscules automatiques
7. LE Système DOIT permettre l'édition des titres de colonnes
8. LE Système DOIT permettre l'édition du texte de pied de page
9. LE Système DOIT permettre la saisie du mode de paiement

### Exigence 8: Export et Téléchargement

**User Story:** En tant qu'utilisateur, je veux exporter mes factures en PDF et image, afin de les envoyer à mes clients ou les imprimer.

#### Critères d'Acceptation

1. QUAND l'utilisateur demande un export PDF, LE Système DOIT générer un fichier PDF au format A4
2. QUAND l'utilisateur demande un export image, LE Système DOIT générer un fichier JPG haute résolution
3. LE Système DOIT garantir un rendu fidèle à l'affichage écran dans les exports
4. LE Système DOIT générer les exports sans watermark
5. LE Système DOIT traiter les exports côté client sans envoi de données vers un serveur

### Exigence 9: Performance et Réactivité

**User Story:** En tant qu'utilisateur, je veux une application rapide et réactive, afin de créer mes factures efficacement.

#### Critères d'Acceptation

1. LE Système DOIT effectuer tous les calculs instantanément
2. QUAND l'application se charge, LE Système DOIT être prêt en moins de 2 secondes
3. QUAND l'utilisateur modifie un élément, LE Système DOIT mettre à jour l'affichage en temps réel

### Exigence 10: Sécurité et Confidentialité

**User Story:** En tant qu'utilisateur, je veux que mes données restent privées, afin de protéger les informations de mon entreprise et de mes clients.

#### Critères d'Acceptation

1. LE Système NE DOIT stocker aucune donnée utilisateur sur un serveur
2. LE Système DOIT traiter toutes les données localement dans le navigateur
3. QUAND l'utilisateur ferme l'application, LE Système NE DOIT conserver aucune trace des données saisies

### Exigence 11: Compatibilité

**User Story:** En tant qu'utilisateur, je veux utiliser l'application sur différents appareils, afin de créer mes factures où que je sois.

#### Critères d'Acceptation

1. LE Système DOIT fonctionner parfaitement sur desktop (priorité)
2. LE Système DOIT permettre la prévisualisation sur mobile
3. SUR mobile, LE Système DOIT limiter les fonctionnalités d'édition tout en gardant la prévisualisation fonctionnelle
4. LE Système DOIT être compatible avec tous les navigateurs modernes