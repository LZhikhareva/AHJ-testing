в данный момент 3 ошибки при запуске e2e тестов
 FAIL  e2e/widget.test.js (7.567 s)
  ● Widget › should show error message if card number is invalid

    thrown: "Exceeded timeout of 5000 ms for a test.
    Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

      23 |     await browser.close();
      24 |   });
    > 25 |   it("should show error message if card number is invalid", async () => {
         |   ^
      26 |     const invalidCardNumber = "1234567890123456";
      27 |     await page.type(".input", invalidCardNumber);
      28 |     await page.click(".submit");

      at it (e2e/widget.test.js:25:3)
      at Object.describe (e2e/widget.test.js:3:1)

  ● Widget › should not show error message if card number is valid

    TypeError: page.waitForTimeout is not a function

      41 |     await page.type(".input", validCardNumber);
      42 |     await page.click(".submit");
    > 43 |     await page.waitForTimeout(1000);
         |                ^
      44 |     const errorElement = await page.$(".error");
      45 |     expect(errorElement).toBeNull();
      46 |     const inputValue = await page.$eval(".input", (el) => el.value);

      at Object.waitForTimeout (e2e/widget.test.js:43:16)

 FAIL  e2e/start.test.js
  ● Page start › page starts

    net::ERR_CONNECTION_REFUSED at http://localhost:9000

      16 |
      17 |   test("page starts", async () => {
    > 18 |     await page.goto("http://localhost:9000");
         |     ^
      19 |
      20 |     await page.waitFor("body");
      21 |   });

      at navigate (node_modules/puppeteer-core/src/cdp/Frame.ts:214:13)
      at Function.race (node_modules/puppeteer-core/src/util/Deferred.ts:49:14)
      at CdpFrame.goto (node_modules/puppeteer-core/src/cdp/Frame.ts:167:17)
      at CdpPage.goto (node_modules/puppeteer-core/src/api/Page.ts:1649:12)
      at Object.<anonymous> (e2e/start.test.js:18:5)
