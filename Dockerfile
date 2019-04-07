# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:8.11.4

# Set the working directory to /
WORKDIR /

# copy package.json into the container at /
COPY package*.json /

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /
COPY . /

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run the app when the container launches
CMD ["npm", "start"]
