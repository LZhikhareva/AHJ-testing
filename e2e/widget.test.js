import puppeteer from 'puppeteer';

describe('Widget', () => {
  let browser;
  let page;
  beforeEach(async () => {
    browser = await puppeteer.launch();
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
  });
  afterEach(async () => {
    await browser.close();
  });
  it('should show error message if card number is invalid', async () => {
    const invalidCardNumber = '1234567890123456';
    await page.type('.input', invalidCardNumber);
    await page.click('.submit');
    await page.waitForSelector('.error');
    const errorMessage = await page.$eval('.error', el => el.textContent);
    expect(errorMessage).toBe('Недействительный номер карты!');
    const inputValue = await page.$eval('.input', el => el.value);
    expect(inputValue).toBe(invalidCardNumber);
    const hasInvalidClass = await page.$eval('.input', el => el.classList.contains('invalid'));
    expect(hasInvalidClass).toBe(true);
  });
  it('should not show error message if card number is valid', async () => {
    const validCardNumber = '4111111111111111';
    await page.type('.input', validCardNumber);
    await page.click('.submit');
    await page.waitForTimeout(1000);
    const errorElement = await page.$('.error');
    expect(errorElement).toBeNull();
    const inputValue = await page.$eval('.input', el => el.value);
    expect(inputValue).toBe('');
    const hasValidClass = await page.$eval('.input', el => el.classList.contains('valid'));
    expect(hasValidClass).toBe(true);
  });
});