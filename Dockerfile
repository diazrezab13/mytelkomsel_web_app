# Stage 1: Build aplikasi
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Sajikan dengan Nginx
FROM nginx:stable-alpine
# Salin hasil build dari stage 1 ke folder default Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]