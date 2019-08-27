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
          sh '''
//          # Go to the React folder
          cd application/hardware_signout_react

/          # Install dependencies and build the app
          npm install

//          # Note: npm run build also copies files from the build
//          # to the correct locations based on commands in package.json
          npm run build

//          # Go back to the root directory
          cd ../..

//          # Delete the existing docker image
          docker rmi --force makeuoft-hardware-site:latest


//          # Build a new image
          docker-compose -f deployment/docker-compose.yml build
          '''
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
