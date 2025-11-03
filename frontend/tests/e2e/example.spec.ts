import { test, expect } from '@playwright/test';

test('opens app root and sees page', async ({ page }) => {
  await page.goto('/');
  // Placeholder assertion; adjust when UI exists
  await expect(page).toHaveURL(/\//);
});


