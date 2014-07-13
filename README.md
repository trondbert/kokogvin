kokogvin
========

App for wine and recipes. Coding in English, interface in Norwegian.

To run with node.js, install Node.js and then:

sudo npm install -g static-server

static-server /path/to/the-app

Tests: 
Install phantomjs 1.9.7

./runTests.sh

Deployment:
The app is set up to be deployed to firebase:

sudo npm install -g firebase-tools
firebase init
firebase deploy

