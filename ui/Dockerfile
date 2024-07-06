FROM node:20-alpine AS build_stage

WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production_stage

WORKDIR /app
COPY --from=build_stage /build/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
ENV NODE_ENV=production

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

