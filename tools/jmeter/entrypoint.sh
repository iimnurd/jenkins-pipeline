#!/bin/bash 
echo "Execution is being started"
echo "**************************"
vus=(1 5 6)
for u in "${vus[@]}"
do
    echo "Start performance with $u vus "
    jmeter -Jthreads=$u -l report/thread_$u/result.csv -j report/thread_$u/result.log -e -o report/thread_$u/html $@
    sleep 10
done
echo "**************************"
echo "Execution has been completed, please check the artifacts to download the results."
