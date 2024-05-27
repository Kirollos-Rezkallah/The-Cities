import { test, expect } from '@playwright/test';

test.describe('Favourites', () => {
  test('Check favourite functionality (unauthenticated user)', async ({
    page,
  }) => {
    // Navigate to the main page
    await page.goto('http://localhost:5173');

    // Wait for the cities cards to load
    await page.waitForSelector('.cities__card');

    // Click on the bookmark button of the first city card
    await page.locator('.bookmark-button').first().click();

    // Wait for redirection to the login page
    await page.waitForURL('http://localhost:5173/login');

    // Navigate back to the main page
    await page.goto('http://localhost:5173');

    // Wait for the cities cards to load again
    await page.waitForSelector('.cities__card');

    // Click on the first city card
    await page.locator('.cities__card').first().click();

    // Wait for the offer gallery to load
    await page.waitForSelector('.offer__gallery');

    // Click on the bookmark button of the first city card
    await page.locator('.bookmark-button').first().click();

    // Wait for redirection to the login page
    await page.waitForURL('http://localhost:5173/login');

    // Navigate to the favourites page
    await page.goto('http://localhost:5173/favorites');

    // Wait for redirection to the login page
    await page.waitForURL('http://localhost:5173/login');
  });

  test('Check favourite functionality (authenticated user)', async ({
    page,
  }) => {
    // Function to check if the favourite button is selected
    const isFavSelected = async () => {
      const favBtnClassList = await page
        .locator('.bookmark-button')
        .first()
        .evaluate((el) => [...el.classList]);
      return favBtnClassList.includes('place-card__bookmark-button--active');
    };

    // Function to get the favourite count
    const getFavCount = async () =>
      parseInt(
        (await page.locator('.header__favorite-count').textContent()) || '0'
      );

    // Navigate to the login page
    await page.goto('http://localhost:5173/login');

    // Fill in the login form
    await page.fill('input[name="email"]', 'email@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Submit the login form
    await Promise.all([
      page.waitForURL('http://localhost:5173'), // Wait for redirection after form submission
      page.click('button[type="submit"]'), // Click on the "Sign in" button
    ]);

    // Wait for the cities cards to load
    await page.waitForSelector('.cities__card');

    // Get the initial favourite count
    const initialFavCounter = await getFavCount();

    // Check if the favourite button was initially selected
    const wasActive = await isFavSelected();

    // Toggle the favourite button
    await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes('/favorite') &&
          resp.status() === (wasActive ? 200 : 201)
      ),
      page.locator('.bookmark-button').first().click(),
    ]);

    // Check if the favourite button is now selected
    const isActive = await isFavSelected();

    // Get the changed favourite count
    const changedFavCounter = await getFavCount();

    // Compare the favourite count and button state after toggling
    if (wasActive) {
      expect(isActive).toBeFalsy();
      expect(changedFavCounter).toEqual(initialFavCounter - 1);
    } else {
      expect(isActive).toBeTruthy();
      expect(changedFavCounter).toEqual(initialFavCounter + 1);
    }
  });
});
