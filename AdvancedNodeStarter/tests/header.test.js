const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');

let browser;
let page;
beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox'],
  });
  page = await browser.newPage();
  await page.goto('localhost:3000');
});
afterEach(async () => {
  await browser.close();
});

test('Confirm the header has the correct text.', async () => {
  const text = await page.$eval('a.brand-logo', (el) => el.innerHTML);
  expect(text).toEqual('Blogster');
});

test('clicking login starts oAuth flow', async () => {
  await page.click('.right a');
  const url = await page.url();
  //console.log('url', url);
  expect(url).toMatch(/accounts.google.com/);
});

test('When signed in, shows log out button.', async () => {
  const { session, sig } = await sessionFactory();

  await page.setCookie({ name: 'session', value: session });
  await page.setCookie({ name: 'session.sig', value: sig });
  await page.goto('localhost:3000');

  await page.waitFor('a[href="/auth/logout"]');
  const text = await page.$eval('a[href="/auth/logout"]', (el) => {
    return el.innerHTML;
  });
  expect(text).toEqual('Logout');
});
