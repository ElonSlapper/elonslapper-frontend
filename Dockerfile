# Stage 1: base node image for install & build
FROM node:18.19-alpine AS base
WORKDIR /usr/src/elonslapper

# Stage 2: Install dependencies
FROM base AS install
RUN mkdir -p /temp/build/
COPY package.json /temp/build/
WORKDIR /temp/build
RUN npm install

# Stage 3: Build the app
FROM base AS prerelease
COPY --from=install /temp/build/node_modules /temp/build/node_modules
COPY . /temp/build/
WORKDIR /temp/build
ENV NODE_ENV=production
RUN npm run build

# Stage 4: Serve with nginx
FROM nginx:stable-alpine AS production
# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files from the build stage to nginx html folder
COPY --from=prerelease /temp/build/dist /usr/share/nginx/html

# Expose port 80 to serve content
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
