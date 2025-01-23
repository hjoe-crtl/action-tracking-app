# Utiliser l'image Node.js
FROM node:15

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de package
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port
EXPOSE 4200

# Commande pour démarrer l'application
CMD ["npm", "start"]
