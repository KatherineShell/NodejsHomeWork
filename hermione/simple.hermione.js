/* eslint-disable no-undef */
const assert = require('assert');

describe('react приложение', () => {
    it('Отображение списка файлов репозитория', function () {
        return this.browser.url('/nodejs-express/tree/master/')
            .pause(5000)
            .click('a.Cell-Folder:first-child')
            .pause(10000)
            .isExisting('.Table')
            .then(exists => {
                assert.ok(exists, 'Список не отобразился');
            });
    });

    it('Отображение файла репозитория', function () {
        return this.browser.url('/nodejs-express/tree/master/')
            .pause(5000)
            .click('a[href$="package.json"]')
            .pause(5000)
            .isExisting('.Preview')
            .then(exists => {
                assert.ok(exists, 'Файл не отобразился');
            });
    });

    it('Переход по хлебным крошкам', function () {
        return this.browser
            .url('/nodejs-express/blob/master/package.json')
            .assertView('click-route', 'a.Path-Route:first-child')
            .click('a.Path-Route:first-child')
            .assertView('clicked', 'a.Path-Route:first-child')
            .isExisting('.Table')
            .then(exists => {
                assert.ok(exists, 'Файл не отобразился');
            });
    });
});