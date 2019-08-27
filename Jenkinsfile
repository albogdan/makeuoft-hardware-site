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
          sh deployment/build.sh
      }
    }
    stage('Deploy') {
      when {
        branch "master"
      }
      steps {

//          #Copy static files
//          sh 'rm -r /var/www/makeuoft/public_html/static/'
//          sh 'cp -r application/static /var/www/makeuoft/public_html/static'        
//          #Bring down the old container
          sh 'docker-compose -f deployment/docker-compose.yml down'
//          #Bring up the new container
          sh 'docker-compose -f deployment/docker-compose.yml up -d'

      }
    }
  }
}
