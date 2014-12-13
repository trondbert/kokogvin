'use strict';

describe('kokogvin', function () {

    browser.get('index.html');

    it('should show heading', function () {
        expect(element.all(by.css('header a')).first().getText()).
            toMatch(/Mat, drikke og kos/);
    });

    describe('not logged in', function () {

        browser.get('#/recipe/list');

        it('should show login box', function () {
            expect(element.all(by.css('.loginBox'))).not.toBe(null);
        });
    });

    describe('list recipes', function () {

        beforeEach(function() {
            browser.get('#/recipe/list');

            element(by.model('user.email')).sendKeys('foo');
            element(by.model('user.password')).sendKeys('bar');
            element(by.css('.loginBox form button')).click();

            browser.driver.wait(function() {
                return browser.driver.getCurrentUrl().then(function(url) {
                    return /list\/?$/.test(url);
                });
            });
        });

        it('should show recipes', function () {
            expect(element.all(by.css('.detail a h4')).count()).toEqual(3);
        });

        it('should filter recipes') {
            element(by.text)
        }
    });
});

function waitForAWhile(howLong) {
    var counter = 0;

    browser.driver.wait(function() {
        counter++;
        console.log(counter);
        return counter > howLong;
    });
}