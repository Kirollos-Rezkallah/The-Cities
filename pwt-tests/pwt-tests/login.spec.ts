import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test('Successful authentication', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:5173/login');

    // Fill in the login form
    await page.fill('input[name="email"]', 'email@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Submit the form and wait for the URL change after submission
    await Promise.all([
      page.waitForURL('http://localhost:5173'), // Wait for the page transition after form submission
      page.click('button[type="submit"]'), // Click on the "Sign in" button
    ]);
  });

  test('Authentication error (invalid password)', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:5173/login');

    // Fill in the login form with an invalid password
    await page.fill('input[name="email"]', 'example@example.com');
    await page.fill('input[name="password"]', 'ii');

    // Submit the form with invalid password and check for error message visibility
    await page.click('button[type="submit"]'); // Click on the "Sign in" button

    // Check if the error message for invalid password is visible
    await page.isVisible(
      "text='The password must consist of at least one English letter and one symbol without spaces.'"
    );

    // Assert that the URL remains on the login page after submission
    expect(page.url()).toBe('http://localhost:5173/login');
  });
});
