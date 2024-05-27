import { test, expect } from '@playwright/test';

test('Check navigation to card page', async ({ page }) => {
  // Navigate to the main page
  await page.goto('http://localhost:5173');

  // Wait for the cards to load
  await page.waitForSelector('.cities__card');

  // Find the first card and remember its name and price
  const firstCardName = await page
    .getByTestId('cardTitle')
    .first()
    .textContent();
  const firstCardPrice = await page
    .locator('.place-card__price-value')
    .first()
    .textContent();

  // Click on the first card
  await page.locator('.cities__card').first().click();

  // Wait for navigation to the new page
  await page.waitForSelector('.offer__gallery');

  // Check that the name and price of the first card on the details page match what we remembered earlier
  const cardDetailsName = await page.locator('.offer__name').textContent();
  const cardDetailsPrice = await page
    .locator('.offer__price-value')
    .textContent();

  expect(cardDetailsName).toBe(firstCardName);
  expect(cardDetailsPrice).toBe(firstCardPrice);

  // Check if there are any offer details present on the page
  const offerDetails = await page.locator('.offer__inside-item').all();
  expect(offerDetails.length).toBeGreaterThan(0);
});
