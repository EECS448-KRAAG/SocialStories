FROM node:latest as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run" ,"start"]


# FROM nginx:1.15
# COPY --from=build-stage /app/build/ /usr/share/nginx/html
# COPY --from=build-stage /app/config/nginx.conf /etc/nginx/conf.d/default.conf