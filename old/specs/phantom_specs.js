
var page = require('webpage').create();

page.open('http://localhost:9080', function() {
  page.injectJs("test_utils.js");

  heading = page.evaluate(function() { return $(".heading").text() });
  assertThat(heading).isEqualTo("Oppskrifter");

  phantom.exit();
});

function assertThat(actual) {

  assertion = new Object();

  assertion.actual = actual;

  assertion.isEqualTo = function(expected) {
    if (expected != actual) {
      throw "Expected " + expected + ", got " + actual;  
    }
  }
  return assertion;
}