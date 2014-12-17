

module.exports.login = function() {

    element(by.model('user.email')).sendKeys('foo');
    element(by.model('user.password')).sendKeys('bar');
    element(by.css('.loginBox form button')).click();

    browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
            return /list\/?$/.test(url);
        });
    });
};