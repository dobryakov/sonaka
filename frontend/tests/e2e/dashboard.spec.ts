import { test, expect } from '@playwright/test';

test('dashboard page loads without console errors', async ({ page, baseURL }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/dashboard', { waitUntil: 'networkidle' });

  // Basic sanity: page content contains key blocks
  const bodyText = await page.locator('body').innerText();
  expect(bodyText.length).toBeGreaterThan(0);

  // Totals block appears
  await expect(page.getByText('Всего заказов')).toBeVisible();

  // At least one order rendered as list item
  const items = page.locator('ul > li');
  await expect(items).toHaveCountGreaterThan(0 as unknown as number);

  // No console errors
  expect(errors, errors.join('\n')).toEqual([]);
});


