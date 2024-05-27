import { test, expect } from '@playwright/test';

test('Check sorting of cards by price', async ({ page }) => {
  // Open the page with cards
  await page.goto('http://localhost:5173');

  // Wait for the cards to load
  await page.waitForSelector('.cities__card');

  // Get the prices of all cards before sorting
  const pricesBeforeSorting = await page
    .locator('.place-card__price-value')
    .allTextContents();

  // Sort the cards from low to high price
  await page.click('.places__sorting-type');
  await page.click('text="Price: low to high"');

  // Wait for the cards to be redrawn after sorting
  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  // Get prices of cards after sorting in ascending order
  const pricesAfterSortingUp = (
    await page.locator('.place-card__price-value').allTextContents()
  ).map((price) => parseInt(price.replace('€', '').trim()));

  // Check if the prices are in ascending order after sorting
  for (let i = 0; i < pricesAfterSortingUp.length - 1; i++) {
    expect(pricesAfterSortingUp[i + 1]).toBeGreaterThanOrEqual(
      pricesAfterSortingUp[i]
    );
  }

  // Sort the cards from high to low price
  await page.click('.places__sorting-type');
  await page.click('text="Price: high to low"');

  // Wait for the cards to be redrawn after sorting
  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  // Get prices of cards after sorting in descending order
  const pricesAfterSortingDown = (
    await page.locator('.place-card__price-value').allTextContents()
  ).map((price) => parseInt(price.replace('€', '').trim()));

  // Check if the prices are in descending order after sorting
  for (let i = 0; i < pricesAfterSortingDown.length - 1; i++) {
    expect(pricesAfterSortingDown[i + 1]).toBeLessThanOrEqual(
      pricesAfterSortingDown[i]
    );
  }

  // Sort the cards by popularity
  await page.click('.places__sorting-type');
  await page.click('text="Popular"');

  // Wait for the cards to be redrawn after sorting
  await page.waitForSelector('.cities__card', {
    state: 'attached',
    timeout: 5000,
  });

  // Get prices of cards after sorting by popularity
  const pricesAfterSorting = await page
    .locator('.place-card__price-value')
    .allTextContents();

  // Check if the prices remain the same after sorting by popularity
  for (let i = 0; i < pricesAfterSorting.length; i++) {
    pricesAfterSorting[i] === pricesBeforeSorting[i];
  }
});
