# Go to the React folder
cd application/hardware_signout_react

# Install dependencies and build the app
npm install

# Note: npm run build also copies files from the build
# to the correct locations based on commands in package.json
npm run build

# Go back to the root directory
cd ../..

# Delete the existing docker image
docker rmi --force makeuoft-hardware-site:latest


# Build a new image
docker-compose -f deployment/docker-compose.yml build
