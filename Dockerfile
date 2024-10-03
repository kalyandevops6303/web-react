FROM node:20.17.0-alpine3.20 as module-install-stage

RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers make python3 && \
    npm install --quiet node-gyp -g

# Create app directory
WORKDIR /app

# Copy source code to image
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps && npm install --save env-cmd --legacy-peer-deps

RUN npm run build

FROM node:20.17.0-alpine3.20
WORKDIR /app

COPY --from=module-install-stage /app/dist/ /app/dist

# Install and configure `serve`.
RUN npm install -g serve

# Expose port for service
EXPOSE 5000

CMD ["serve", "-l", "5000", "-s", "app/dist"]
