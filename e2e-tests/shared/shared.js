

module.exports.login = function() {

    element(by.model('user.password')).sendKeys('bar');
    element(by.linkText('Logg inn')).click();

    expect(element(by.linkText('Logg inn'))).not.toBe(null);

    //browser.driver.wait(function() {
    //    return browser.driver.getCurrentUrl().then(function(url) {
    //        var waitFor = /list\/?$/.test(url);
    //        return waitFor;
    //    });
    //});
};

module.exports.logout = function() {
    element(by.linkText('Logg ut')).click();
};

