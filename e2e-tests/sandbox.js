'use strict';
var shared = require('./shared/shared.js');

describe('kokogvin', function () {

    describe('edit recipe', function () {
        beforeEach(function () {
            browser.get('#/recipe/list');
            shared.login();
        });

        it('updates a recipe', function () {
            element(by.linkText('Bacalao')).click();
            element(by.linkText('Rediger oppskrift')).click();
            element(by.css(".instructions")).sendKeys("Jada, jada");
            element(by.css('button[type="submit"]')).click();
        });

    });

});