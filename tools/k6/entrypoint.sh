#!/bin/sh

# `$*` expands the `args` supplied in an `array` individually 
# or splits `args` in a string separated by whitespace.
echo "Execution is being started"
echo "**************************"
export K6_CLOUD_TOKEN=$INPUT_TOKEN
export K6_COMMAND=$([[ $INPUT_CLOUD == "true" ]] && echo 'cloud' || echo 'run')
sh -c "k6 $K6_COMMAND --config $INPUT_CONFIG --summary-export=result_summary.json --out json=result_raw.json $INPUT_FILENAME $INPUT_FLAGS"
echo "**************************"
echo "Execution has been completed, please check the artifacts to download the results."