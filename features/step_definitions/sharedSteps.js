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

    this.Given(/^I navigate directly to the dashboard$/, function(next) {
        this.visit('/dashboard', next);
    });

    this.Given(/^I enter "([^"]*)" into the token field$/, function(text, next) {
        this.driver.findElement(By.id('apiToken')).sendKeys(text);
        next();
    });

    this.Given(/^I enter "([^"]*)" into the "([^"]*)" field$/, function(text, input, next) {
        this.browser.fill('input[name=' + input + ']', text);
        next();
    });

    this.Given(/^I click the "([^"]*)" button$/, function(btn, next) {
        this.browser.pressButton(`#${btn}`, next);
    });

    this.Given(/^I select "([^"]*)"/, function(btn, next) {
        var upperThis = this;
        this.browser.fire(`#${btn}`, 'mousedown', function() {
            upperThis.browser.fire(`#${btn}`, 'mousedown', next);
        });
    });

    this.Then(/^I should see "([^"]*)"$/, {timeout: 10*1000}, function(text, next) {
        this.driver.findElement(By.tagName('body')).getAttribute('innerHTML').then(function(html) {
            assert(_.includes(html, text));
            next();
        });
    });

    this.Then(/^the element with id "([^"]*)" should be visible on the page$/, function(id, next) {
        this.driver.wait(until.elementIsVisible(this.driver.findElement(By.id('id'))))
            .then(next);
    });

    this.Then(/^the "([^"]*)" button should be "([^"]*)"$/, function(btn, state, next) {
        this.browser.assert.attribute(`#${btn}`, 'disabled', state === 'disabled' ? state : null);
        next();
    });

    this.Then(/^the "([^"]*)" field should be empty$/, function(input, next) {
        this.browser.assert.text('input[name=token]', '');
        next();
    });

    this.Then(/^I am on the "([^"]*)" page$/, {timeout: 10*1000}, function(title, next) {
        this.driver.wait(until.titleContains(title)).then(function(value) {
            assert(value);
            next();
        });
    });

    this.Then(/^I return to the home page$/, function(next) {
        this.browser.location.href.should.not.containEql('dashboard');
        next();
    });

    this.Then(/^"([^"]*)" should be deselected$/, function(btn, next) {
        var upperThis = this;
        setTimeout(function() {
            upperThis.browser.assert.hasNoClass(`#${btn}`, 'selected');
            next();
        }, 4000);
    });

    this.Then(/^all zones should be selected$/, function(next) {
        this.browser.assert.hasClass('[id^=zone-]', 'selected');
        next();
    });
};
