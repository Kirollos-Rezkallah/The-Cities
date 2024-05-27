import { test, expect, Locator } from '@playwright/test';

test('Check city filter functionality', async ({ page }) => {
  // Open the page with cards
  await page.goto('http://localhost:5173');

  // Function to check if an element is active
  const isActive = async (locator: Locator) => {
    const classList = await locator.evaluate((el) => [...el.classList]);
    return classList.includes('tabs__item--active');
  };

  // Wait for the city links to appear
  await page.waitForSelector('.locations__item-link');

  // Iterate through each city link
  for (const li of await page.locator('.locations__item-link').all()) {
    await li.click();
    const currentCity = await li.textContent();

    // Wait for the cards to reload after filtering
    await page.waitForSelector('.cities__card', {
      state: 'attached',
      timeout: 5000,
    });

    // Clicked element should have active class
    const hasActiveClass = await isActive(li);
    expect(hasActiveClass).toBeTruthy();

    // Get the text indicating the number of places found
    const placesFoundText = await page.locator('.places__found').textContent();

    // Get the last word from the text
    const lastWord = placesFoundText?.split(' ').pop();
    // Check if the value of the data-test attribute matches the last word from places__found
    expect(currentCity).toBe(lastWord);
  }
});
