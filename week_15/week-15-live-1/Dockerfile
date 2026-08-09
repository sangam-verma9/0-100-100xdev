FROM node:18.16.0-alpine3.18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npx prisma generate
EXPOSE 3000
CMD ["node", "dist/index.js"]