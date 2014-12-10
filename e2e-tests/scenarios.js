'use strict';

describe('kokogvin', function() {

  browser.get('index.html');

  it('should show heading', function() {
      expect(element.all(by.css('header a')).first().getText()).
          toMatch(/Mat, drikke og kos/);
  });

  describe('list', function() {

    browser.get('#/recipe/list');

    it('should show login box', function() {
      expect(element.all(by.css('.loginBox'))).not.toBe(null);
    });
  });

});
