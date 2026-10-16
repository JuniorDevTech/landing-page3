# Backend API - Landing Page

Backend API Node.js/Express avec MySQL pour gérer les demandes d'essai.

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Configurer la base de données MySQL :
   - Importer le fichier `database.sql` dans votre base de données MySQL
   - Ou exécuter manuellement le script SQL pour créer la base de données et la table

3. Configurer les variables d'environnement dans `.env` :
```
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=landingpage_db
DB_PORT=3306
```

## Démarrage

```bash
npm start
```

Le serveur démarrera sur http://localhost:3001

## API Endpoints

### POST /api/demandes-essai
Créer une nouvelle demande d'essai.

**Body :**
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@email.com",
  "pays": "Côte d'Ivoire",
  "date_essai_souhaitee": "2025-01-15"
}
```

**Response :**
```json
{
  "success": true,
  "message": "Votre demande d'essai a été enregistrée avec succès",
  "data": {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@email.com",
    "pays": "Côte d'Ivoire",
    "date_essai_souhaitee": "2025-01-15"
  }
}
```

### GET /api/demandes-essai
Récupérer toutes les demandes d'essai.

**Response :**
```json
{
  "success": true,
  "data": [...]
}
```

## Sécurité

- **Rate Limiting** : Maximum 5 demandes par IP sur 15 minutes, et 10 par heure
- **CORS** : Configuré pour autoriser le frontend sur localhost:8081
- **Helmet** : Protection contre les vulnérabilités HTTP courantes
- **Validation** : Validation des données côté serveur
