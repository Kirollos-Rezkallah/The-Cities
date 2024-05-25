import { test, expect } from '@playwright/test';

test('check filtering of cards', async ({ page }) => {
  // Navigate to the page with cards
  await page.goto('http://localhost:5173');

  // Wait for the cards to load
  await page.waitForSelector('.cities__card');

  // Get all location elements
  const locations = await page.$$('.locations__item-link');
  for (const location of locations) {
    // Get the value of the data-test attribute
    const dataTestValue = await location.getAttribute('data-test');

    // Click on the location element
    await location.click();

    // Wait for the page to refresh
    await page.waitForSelector('.places__found', { state: 'attached' });
    // Wait for the cards to be re-rendered after filtering
    await page.waitForSelector('.cities__card', {
      state: 'attached',
      timeout: 5000,
    });

    // Get the text content of the places found element
    const placesFoundText = await page.$eval('.places__found', (el) =>
      el.textContent?.trim()
    );

    // Get the last word from the text content
    const lastWord = placesFoundText?.split(' ').pop();

    // Check that the value of the data-test attribute matches the last word from places__found
    expect(dataTestValue).toBe(lastWord);
  }
});
