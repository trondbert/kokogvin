'use strict';
var shared = require('./shared/shared.js');

describe('kokogvin', function () {

    browser.get('index.html');

    it('should show heading', function () {
        expect(element.all(by.css('header a')).first().getText()).
            toMatch(/Mat, drikke og kos/);
    });

    describe('not logged in', function () {

        browser.get('#/recipe/list');

        it('shows login box', function () {
            expect(element.all(by.css('.loginBox'))).not.toBe(null);
        });
    });

    describe('list recipes', function () {

        beforeEach(function() {
            browser.get('#/recipe/list');
            shared.login();
        });

        it('shows recipes', function () {
            expect(element.all(by.css('.detail a h4')).count()).toEqual(3);
        });

        it('filters recipes', function () {
            element(by.linkText("Søk")).click();
            expect(element(by.model("query"))).not.toBe(null);
            element(by.model("query")).sendKeys("Las");
            expect(element.all(by.css('.detail a h4')).count()).toEqual(1);
            expect(element(by.css('.detail a h4')).getText()).toEqual("Lasagne");
        });
    });

    describe('list wines', function () {

        beforeEach(function() {
            browser.get('#/beverage/list');
            shared.login();
            element(by.linkText("Vin")).click();
        });

        it('shows wines', function () {
            browser.debugger();
            expect(element.all(by.css('.detail a h4')).count()).toEqual(4);
        });

        it('filters wines', function () {
            element(by.linkText("Søk")).click();
            element(by.model("query")).sendKeys("Dine");
            expect(element.all(by.css('.detail a h4')).count()).toEqual(1);
            expect(element(by.css('.detail a h4')).getText()).toEqual("Wine Dine 69");

            element(by.model("query")).clear();
            element(by.model("query")).sendKeys("Rioja");
            expect(element.all(by.css('.detail a h4')).count()).toEqual(2);
            expect(element.all(by.css('.detail')).first().getText()).toMatch('Rioja 123');
            expect(element.all(by.css('.detail')).get(1).getText() ).toMatch('Rioja Majoralis');
        });
    });

});
