FROM node:20-alpine

WORKDIR /app

# Instalar dependências necessárias
RUN apk add --no-cache python3 make g++

# Copiar arquivos de configuração
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar o restante dos arquivos
COPY . .

# Compilar a aplicação
RUN npm run build

# Expor a porta da aplicação
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "start"]
