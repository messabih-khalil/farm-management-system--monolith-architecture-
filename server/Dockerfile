# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm install

# Step 5: Copy the rest of your app's source code into the container
COPY . .

# Step 6: Compile TypeScript to JavaScript (if necessary)
RUN npm run build

# Step 7: Expose the port that the app will run on
EXPOSE 4000

# Step 8: Run the app
CMD ["npm", "start"]
