# Usamos una versión ligera de Node.js
FROM node:18-slim

# Carpeta de la app
WORKDIR /app

# Instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el código
COPY . .

# El puerto 5000 que definimos en tu index.js
EXPOSE 5000

# Arrancamos
CMD ["node", "index.js"]