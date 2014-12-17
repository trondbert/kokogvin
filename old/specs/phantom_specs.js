
var page = require('webpage').create(null);

page.open('http://localhost:9080', function() {
  page.injectJs("test_utils.js");

  var heading = page.evaluate(function() { return $(".heading").text() });
  assertThat(heading).isEqualTo("Oppskrifter");

  phantom.exit();
});

function assertThat(actual) {

  var assertion = {};

  assertion.actual = actual;

  assertion.isEqualTo = function(expected) {
    if (expected != actual) {
      throw "Expected " + expected + ", got " + actual;  
    }
  };
  return assertion;
}