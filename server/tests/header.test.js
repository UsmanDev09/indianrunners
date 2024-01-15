const puppeteer = require('puppeteer');
const Page = require('./helpers/page');

let page;

beforeEach( async () => {
    page = await Page.build()
    
    await page.goto('http://localhost:3001');
})


afterEach( async () => {
    await page.close();
})

test('Renders the logo', async () => {
    const imageSelector = '[data-testid="logo"]';

    // Wait for the image to be present in the DOM
    await page.waitForSelector(imageSelector);

    // Get the image attributes within the Chromium instance
    const imageAttributes = await page.$eval(imageSelector, (img) => ({
      src: img.src,
      alt: img.alt,
    }));

    // // Expected values for alt
    const expectedAlt = 'Indian runners';

    // // Possible values for src
    const possibleSrcValues = ['http://localhost:3001/while_logo.svg', 'http://localhost:3001/black_logo.svg'];

    // // Assert that the actual src and alt values match the expected values
    expect(possibleSrcValues.includes(imageAttributes.src)).toBe(true);
    expect(imageAttributes.alt).toBe(expectedAlt);
})

test('clicking login starts oauth flow', async () => {
    
    await page.goto('http://localhost:3001/login');
    
    await page.click('[data-testid="login-with-google"]');
    
    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/)
})

test('When signed in, shows logout button', async () => {
    await page.login();

    // eval logout button
})

