pipeline {
  agent any
  environment {
    DB_CREDENTIALS = credentials('DB_USER_MAKEUOFT')
    DB_NAME = credentials('DB_NAME_MAKEUOFT')
    DB_SERVER = credentials('DB_SERVER_MAKEUOFT')
    SECRET_KEY = credentials('SECRET_KEY_MAKEUOFT')
    ENVIRONMENT = credentials('ENVIRONMENT')
  }
  stages {
    stage('Build') {
      steps {
//          # Run the build script

//          # Go to the React folder
          sh 'cd application/hardware_signout_react'

//          # Install dependencies and build the app
          sh 'npm install'

//          # Note: npm run build also copies files from the build
//          # to the correct locations based on commands in package.json
          sh 'npm run build'

//          # Go back to the root directory
          sh 'cd ../..''

//          # Delete the existing docker image
          sh 'docker rmi --force makeuoft-hardware-site:latest'


//          # Build a new image
          sh 'docker-compose -f deployment/docker-compose.yml build'
      }
    }
    stage('Deploy') {
      when {
        branch "master"
      }
      steps {
//          #Bring down the old container
          sh 'docker-compose -f deployment/docker-compose.yml down'
//          #Bring up the new container
          sh 'docker-compose -f deployment/docker-compose.yml up -d'

      }
    }
  }
}
