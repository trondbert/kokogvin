
var page = require('webpage').create();

page.open('http://localhost:9080', function() {
  page.injectJs("test_utils.js");

  heading = page.evaluate(function() { return $(".heading").text() });
  assertThat(heading).isEqualTo("Oppskrifter");

  phantom.exit();
});

function findTextInElement(selector) {
  window.selectorGlobal = selector;

  return page.evaluate(function() {
    console.log(window.selectorGlobal);
    return findOnPage(window.selectorGlobal);
  });
}
