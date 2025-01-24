FROM node:22.0.0 AS build
WORKDIR /app

# Copier les fichiers de package
COPY package*.json ./

# Installer les dépendances, y compris @ng-bootstrap/ng-bootstrap
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/action-tracking-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
