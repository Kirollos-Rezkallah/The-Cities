import { test, expect } from '@playwright/test';

// Define a test case for checking the loading and displaying of cards from the server
test('check loading and displaying cards from server', async ({ page }) => {
  // Navigate to the page with cards
  await page.goto('http://localhost:5173');

  // Wait for the cards to load
  await page.waitForSelector('.cities__card');

  // Check that the cards have loaded and are displayed
  const cardElements = await page.$$('.cities__card');
  expect(cardElements.length).toBeGreaterThan(0); // Ensure that there is at least one card on the page
});
