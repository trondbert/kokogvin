#!/bin/bash

static-server public 9080 > /dev/null 2>&1 &

phantomjs test/specs/phantom_specs.js

# Kill the newest static-server process
pkill -f -n node.*static-server