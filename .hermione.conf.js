module.exports = {
    gridUrl: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:3000',
    /*   sets: {
           desktop: {
               files: 'tests/desktop'
           }
       },*/
    //   pageLoadTimeout: 10000,
    testTimeout: 10000,
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
    /*  plugins: {
          'html-reporter/hermione': {
              enabled: true,
              path: 'my/hermione-reports',
              defaultView: 'all',
              baseHost: 'test.com',
              errorPatterns: [
                  'Parameter .* must be a string',
                  {
                      name: 'Cannot read property of undefined',
                      pattern: 'Cannot read property .* of undefined'
                  }
              ]
          }
      }*/
};