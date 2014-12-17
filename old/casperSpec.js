
function getRecipeInfo() {
  return $(".table-row .recipe-info");
}

casper.test.begin('Should not have recipes when mocked', 1, function suite(test) {
  casper.start('http://localhost:9080/#/mockStorage', function() {});

  casper.waitForSelector(".recipe-info", function() {}, function onTimeout() {/* It's OK */});

  casper.then(function() {
    var elements = this.evaluate(getRecipeInfo);
    test.assertEquals(elements.length, 0, "No recipes when mocked");
  });

  casper.run(function() {
    test.done();
  });

});
