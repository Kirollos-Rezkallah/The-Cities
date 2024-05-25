import { test, expect } from '@playwright/test';

test('check sorting of cards by price', async ({ page }) => {
  // Open the page with cards
  await page.goto('http://localhost:5173');

  // Wait for the cards to load
  await page.waitForSelector('.cities__card');

  // Get the prices of all cards before sorting
  const pricesBeforeSorting = await page.$$eval(
    '.cities__card .place-card__price-value',
    (prices) =>
      prices.map((price) =>
        parseFloat(price.textContent?.replace('€', '').trim() ?? '0')
      )
  );

  // Sort the prices of the cards in ascending order
  const sortedPricesUp = [...pricesBeforeSorting].sort((a, b) => a - b);
  // Sort the prices of the cards in descending order
  const sortedPricesDown = [...pricesBeforeSorting].sort((a, b) => b - a);

  // Click the sorting dropdown
  await page.click('.places__sorting-type');
  // Select "Price: low to high" option
  await page.click('text="Price: low to high"');

  // Wait for the cards to be re-rendered after sorting
  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  // Get the prices of all cards after sorting in ascending order
  const pricesAfterSortingUp = await page.$$eval(
    '.cities__card .place-card__price-value',
    (prices) =>
      prices.map((price) =>
        parseFloat(price.textContent?.replace('€', '').trim() ?? '0')
      )
  );

  // Click the sorting dropdown again
  await page.click('.places__sorting-type');
  // Select "Price: high to low" option
  await page.click('text="Price: high to low"');

  // Wait for the cards to be re-rendered after sorting
  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  // Get the prices of all cards after sorting in descending order
  const pricesAfterSortingDown = await page.$$eval(
    '.cities__card .place-card__price-value',
    (prices) =>
      prices.map((price) =>
        parseFloat(price.textContent?.replace('€', '').trim() ?? '0')
      )
  );

  // Check that the prices of the cards after sorting match the expected order
  expect(pricesAfterSortingUp).toEqual(sortedPricesUp);
  expect(pricesAfterSortingDown).toEqual(sortedPricesDown);
});
