import KarmiaUtilityString = require("karmia-utility-string");

declare class KarmiaExpressMiddlewareNormalize {
    options: object;
    form: string;
    utility: KarmiaUtilityString;

    constructor(options: object);
    normalize(data: any): any;
    middleware: Function;
}

export = KarmiaExpressMiddlewareNormalize;
