var myAfterHooks = function() {
    this.After(function(scenario, next) {
        this.driver.quit().then(function() {
            next();
        });
    });
};

module.exports = myAfterHooks;
