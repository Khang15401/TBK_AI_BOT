var assert = require("assert"),
  webdriver = require("selenium-webdriver"),
  { Builder, By, until } = webdriver,
  fs = require("fs"),
  conf_file = process.argv[3] || "conf/single.conf.js";

var caps = require("../" + conf_file).capabilities;

var buildDriver = function (caps) {
  return new webdriver.Builder()
    .usingServer(
      "http://" +
      LT_USERNAME +
      ":" +
      LT_ACCESS_KEY +
      "@hub.lambdatest.com/wd/hub"
    )
    .withCapabilities(caps)
    .build();
};

describe("Mocha Todo Test " + caps.browserName, function () {
  var driver;
  this.timeout(0);

  beforeEach(function (done) {
    caps.name = this.currentTest.title;
    driver = buildDriver(caps);
    done();
  });

  it("can find search results", async function (done) {
    try {
      await driver.get("https://web.telegram.org/");

        // await sleep(20000);
        await driver.manage().setTimeouts({ implicit: 20000 });
        await driver.manage().window().maximize();
        // await sleep(15000);

        let localData = JSON.parse(fs.readFileSync('telegram_local.json', 'utf-8'));

        await driver.executeScript(`
            const data = arguments[0];
            Object.keys(data).forEach(key => {
                window.localStorage.setItem(key, data[key]);
            });
        `, localData);

        await driver.navigate().refresh();

        await driver.sleep(5000);

        console.log('Login Success');


        let TBKBot = await driver.wait(
          until.elementLocated(By.xpath('//*[@id="column-left"]/div/div/div[1]/div[2]/input')),
          30000
      );
      await TBKBot.click();

      await driver.sleep(2000);
      await TBKBot.sendKeys('tbk_stg_bot');

      // await driver.executeScript("smartui.takeScreenshot=UI TBK1"); 

      let clickBot = await driver.findElement(By.xpath('//*[@id="search-container"]/div[2]/div[2]/div/div[1]/div/div[1]/ul/a/div[1]'));
      await clickBot.click();
      await sleep(3000);

      let startBot = await driver.findElement(By.xpath('//*[@id="column-center"]/div/div/div[4]/div/div[1]/div/div[8]/div[1]'));
      await startBot.click();
      await sleep(2000);

      let launchBot = await driver.findElement(By.xpath('/html/body/div[7]/div/div[2]/button[1]'));
      await launchBot.click();

      await driver.wait(until.elementLocated(By.xpath('/html/body/div[7]/div/div[2]/div/div[1]/iframe')), 20000);
      let iframe = await driver.findElement(By.xpath('/html/body/div[7]/div/div[2]/div/div[1]/iframe'));
      await driver.switchTo().frame(iframe);

      await sleep(2000);

        console.log("1. Action 1 Done");
        await driver.executeScript("smartui.takeScreenshot=Picture 1");
        await driver.sleep(2000);

    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
    }
  });

  afterEach(function (done) {
    if (this.currentTest.isPassed()) {
      driver.executeScript("lambda-status=passed");
    } else {
      driver.executeScript("lambda-status=failed");
    }
    driver.quit().then(function () {
      done();
    });
  });
});
