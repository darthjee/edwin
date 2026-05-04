# Edwin RPG – Development Environment
# Node.js 20 LTS on Alpine for a small image footprint.

FROM node:20-alpine

# Install bash and git (useful for debugging inside the container)
RUN apk add --no-cache bash git

# Set working directory
WORKDIR /app

# Copy dependency manifests first to leverage Docker layer caching
COPY source/package*.json ./

# Install all dependencies (including devDependencies for dev mode)
RUN npm install

# Copy the rest of the source
COPY source/ .

# Expose the Vite dev server port
EXPOSE 5173

# Start the Vite development server, binding to all interfaces so the host
# can reach it via localhost.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
