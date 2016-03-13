var port = require('../../server').port;

var World = module.exports = function() {

    this.driver = null;

    this.page = function(path) {
        return `http://localhost:${port}${path}`;
    };

    this.get = function(path) {
        this.driver.get(this.page(path));
    };
};
