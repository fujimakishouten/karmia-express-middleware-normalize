/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
import KarmiaExpressMiddlewareNormalize = require("../");

// Variables
const expect = require('expect.js');
const normalize = new KarmiaExpressMiddlewareNormalize();


describe('karmia-express-middleware-normalize', function () {
    describe('middleware', function () {
        it('Should get middleware function', function () {
            expect(normalize.middleware).to.be.a(Function);
        });

        it('Should normalize request data', function (done) {
            const middleware = normalize.middleware(),
                req = {
                    body: {
                        name: '高坂　穂乃果',
                        kana: 'ｺｳｻｶ ﾎﾉｶ',
                        mail: 'ｈｏｎｏｋａ＠μｓ．jｐ',
                        birthday: '８月３日',
                        bloodtype: 'Ｏ'
                    }
                };

            new Promise((resolve, reject) => {
                middleware(req, {}, (error: Error) => {
                    return (error) ? reject(error) : resolve();
                });
            }).then(function () {
                expect(req.body).to.eql({
                    name: '高坂 穂乃果',
                    kana: 'コウサカ ホノカ',
                    mail: 'honoka@μs.jp',
                    birthday: '8月3日',
                    bloodtype: 'O'
                });

                done();
            });
        });
    });

    describe('normalize', function () {
        it('Should normalize data', function () {
            const data = {
                name: '高坂　穂乃果',
                kana: 'ｺｳｻｶ ﾎﾉｶ',
                mail: 'ｈｏｎｏｋａ＠μｓ．jｐ',
                birthday: '８月３日',
                bloodtype: 'Ｏ'
            };

            expect(normalize.normalize(data)).to.eql({
                name: '高坂 穂乃果',
                kana: 'コウサカ ホノカ',
                mail: 'honoka@μs.jp',
                birthday: '8月3日',
                bloodtype: 'O'
            });
        });
    });
});


/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
