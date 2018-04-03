/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Variables
const expect = require('expect.js'),
    karmia_express_middleware_normalize = require('../'),
    normalize = new karmia_express_middleware_normalize();


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
                middleware(req, {}, (error) => {
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
