/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Variables
const _ = require('lodash'),
    karmia_utility_string = require('karmia-utility-string');


/**
 * KarmiaExpressMiddlewareNormalize
 *
 * @class
 */
class KarmiaExpressMiddlewareNormalize {
    /**
     * Constructor
     *
     * @constructs KarmiaExpressMiddlewareNormalize
     * @returns {Object}
     */
    constructor(options) {
        const self = this;
        self.options = options || {};
        self.form = self.options.form || 'NFKC';

        self.utility = karmia_utility_string(self.options);
    }

    /**
     * Normalize data
     *
     * @param {*} data
     */
    normalize(data) {
        const self = this;

        return (function normalize(data) {
            if (_.isString(data)) {
                return self.utility.normalize(data, self.form);
            }

            if (_.isObject(data)) {
                const map_function = Array.isArray(data) ? _.map : _.mapValues;

                return map_function(data, function (value) {
                    return normalize(value);
                });
            }

            return data;
        })(data);
    }

    /**
     * Get express middleware function
     *
     * @returns {function}
     */
    middleware() {
        const self = this;

        return (req, res, next) => {
            if (!req.body) {
                return next();
            }

            req.body = self.normalize(req.body);

            next();
        };
    }
}


// Export modules
module.exports = function (options) {
    return new KarmiaExpressMiddlewareNormalize(options || {});
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
