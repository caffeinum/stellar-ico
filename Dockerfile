FROM node:10

WORKDIR /usr/src/stellar

# Установить зависимости приложения
# Используется символ подстановки для копирования как package.json, так и package-lock.json,
# работает с npm@5+
COPY package*.json ./

RUN npm install
# Используется при сборке кода в продакшене
# RUN npm install --only=production
COPY . .


EXPOSE 3000

CMD [ "node", "app.js" ]
