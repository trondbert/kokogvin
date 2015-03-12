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
});

function attachFile(fileToUpload) {
    var absolutePath = path.resolve(__dirname, fileToUpload);
    $('input[type="file"]').sendKeys(absolutePath);
}