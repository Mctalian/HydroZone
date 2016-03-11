
var sharedSteps = module.exports = function(){
    this.World = require('../support/world');

    this.Given(/^I am on the home page$/, function(next) {
        this.visit('/', next);
    });

    this.Given(/^I navigate directly to the dashboard$/, function(next) {
        this.visit('/dashboard', next);
    });

    this.Given(/^I enter "([^"]*)" into the token field$/, function(text, next) {
        this.browser.fill('#apiToken', text);
        next();
    });

    this.Given(/^I click the "([^"]*)" button$/, function(btn, next) {
        this.browser.pressButton(`#${btn}`, next);
    });

    this.Then(/^I should see "([^"]*)"$/, function(text, next) {
        this.browser.text('body').should.containEql(text);
        next();
    });

    this.Then(/^the "([^"]*)" button should be "([^"]*)"$/, function(btn, state, next) {
        this.browser.assert.attribute(`#${btn}`, 'disabled', state === 'disabled' ? state : null);
        next();
    });

    this.Then(/^the "([^"]*)" field should be empty$/, function(input, next) {
        this.browser.assert.text('input[name=token]', '');
        next();
    });

    this.Then(/^I am on the "([^"]*)" page$/, function(url, next) {
        this.browser.location.href.should.containEql(url);
        next();
    });

    this.Then(/^I return to the home page$/, function(next) {
        this.browser.location.href.should.not.containEql('dashboard');
        next();
    });
};
