#!/bin/bash

static-server . 9080 > /dev/null 2>&1 &

phantomjs phantom_specs.js

# Kill the newest static-server process
pkill -f -n node.*static-server