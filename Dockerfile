# 建置環境
FROM node:14.16.0-alpine as builder

RUN mkdir /app
WORKDIR /app

# 複製 source code
COPY . /app

# 安裝模組
RUN npm ci -f

ENV NODE_ENV production
RUN npm run build

FROM node:14.16.0-alpine

RUN mkdir /host
WORKDIR /host

ADD package.json ./

COPY --from=builder ./app/node_modules ./node_modules/
COPY --from=builder ./app/build ./build/
COPY --from=builder ./app/dist ./dist/
COPY --from=builder ./app/public ./public/

ENV NODE_ENV production
EXPOSE 8100
CMD npm run start