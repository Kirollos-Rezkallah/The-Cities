import { test, expect } from '@playwright/test';

test.describe('Comment Form', () => {
  test('Check comment form functionality (authenticated user)', async ({
    page,
  }) => {
    // Define sample review text and rating
    const REVIEW_TEXT =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const RATING = 'good';

    // Navigate to the login page
    await page.goto('http://localhost:5173/login');

    // Fill in the login form
    await page.fill('input[name="email"]', 'newUser@example.com');
    await page.fill('input[name="password"]', 'password123');

    // Submit the login form
    await page.click('button[type="submit"]');

    // Wait for the cities cards to load
    await page.waitForSelector('.cities__card');

    // Click on the first city card
    await page.locator('.cities__card').first().click();

    // Wait for the offer gallery to load
    await page.waitForSelector('.offer__gallery');

    // Check if the comment form is visible
    const isFormExist = await page.isVisible('.reviews__form');
    expect(isFormExist).toBeTruthy();

    // Fill in the review text and select rating
    await page.fill('[name="review"]', REVIEW_TEXT);
    await page.getByTitle(RATING).click();

    // Submit the review form and wait for response
    await Promise.all([
      page.waitForResponse(
        (resp) => resp.url().includes('/comments') && resp.status() === 201
      ),
      page.click('button[type="submit"]'),
    ]);

    // Check if the new review text, author, and rating are as expected
    const newReviewText = await page
      .locator('.reviews__text')
      .first()
      .textContent();
    const newReviewAuthor = await page
      .locator('.reviews__user-name')
      .first()
      .textContent();
    const newReviewRating = await page
      .locator('.reviews__stars>span')
      .first()
      .getAttribute('style');

    expect(newReviewText).toBe(REVIEW_TEXT);
    expect(newReviewAuthor).toBe('newUser');
    expect(newReviewRating).toBe('width: 80%;');
  });

  test('Check comment form functionality (unauthenticated user)', async ({
    page,
  }) => {
    // Navigate to the main page
    await page.goto('http://localhost:5173');

    // Wait for the cities cards to load
    await page.waitForSelector('.cities__card');

    // Click on the first city card
    await page.locator('.cities__card').first().click();

    // Wait for the offer gallery to load
    await page.waitForSelector('.offer__gallery');

    // Check if the comment form is not visible for unauthenticated user
    const isCommentFormExist = await page.locator('.reviews__form').isVisible();
    expect(isCommentFormExist).toBeFalsy();
  });
});
