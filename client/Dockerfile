# Step 1: Use the official Node.js image with a specific version
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Step 4: Install pnpm (since it's the package manager you're using)
RUN npm install -g pnpm

# Step 5: Install dependencies using pnpm
RUN pnpm install

# Step 6: Copy the rest of the app source code into the container
COPY . .

# Step 7: Build the Next.js app
RUN pnpm run build

# Step 8: Expose port 3000 to allow traffic on this port
EXPOSE 3000

# Step 9: Start the Next.js app
CMD ["pnpm", "start"]