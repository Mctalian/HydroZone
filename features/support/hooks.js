var webdriver = require('selenium-webdriver');

var myHooks = function() {
    this.Before(function(scenario, next) {
        this.driver = new webdriver.Builder()
           .forBrowser('firefox')
           .build();
        next();
    });
};

module.exports = myHooks;
