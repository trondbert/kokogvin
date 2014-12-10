
function getRecipeInfo() {
  return $(".table-row .recipe-info");
}

casper.test.begin('Should have recipes when not mocked', 1, function suite(test) {
  casper.start('http://localhost:9080/', function() {
  });

  casper.waitForSelector(".table-row .recipe-info", function() {
  });

  casper.then(function() {
    elements = this.evaluate(getRecipeInfo);
    this.echo(elements.length);
    test.assert(elements.length > 0, "Recipes available when not mocked");
  });

  casper.run(function() {
    test.done();
  });

});
