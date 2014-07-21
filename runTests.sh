#!/bin/bash

static-server public 9080 > /dev/null 2>&1 &

casperjs test casperSpec.js
casperjs test casperSpecNotMocked.js

# Kill the newest static-server process
pkill -f -n node.*static-server

# try fn with arguments in tester.evaluate()

