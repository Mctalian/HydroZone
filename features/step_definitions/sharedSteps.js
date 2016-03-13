var _ = require('lodash');
var assert = require('assert');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

var sharedSteps = module.exports = function(){
    this.World = require('../support/world');

    this.Given(/^I am on the home page$/, function(next) {
        this.get('/');
        next();
    });

    this.Given(/^I am on the dashboard$/, {timeout: 10*1000}, function(next) {
        this.get('/');
        this.driver.findElement(By.id('apiToken')).sendKeys('c3667b81-92a6-4913-b83c-64cc713cbc1e');
        this.driver.wait(until.titleContains('Dashboard')).then(function(value) {
            assert(value);
            next();
        });
    });

    this.Given(/^I navigate directly to the dashboard$/, function(next) {
        this.get('/dashboard');
        next();
    });

    this.Given(/^I enter "([^"]*)" into the token field$/, function(text, next) {
        this.driver.findElement(By.id('apiToken')).sendKeys(text);
        next();
    });

    this.Given(/^I enter "([^"]*)" into the "([^"]*)" field$/, function(text, input, next) {
        this.driver.findElement(By.name(input)).sendKeys(text).then(function() {
            next();
        });
    });

    this.Given(/^I click the "([^"]*)" button$/, function(btn, next) {
        this.driver.findElement(By.id(`${btn}`)).click();
        next();
    });

    this.Given(/^I select "([^"]*)"/, {timeout: 10*1000}, function(btn, next) {
        this.driver.findElement(By.id(`${btn}`)).click();
        next();
    });

    this.Then(/^I should see "([^"]*)"$/, {timeout: 10*1000}, function(text, next) {
        this.driver.findElement(By.tagName('body')).getAttribute('innerHTML').then(function(html) {
            assert(_.includes(html, text));
            next();
        });
    });

    this.Then(/^the element with id "([^"]*)" should be visible on the page$/, {timeout: 10*1000}, function(id, next) {
        var outerThis = this;
        this.driver.wait(until.elementLocated(By.id(id))).then(function() {
            setTimeout(function() {
                outerThis.driver.findElement(By.id(id)).isDisplayed().then(function(visible) {
                    assert(visible);
                    next();
                });
            }, 2000);
        });
    });

    this.Then(/^the "([^"]*)" button should be "([^"]*)"$/, function(btn, desired, next) {
        this.driver.findElement(By.id(`${btn}`)).getAttribute('disabled').then(function(state) {
            assert(desired === state);
            next();
        });
    });

    this.Then(/^the "([^"]*)" field should be empty$/, function(input, next) {
        this.driver.findElement(By.name(input)).getAttribute('value').then(function(value) {
            assert(value === '');
            next();
        });
    });

    this.Then(/^I am on the "([^"]*)" page$/, {timeout: 10*1000}, function(title, next) {
        this.driver.wait(until.titleContains(title)).then(function(value) {
            assert(value);
            next();
        });
    });

    this.Then(/^I return to the home page$/, {timeout: 10*1000}, function(next) {
        this.driver.wait(until.titleContains('Sign In')).then(function(value) {
            assert(value);
            next();
        });
    });

    this.Then(/^"([^"]*)" should be deselected$/, function(btn, next) {
        this.driver.findElement(By.id(`${btn}`)).getAttribute('class').then(function(classes) {
            assert(!_.includes(classes, 'selected'));
            next();
        });
    });

    this.Then(/^all zones should be selected$/, {timeout: 15*1000}, function(next) {
        var zones = this.driver.findElements(By.css('[id^=zone-].selected')).then(function(elements) {
            assert(elements.length === 8);
            next();
        });
    });
};
