FROM node:14.18-alpine3.12 as module-install-stage

RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers make python2 && \
    npm install --quiet node-gyp -g

# Create app directory
WORKDIR /app

# Copy source code to image
COPY . .

# Install dependencies
RUN npm install && npm install --save env-cmd

RUN npm run build

FROM node:14.18-alpine3.12
RUN ls -lrt
COPY --from=module-install-stage /app/dist/ /app/dist

# Install and configure `serve`.
RUN npm install -g serve

# Expose port for service
EXPOSE 5000

CMD ["serve", "-l", "5000", "-s", "app/dist"]
