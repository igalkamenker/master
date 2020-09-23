const { When, Then } = require('cucumber');
const { By, until } = require('selenium-webdriver');

When(/^I wait for "(.*?)" milliseconds$/, function (milliseconds) {
  console.log('I wait for    '+ milliseconds +'    milliseconds');

  return new Promise(a => setTimeout(a, Number(milliseconds)));
});

When(/^User navigate to "(.*?)"$/, async function (input) {
  await this.driver.get(input);
  await this.driver.sleep(10000);
  console.log('User navigates to:    ' + input);
});

When(/^The user see the Object by xpath "(.*?)" on page$/, async function (input) {
  let elem=null;

  for (let i=0;i<5;i++) {
    try {
      elem=await this.driver.wait(until.elementLocated(By.xpath(input)), 15000);

      console.log('The user  see the object    ' + input + '  - on page ');

      return;
    } catch (err) {
      console.log('The user DO NOT see the element    ' + input + '  - on page - actual is  ' + elem);
      await this.driver.sleep(2000);
    }
  }
});

When(/^User press the object by xpath "(.*?)"$/, async function (input) {
  console.log('________Step: User press the button by xpath "(.*?)"');

  for (let i=0;i<5;i++) {
    try {
      await this.driver.wait(until.elementLocated(By.xpath(input)), 15000).click();
      console.log('Users press the button by xpath:    ' + input + ' ');

      break;
    } catch (err) {
      await this.driver.sleep(1000);
      console.log('Can not find element: '+ input+' -> Trying again...');
    }
  }
});


When(/^User enter the text to field by xpath "(.*?)" with the value "(.*?)"$/, async function (input, value1) {
  console.log('__________Step: User enter the text to field by xpath "(.*?)" with the value "(.*?)"');

  let elem;

  for (let i=0;i<4;i++) {
    try{
      elem=await this.driver.wait(until.elementLocated(By.xpath(input)), 15000);
      await elem.click();
      await this.driver.sleep(1000);
      await elem.sendKeys(value1);
      console.log('User enter the text to field :    ' + input + 'with the value: ' + value1);

      break;
    }catch(error){
      await this.driver.sleep(1000);
    }
  }

  throw new Error('The object does\'t entered / found by '+input);
});

When(/^Move to specific tab by title "(.*?)"$/, async function (input) {
  console.log('__________________Step:  Move to specific tab by title "(.*?)');
  await this.driver.sleep(2000);

  let tabs = await this.driver.getAllWindowHandles();

  for(let i=0;i<5;i++) {
    try {
      for (let k = tabs.length-1; k>= 0; k--) {
        await this.driver.switchTo().window(tabs[k]);

        const title=await this.driver.getTitle();

        if (title.includes(input)) {
          console.log('Window with title "'+input+'" is displayed');

          return;
        }
      }
    } catch (err) {
      await this.driver.sleep(2000);
      console.log('Can not Switch to window with title "'+input+'"');
      tabs = await this.driver.getAllWindowHandles();
    }
  }
});
When(/^User press the scroll right$/, async function () {
  this.driver.executeScript('window.scrollBy(2000,0)');
  await this.driver.sleep(1000);
  console.log('User press the scroll Right');
});

When(/^User press the scroll left$/, async function () {
  this.driver.executeScript('window.scrollBy(-2000,0)');
  await this.driver.sleep(1000);
  console.log('User press the scroll left');
});

When(/^User press the scroll up$/, async function () {
  this.driver.executeScript('window.scrollTo(0, -document.body.scrollHeight);');
  await this.driver.sleep(1000);
  console.log('User press the scroll UP');
});

When(/^User press the scroll down$/, async function () {
  await this.driver.executeScript('window.scrollBy(0,document.body.scrollHeight)');

  await this.driver.sleep(1000);
  console.log('User press the scroll down');
});

When(/^User makes scroll down to element "(.*?)"$/, async function (input) {
  const element = await this.driver.wait(until.elementLocated(By.xpath(input)), 15000);

  await this.driver.executeScript('arguments[0].scrollIntoView(true);', element);
  console.log('Scrolled  down to element');
});

Then(/^User enters iFrame by xpath "(.*?)"$/, async function (input) {
  const element = await this.driver.wait(until.elementLocated(By.xpath(input)), 15000);

  await this.driver.wait(until.ableToSwitchToFrame(element), 15000);
  console.log('The user see the object:    ' + input + '  - on page ');
});

When(/^User leaves the iframe$/, async function () {
  await this.driver.switchTo(this.driver.switchTo().defaultContent());
  console.log('User leaves the iframe');
});

Then(/^I validate the specific Object by xpath "(.*?)" and expected value "(.*?)"$/, async function (xpath, expectedValue) {
  console.log('__________________Step:  I validate the specific Object by xpath "(.*?)" and expected value "(.*?)"');

  let actualValue = undefined;

  for (let i=0;i<2;i++) {
    try {
      const elemntActualValue = await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000);

      actualValue = await elemntActualValue.getText();

      console.log(' elemntActualValue.getText() -> ACTUAL value = < ' +actualValue +' > ');

      if (actualValue === expectedValue) {
        console.log('PASSED - > Validating of EXPECTED value = ' + expectedValue + ' === ACTUAL value = ' +actualValue);

        return;
      }
    } catch (err) {
      console.log(err + ' -> received during the validation  -> trying again...');
      await  this.driver.sleep(2000);
    }

    console.log('Trying to validate..... Validating of EXPECTED value = ' + expectedValue + ' === ACTUAL value = < ' +actualValue+' >');
    await  this.driver.sleep(2000);
  }

  throw new Error('The validation has failed -> EXPECTED value = <' + expectedValue + ' > <> ACTUAL value = < ' + actualValue + ' >');
});

Then(/^I validate the specific Object by xpath "(.*?)" and INCLUDES expected value "(.*?)"$/, async function (xpath, expectedValue) {
  console.log('__________________Step:  I validate the specific Object by xpath "(.*?)" and INCLUDES expected value "(.*?)"');

  let actualValue = undefined;

  for (let i=0;i<2;i++) {
    try {
      const elemntActualValue = await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000);

      actualValue = await elemntActualValue.getText();

      console.log(' elemntActualValue.getText() -> ACTUAL value = < ' +actualValue +' > ');

      actualValue=actualValue.toLowerCase();
      expectedValue=expectedValue.toLowerCase();

      if (actualValue.includes(expectedValue)) {
        console.log('PASSED -> EXPECTED value = < ' + expectedValue + ' > INCLUDES in ACTUAL value = < ' +actualValue +' > ');

        return;
      }
    } catch (err) {
      console.log(err + ' -> received during the validation  -> trying again...');
      await  this.driver.sleep(2000);
    }

    console.log('Trying to validate..... EXPECTED value = < ' + expectedValue + ' > INCLUDES in ACTUAL value = < ' +actualValue +' > ');
    await  this.driver.sleep(2000);
  }

  throw new Error('FAILED -> EXPECTED value = <' + expectedValue + ' > does not INCLUDE in ACTUAL value =  < ' +actualValue+' > ');
});

