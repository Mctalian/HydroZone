
var sharedSteps = module.exports = function(){
    this.World = require('../support/world');

    this.Given(/^I am on the home page$/, function(next) {
        this.visit('/', next);
    });

    this.Given(/^I enter "([^"]*)" into the token field$/, function(text, next) {
        this.browser.fill('#apiToken', text);
    });

    this.Then(/^I should see "([^"]*)"$/, function(text, next) {
        this.browser.text('body').should.containEql(text);
        next();
    });
};
