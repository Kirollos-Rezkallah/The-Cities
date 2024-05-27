import { test, expect } from '@playwright/test';

test('Check loading of cards on the main page', async ({ page }) => {
  // Open the page with cards
  page.waitForResponse(
    (resp) => resp.url().includes('/offers') && resp.status() === 200
  );

  // Navigate to the main page
  await page.goto('http://localhost:5173');

  // Wait for the navigation links to load
  await page.waitForSelector('.header__nav-link');

  // Get all card titles
  const cardTitles = await page.getByTestId('cardTitle').allInnerTexts();

  // Check if card titles are loaded and have content
  expect(cardTitles.length).toBeGreaterThan(0);
  // Check if each card title has a length greater than 5
  cardTitles.forEach((title) => title.length > 5);
});
