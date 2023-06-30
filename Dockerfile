FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.19.0-alpine

COPY --from=0 /app/dist/* /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf