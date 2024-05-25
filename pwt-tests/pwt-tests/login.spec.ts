import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test('should successfully login with valid credentials', async ({ page }) => {
    // Navigate to the main page
    await page.goto('http://localhost:5173');

    // Wait for the navigation link to be available
    await page.waitForSelector('.header__nav-link');
    const navigationLinkBtn = await page.$('.header__nav-link');
    const loginButton = await page.$('.header__login');

    // If not logged in, click the navigation link
    if (!loginButton) {
      await navigationLinkBtn?.click();
    }

    // Navigate to the login page
    await page.goto('http://localhost:5173/login');

    // Fill in the login form
    await page.fill('input[name="email"]', 'email@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Submit the form and wait for navigation to the main page
    await Promise.all([
      page.waitForURL('http://localhost:5173'), // Wait for navigation after form submission
      page.click('button[type="submit"]'), // Click the "Sign in" button
    ]);
  });

  test('should display error message with invalid password', async ({
    page,
  }) => {
    // Navigate to the main page
    await page.goto('http://localhost:5173');

    // Wait for the navigation link to be available
    await page.waitForSelector('.header__nav-link');
    const navigationLinkBtn = await page.$('.header__nav-link');
    const loginButton = await page.$('.header__login');

    // If not logged in, click the navigation link
    if (!loginButton) {
      await navigationLinkBtn?.click();
    }

    // Open the login page
    await page.goto('http://localhost:5173/login');

    // Fill in the login form with invalid password
    await page.fill('input[name="email"]', 'example@example.com');
    await page.fill('input[name="password"]', 'ii');

    // Submit the form
    await page.click('button[type="submit"]'); // Click the "Sign in" button

    // Wait for the error message to appear
    await page.waitForSelector('.Toastify__toast-body');

    // Verify that the URL remains the same, indicating an unsuccessful login
    const url = page.url();
    expect(url).toBe('http://localhost:5173/login');
  });
});
