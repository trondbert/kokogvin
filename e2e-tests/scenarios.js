'use strict';
var shared = require('./shared/shared.js');
var path = require('path');
var fs = require('fs');

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);

    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

describe('kokogvin', function () {

    browser.get('/');

    it('should show heading', function () {
        expect(element.all(by.css('header a')).first().getText()).
            toMatch(/Mat, drikke og kos/);
    });

    describe('not logged in', function () {

        browser.get('#/recipe/list');

        it('shows login field', function () {
            expect(element(by.model('user.password'))).not.toBe(null);
        });
    });

    describe('list recipes', function () {

        beforeEach(function() {
            browser.get('#/recipe/list');
            shared.login();
        });
        afterEach(function() {
            shared.logout();
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
        afterEach(function() {
            shared.logout();
        });

        it('shows wines', function () {
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

    describe('view recipe', function() {
        beforeEach(function() {
            browser.get('#/recipe/list');
            shared.login();
        });
        afterEach(function() {
            shared.logout();
        });

        it ('shows a recipe', function() {
            element(by.linkText('Bacalao')).click();
            expect(element(by.css(".instructions")).getText()).toEqual('Just do it');
        });
    });

    describe('create recipe', function() {
        beforeEach(function() {
            browser.get('#/recipe/list');
            shared.login();
        });
        afterEach(function() {
            shared.logout();
        });

        it ('creates a recipe', function() {
            element(by.linkText('Oppskrifter')).click();
            element(by.linkText('Ny oppskrift')).click();
            element(by.css(".name")).sendKeys("Filet mignon a la Turk");
            element(by.model("recipe.tags")).sendKeys("middag");
            element(by.model("transients.ingredients1")).sendKeys("Foo foo");
            attachFile('./bali.jpg');
            element(by.css(".instructions")).sendKeys("Just do it");

            element(by.buttonText("Lagre")).click();
            browser.driver.wait(function() {
                return browser.driver.getCurrentUrl().then(function(url) {
                    return (/view/).test(url);
                });
            });
            expect(browser.getLocationAbsUrl()).toEqual('/recipe/view/3');
            expect(element(by.css(".instructions")).getText()).toEqual("Just do it");
            expect(element(by.css("#detailImagePreview")).getAttribute("src")).toMatch(/.{1000,1000000}/);
        });
    });


    describe('edit recipe', function () {
        beforeEach(function () {
            browser.get('#/recipe/list');
            shared.login();
        });
        afterEach(function() {
            shared.logout();
        });

        it('updates a recipe', function () {
            element(by.linkText('Bacalao')).click();
            element(by.linkText('Rediger oppskrift')).click();
            element(by.css(".instructions")).sendKeys("Jada, jada");
            expect(element(by.css(".instructions")).getText()).toEqual("Jada, jada");
            element(by.buttonText('Oppdater')).click();
            expect(element(by.css(".instructions")).getText()).toEqual("Jada, jada");
        });

    });

});
