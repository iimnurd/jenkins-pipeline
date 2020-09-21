node {
  stage 'bb Run JMeter Test iim'
  sh '/Users/alterra/Desktop/apache-jmeter-5.1.1/bin/jmeter -Jthreads=5 -n -t /Users/alterra/Desktop/test_google.jmx  -l /Users/alterra/Desktop/jenkin_report/5.csv -j /Users/alterra/Desktop/5.log'
}
