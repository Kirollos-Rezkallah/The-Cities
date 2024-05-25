import { test, expect } from '@playwright/test';

test('check navigation to card details page and card details match', async ({
  page,
}) => {
  // Navigate to the page with cards
  await page.goto('http://localhost:5173');

  // Wait for the cards to load
  await page.waitForSelector('.cities__card');

  // Find the first card
  const firstCard = await page.$('.cities__card');

  // Get part of the href attribute value from the link inside the card
  const hrefAttributeValue = await firstCard?.$eval('a', (el) => {
    const href = el.getAttribute('href');
    return href ? href.split('/').pop() : '';
  });

  // Find the first card and remember its name and price
  const firstCardName = await firstCard?.$eval('.place-card__name a', (el) =>
    el.textContent?.trim()
  );
  const firstCardPrice = await firstCard?.$eval(
    '.place-card__price-value',
    (el) => el.textContent?.trim()
  );

  // Click on the first card
  await firstCard?.click();

  // Wait for navigation to the new page
  await page.waitForSelector('.offer__gallery');

  // Get the current URL of the page without the base part
  const currentUrl = page.url().replace('http://localhost:5173/', '');

  // Check that the URL after navigation contains the part corresponding to the href of the first card
  expect(currentUrl).toContain(hrefAttributeValue);

  // Check that the name and price of the first card on the details page match what we remembered earlier
  const cardDetailsName = await page.$eval('.offer__name', (el) =>
    el.textContent?.trim()
  );
  const cardDetailsPrice = await page.$eval('.offer__price-value', (el) =>
    el.textContent?.trim()
  );

  expect(cardDetailsName).toBe(firstCardName);
  expect(cardDetailsPrice).toBe(firstCardPrice);
});
