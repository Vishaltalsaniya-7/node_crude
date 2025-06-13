# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app code
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
