/* eslint-disable no-undef */
const assert = require('assert');

describe('react приложение', () => {
    it('Отображение списка файлов репозитория', function () {
        return this.browser
            .url('/nodejs-express/tree/master/')
           // .assertView('click-folder', 'a.Cell-Folder:first-child')
            .click('a.Cell-Folder:first-child')
            .isExisting('.Table')
          //  .assertView('clicked', 'a.Cell-Folder:first-child')
            .then(exists => {
                assert.ok(exists, 'Список не отобразился');
            });
    });

    it('Отображение файла репозитория', function () {
        return this.browser
            .url('/nodejs-express/tree/master/')
       //     .assertView('click-file', 'a[href$="package.json"]')
            .click('a[href$="package.json"]')
            .isExisting('.Preview')
         //   .assertView('clicked', 'a[href$="package.json"]')
            .then(exists => {
                assert.ok(exists, 'Файл не отобразился');
            });
    });

    it('Переход по хлебным крошкам', function () {
        return this.browser
            .url('/nodejs-express/blob/master/package.json')
         //   .assertView('click-route', 'a.Path-Route:first-child')
            .click('a.Path-Route:first-child')
          //  .assertView('clicked', 'a.Path-Route:first-child')
            .isExisting('.Table')
            .then(exists => {
                assert.ok(exists, 'Файл не отобразился');
            });
    });
});