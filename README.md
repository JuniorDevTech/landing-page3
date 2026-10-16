# Landingpagepage

créé moi une application qui permet de collecter ls demande d'essai, elle doit repecter ce ci:

1. banniere: titre, accroche, imahe et boutton "Réserver un essai" qui mène au formulaire

2. atouts: trois atouts du vehicules présentés en blocs

3. formulaire: avec les champs:

nom (obligatoire)

prenom obligatoire)

email (facultatif)

pays (cote d'ivorie cameroun burkina faso  sénégal gabon)

date d'essai souhaitée

4. validation (des champs dans le navigateur puis a nouveau coté serveur en php)

5. enregistrement de chaque demande en base MYSQL avec date heure d'envoi

6. confirmation: une message clair s'affiche apres l'envoi

. 7.  anti-spam une protection simple contre les robots

8. bouton whasapp flottant visible ne permanence

9. mobile: la page doit s'afficher correctement sur un smart phone

10. reference: blaise title et meta descrinscription, un seul H1, attributs alt sur les images balise open graph pour le partage sur les reseaux

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://landingpagepage.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8a33af12-5a5c-4b15-9a5c-ec1cf27f4e41).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

### Frontend (React)

```sh
cd landingpagepage-main
pnpm install
pnpm run dev
```

### Backend (API Node.js + MySQL)

Le backend utilise Express et MySQL pour gérer les demandes d'essai.

1. **Installer MySQL** sur votre système si ce n'est pas déjà fait
2. **Configurer la base de données** :
   ```sh
   cd backend
   # Importer le fichier database.sql dans votre base de données MySQL
   # Ou utiliser phpMyAdmin/MySQL Workbench pour exécuter le script
   ```
3. **Configurer les variables d'environnement** dans `backend/.env` :
   ```
   PORT=3001
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=votre_mot_de_passe
   DB_NAME=landingpage_db
   DB_PORT=3306
   ```
4. **Installer les dépendances et démarrer le backend** :
   ```sh
   cd backend
   npm install
   npm start
   ```

Le backend sera accessible sur http://localhost:3001
# landing-page3
