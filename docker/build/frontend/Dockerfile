ARG EMBER_VERSION=3.28.6
FROM node:14-alpine AS builder

ARG EMBER_VERSION=3.28.6

ENV PATH=/home/node/app/bin:$PATH

WORKDIR /home/node

RUN set -ex \
  && npm install -g ember-cli@$EMBER_VERSION \
  && apk add --no-cache git \
  && mkdir /home/node/app \
  && chown node:node /home/node/app

WORKDIR /home/node/app

ARG GIT_REVISION
ARG GIT_REPO_URL

RUN set -ex \
  && git clone $GIT_REPO_URL . -b $GIT_REVISION --depth 1 \
  && cd frontend \
  && npm install \
  && npm install -g bower \
  && bower install --allow-root \
  && npm run build -- --environment=production

# Production stage
FROM nginx:alpine

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /home/node/app/frontend/dist /home/node/app/dist

EXPOSE 8080

ENTRYPOINT ["docker-entrypoint.sh"]
