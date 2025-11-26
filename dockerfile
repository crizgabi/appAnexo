FROM node:18

WORKDIR /app

# Copia apenas os arquivos de dependências primeiro
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto (inclui prisma/schema.prisma)
COPY . .

# Gera Prisma dentro da imagem (LINUX)
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]