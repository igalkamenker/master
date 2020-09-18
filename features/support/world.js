const path = require('path');
const chromedriverPath = require('chromedriver').path;
const { Before, After, setWorldConstructor, setDefaultTimeout,Status } = require('cucumber');
const { By, until, Builder, Key,Capabilities ,webdriver } = require('selenium-webdriver');
const logging = require('selenium-webdriver/lib/logging');
const chrome = require('selenium-webdriver/chrome');

setDefaultTimeout(360 * 10000);

let BrowserName = 'Chrome';
let service = null;
let driver;
let scenarioName ='undefined';


class World {

  constructor({ attach, parameters }) {
      this.initWebDriver();
  }

  initWebDriver() {
    if (BrowserName === 'Chrome') {
      const { Options: ChromeOptions } = chrome;
      const options = new ChromeOptions();
      const args = ['user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36,is-testing-environment=true'];
      args.push('window-size=1920,1080');
      options.addArguments(args);
      this.driver = new Builder().setChromeOptions(options).forBrowser('chrome').build();
      // --------------------------------------------------------------------------------------------------------
    } else if (BrowserName === 'FireFox') {
      this.driver = new Builder().forBrowser('firefox').build();
    } else if (BrowserName === 'Edge') {
      this.driver = new Builder().forBrowser('MicrosoftEdge').build();
    }

    if (!this.driver)
      throw new Error('`driver` is not defined');

    this.driver.manage().setTimeouts({ pageLoad: 120000 });
    this.driver.manage().window().maximize();
    this.driver.navigate().refresh();
    driver=this.driver;
  }



}

Before(async function (scenario) {
  scenarioName=scenario.pickle.name.replace(/[:+,.{}"~`?*!@&\\[\]/^<>()=#%]/g,'-');
  console.log('                                                                                                                                                           ');
  console.log('                                                                                                                                                           ');
  console.log('***********************************************************************************************************************************************************');
  console.log('Scenario < '+scenarioName+' > is STARTING... ');
  console.log('***********************************************************************************************************************************************************');

});
// eslint-disable-next-line consistent-return
After(async function (scenario) {

    if (scenario.result.status === Status.FAILED) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('                     Scenario  < '+scenarioName+' >    !!!!!! FAILED !!!!!');
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }else{
      console.log(':-):-):-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-');
      console.log('                     Scenario  < '+scenarioName+' >     PASSED :-)');
      console.log(':-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-) :-):-) :-):-):-) :-):');
    }

    await this.driver.quit();

});

setWorldConstructor(World);






