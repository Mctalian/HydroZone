var Browser = require('zombie');
var webdriver = require('selenium-webdriver');
var html5 = require('html5');
var should = require('should');
var port = require('../../server').port;

var World = module.exports = function() {
    this.browser = new Browser({
        runScripts: true,
        debug: false,
        htmlParser: html5
    });

    this.driver = new webdriver.Builder()
        .forBrowser('firefox')
        .build();

    this.page = function(path) {
        return `http://localhost:${port}${path}`;
    };

    this.visit = function(path, callback) {
        this.browser.visit(this.page(path), callback);
    };

    this.get = function(path) {
        this.driver.get(this.page(path));
    };
};
