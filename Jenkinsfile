pipeline {
  agent any
  stages {
    stage('perf test') {
      steps {
        sh '/Users/alterra/Desktop/apache-jmeter-5.1.1/bin/jmeter -Jthreads=10 -n -t $2  -l /Users/alterra/Desktop/13.csv -j /Users/alterra/Desktop/13.log'
      }
    }

  }
}