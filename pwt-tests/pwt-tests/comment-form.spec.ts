import { test, expect } from '@playwright/test';

test('comment submission form functionality (signed in)', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:5173');

  // Wait for the navigation link to be available
  await page.waitForSelector('.header__nav-link');
  const navigationLinkBtn = await page.$('.header__nav-link');
  const loginButton = await page.$('.header__login');

  if (loginButton) {
    // If there is a login element, click on it
    await navigationLinkBtn?.click();
  } else {
    // If there is no login element, look for a logout element and click on it
    await navigationLinkBtn?.click();

    // Wait for some time to allow the page to refresh after logging out
    await page.waitForTimeout(2000);

    // Navigate to the login page
    await page.goto('http://localhost:5173/login');
  }

  // Wait for some time to ensure the page has loaded
  await page.waitForTimeout(2000);

  // Fill in the login form
  await page.fill('input[name="email"]', 'email@example.com');
  await page.fill('input[name="password"]', 'password123');

  // Submit the login form and wait for navigation to the main page
  await Promise.all([
    page.waitForURL('http://localhost:5173'),
    page.click('button[type="submit"]'),
  ]);

  // Wait for the cards to load
  await page.waitForSelector('.cities__card');
  const firstCard = await page.$('.cities__card');
  // Click on the first card
  await firstCard?.click();
  // Wait for the gallery to load
  await page.waitForSelector('.offer__gallery');

  // Ensure the comment form is available
  const commentForm = await page.$('.reviews__form');
  expect(commentForm).toBeTruthy();

  // Fill in the comment form
  const reviewText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  await page.fill('[name="review"]', reviewText);

  // Select a rating
  const ratingInputs = await page.$$('.form__rating-label');
  const selectedRating = ratingInputs[0];
  await selectedRating.click();

  // Submit the comment form
  await page.click('button[type="submit"]');

  // Wait for some time to ensure the comment is submitted
  await page.waitForTimeout(3000);

  // Verify that the new review appears
  const newReview = await page.$('.reviews__item');
  const newReviewText = await newReview?.$eval('.reviews__text', (el) =>
    el.textContent?.trim()
  );
  expect(newReviewText).toBe(reviewText);
});

test('comment submission form functionality (signed up)', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:5173');

  // Wait for the navigation link to be available
  await page.waitForSelector('.header__nav-link');
  const navigationLinkBtn = await page.$('.header__nav-link');
  const loginButton = await page.$('.header__login');

  if (!loginButton) {
    // If there is no login element, assume the user is logged in and navigate to the main page
    await Promise.all([
      page.waitForURL('http://localhost:5173'),
      navigationLinkBtn?.click(),
    ]);
  }

  // Wait for the cards to load
  await page.waitForSelector('.cities__card');
  const firstCard = await page.$('.cities__card');
  // Click on the first card
  await firstCard?.click();
  // Wait for the gallery to load
  await page.waitForSelector('.offer__gallery');

  // Ensure the comment form is not available for non-logged-in users
  const commentForm = await page.$('.reviews__form');
  expect(commentForm).not.toBeTruthy();
});
