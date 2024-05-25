import { test, expect } from '@playwright/test';

test('test bookmark button redirects to login', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:5173');

  // Wait for the navigation link to be available
  await page.waitForSelector('.header__nav-link');
  const navigationLinkBtn = await page.$('.header__nav-link');
  const loginButton = await page.$('.header__login');

  // If not logged in, click the navigation link
  if (!loginButton) {
    await navigationLinkBtn?.click();
  }

  // Wait for the bookmark button to be available
  await page.waitForSelector('.bookmark-button');
  const bookmarkButton = await page.$('.bookmark-button');

  // Click the bookmark button and wait for the login page to load
  await Promise.all([
    page.waitForURL('http://localhost:5173/login'),
    bookmarkButton?.click(),
  ]);

  // Navigate back to the main page
  await page.goto('http://localhost:5173');

  // Click on a city card
  const citiesCard = await page.$('.cities_card');
  await citiesCard?.click();

  // Wait for the bookmark button inside the card to be available
  await page.waitForSelector('.bookmark-button');
  const bookmarkButtonInsideCard = await page.$('.bookmark-button');

  // Click the bookmark button inside the card and wait for the login page to load
  await Promise.all([
    page.waitForURL('http://localhost:5173/login'),
    bookmarkButtonInsideCard?.click(),
  ]);
});

test('test bookmark with signed in', async ({ page }) => {
  // Process of logging into the profile
  await page.goto('http://localhost:5173');

  await page.waitForSelector('.header__nav-link');
  const loginButton = await page.$('.header__login');

  if (loginButton) {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[name="email"]', 'email@example.com');
    await page.fill('input[name="password"]', 'password123');

    await Promise.all([
      page.waitForURL('http://localhost:5173'), // Wait for the navigation after form submission
      page.click('button[type="submit"]'), // Click the "Sign in" button
    ]);
  }

  // Clear favorites
  await page.goto('http://localhost:5173/favorites');

  const clickAllBookmarkButtons = async () => {
    await page.waitForTimeout(500);
    const bookmarkButtons = await page.$$('.bookmark-button');

    for (const button of bookmarkButtons) {
      await button.click();
      await page.waitForTimeout(500);
    }
  };

  while ((await page.$('.bookmark-button')) !== null) {
    await clickAllBookmarkButtons();
  }

  expect(await page.$('.bookmark-button')).toBeNull();

  // Main part of the test

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);

  await page.waitForSelector('.bookmark-button');
  const bookmarkButtons = await page.$$('.bookmark-button');

  // Click the first bookmark button
  await bookmarkButtons[0].click();
  await page.waitForTimeout(2000);

  // Verify the favorite count has incremented
  const favCounter = page.locator('.header__favorite-count');
  const firstFav = await favCounter.textContent();
  expect(firstFav).not.toBe('0');

  // Click on another city card
  const citiesCards = await page.$$('.cities__card');
  await citiesCards[2].click();

  // Wait for the offer container to be available
  await page.waitForSelector('.offer__container');
  const bookmarkButtonInsideCard = await page.$('.bookmark-button');
  await bookmarkButtonInsideCard?.click();
  await page.waitForTimeout(2000);

  // Verify the favorite count has incremented again
  const newFavCounter = page.locator('.header__favorite-count');
  const newFav = await newFavCounter.textContent();
  console.log(firstFav, newFav);
  const parsedFav = parseFloat(newFav ?? '0');
  const expectFav = parseFloat(firstFav ?? '0') + 1;
  expect(parsedFav).toBe(expectFav);
});
