# base node image
FROM node:20-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /michelbois

ADD package.json .npmrc ./
RUN npm install --include=dev

# Setup production node_modules
FROM base as production-deps

WORKDIR /michelbois

COPY --from=deps /michelbois/node_modules /michelbois/node_modules
ADD package.json .npmrc ./
RUN npm prune --omit=dev

# Build the app
FROM base as build

WORKDIR /michelbois

COPY --from=deps /michelbois/node_modules /michelbois/node_modules

ADD prisma .
RUN npx prisma generate

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /michelbois

COPY --from=production-deps /michelbois/node_modules /michelbois/node_modules
COPY --from=build /michelbois/node_modules/.prisma /michelbois/node_modules/.prisma

COPY --from=build /michelbois/build /michelbois/build
COPY --from=build /michelbois/public /michelbois/public
ADD . .

CMD ["npm", "start"]
