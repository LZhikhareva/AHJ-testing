import puppeteer from "puppeteer";

describe("Widget", () => {
  let browser;
  let page;
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
    await page.setContent(`
      <div class="widget">
        <input type="text" class="input">
        <button class="submit">Submit</button>
        <div class="card-images">
          <div class="card-image-item"></div>
          <div class="card-image-item"></div>
          <div class="card-image-item"></div>
          <div class="card-image-item"></div>
        </div>
      </div>
    `);

    await page.goto('http://localhost:9000');
    await page.waitForSelector('.form-widget');
  });
  afterEach(async () => {
    await browser.close();
  });

  test('widget should render on page start', async () => {
    await page.goto('http://localhost:9000');

    await page.waitForSelector('.form-widget');
  });

  it("should show error message if card number is invalid", async () => {
    const invalidCardNumber = "1234567890123456";
    await page.type(".input", invalidCardNumber);
    await page.click(".submit");
    await page.waitForSelector(".error", { timeout: 50000 });
    const errorMessage = await page.$eval(".error", (el) => el.textContent);
    expect(errorMessage).toBe("Недействительный номер карты!");
    const inputValue = await page.$eval(".input", (el) => el.value);
    expect(inputValue).toBe(invalidCardNumber);
    const hasInvalidClass = await page.$eval(".input", (el) =>
      el.classList.contains("invalid"),
    );
    expect(hasInvalidClass).toBe(true);
  }, 20000);
  it("should not show error message if card number is valid", async () => {
    const validCardNumber = "4111111111111111";
    await page.type(".input", validCardNumber);
    await page.click(".submit");
    // await page.waitForTimeout(1000);
    const errorElement = await page.$(".error");
    expect(errorElement).toBeNull();
    const inputValue = await page.$eval(".input", (el) => el.value);
    expect(inputValue).toBe("");
    const hasValidClass = await page.$eval(".input", (el) =>
      el.classList.contains("valid"),
    );
    expect(hasValidClass).toBe(true);
  }, 20000);
});
