FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

# Set environment variable (default value can be overridden)
ARG API_BASE_URL
ENV API_BASE_URL=${API_BASE_URL}


CMD ["npm", "run", "preview", "--", "--port", "3000"]