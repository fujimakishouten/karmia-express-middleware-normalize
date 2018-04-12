/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
import KarmiaUtilityString = require("karmia-utility-string");


// Declarations
declare interface Options {
    form?: string;
}

declare interface Parameters {
    [index: string]: any;
}


/**
 * KarmiaExpressMiddlewareNormalize
 *
 * @class
 */
class KarmiaExpressMiddlewareNormalize {
    /**
     * Properties
     */
    public options: Options;
    public form: string;
    public utility: KarmiaUtilityString;

    /**
     * Constructor
     *
     * @constructs KarmiaExpressMiddlewareNormalize
     * @returns {Object}
     */
    constructor(options?: Options) {
        const self = this;
        self.options = options || {};
        self.form = self.options.form || 'NFKC';

        self.utility = new KarmiaUtilityString();
    }

    /**
     * Normalize data
     *
     * @param {*} data
     */
    normalize(data: any) {
        const self = this;
        function normalize(data: any): any {
            if (self.utility.isString(data)) {
                return self.utility.normalize(data, self.form);
            }

            if (data instanceof Object) {
                if (Array.isArray(data)) {
                    return data.map(normalize);
                }

                return Object.keys(data).reduce(function (collection: {[index: string]: any}, key: string) {
                    collection[key] = normalize(data[key]);

                    return collection;
                }, {});
            }

            return data;
        }

        return normalize(data);
    }

    /**
     * Get express middleware function
     *
     * @returns {function}
     */
    middleware() {
        const self = this;

        return (req: Parameters, res: Parameters, next?: Function) => {
            if (!req.body) {
                return next();
            }

            req.body = self.normalize(req.body);

            next();
        };
    }
}


// Export modules
export = KarmiaExpressMiddlewareNormalize;



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
