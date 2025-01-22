# Application de Suivi des Plans d'Actions

Cette application permet de gérer le suivi des plans d'actions des structures d'une organisation à quatre niveaux : central, régional, départemental et local.

## Prérequis

- Java 17
- Node.js 18+
- PostgreSQL 15+
- Maven 3.8+

## Installation

### Base de données

1. Créer une base de données PostgreSQL :
```sql
CREATE DATABASE action_tracking_db;
```

### Backend (Spring Boot)

1. Naviguer vers le dossier racine du projet
2. Compiler le projet :
```bash
mvn clean install
```
3. Lancer l'application :
```bash
mvn spring-boot:run
```

Le backend sera accessible sur `http://localhost:8080`

### Frontend (Angular)

1. Naviguer vers le dossier frontend
2. Installer les dépendances :
```bash
npm install
```
3. Lancer l'application :
```bash
ng serve
```

Le frontend sera accessible sur `http://localhost:4200`

## Fonctionnalités

- Gestion des structures hiérarchiques (4 niveaux)
- Création et suivi des actions
- Mesure des actions par nombre de livrables
- Suivi du taux de réalisation
- Gestion des utilisateurs et des droits d'accès
- Visualisation hiérarchique des actions

## Structure du Projet

- `backend/` : Code source du backend Spring Boot
  - `src/main/java/` : Code source Java
  - `src/main/resources/` : Fichiers de configuration
- `frontend/` : Code source du frontend Angular
  - `src/app/` : Components, services et models Angular
  - `src/assets/` : Ressources statiques

## Sécurité

- Authentification basée sur JWT
- Autorisation basée sur les rôles
- Validation des données côté serveur
- Protection CSRF
