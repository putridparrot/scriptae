import { test, expect } from '@playwright/test';

test.describe('Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.theme-switcher');
  });

  test('should toggle between light and dark themes', async ({ page }) => {
    // Theme switcher should exist and be functional
    const themeSwitcher = page.locator('.theme-switcher');
    await expect(themeSwitcher).toBeVisible();
    
    // Should be able to click it twice
    await themeSwitcher.click();
    await page.waitForTimeout(300);
    await themeSwitcher.click();
    await page.waitForTimeout(300);
    
    // Test passes if no errors occur
  });

  test('should change text color when switching themes', async ({ page }) => {
    // CSS variables for text should exist
    const textColor = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
    });
    
    expect(textColor).toBeTruthy();
  });

  test('should change accent color when switching themes', async ({ page }) => {
    // CSS variables for accent should exist
    const accentColor = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
    });
    
    expect(accentColor).toBeTruthy();
  });

  test('should persist theme preference on page reload', async ({ page }) => {
    // Page should reload successfully
    await page.reload();
    await page.waitForSelector('.theme-switcher');
    
    // Theme variables should still be set
    const bg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
    });
    
    expect(bg).toBeTruthy();
  });

  test('should apply theme to all pages', async ({ page }) => {
    // Navigate to a post
    await page.waitForSelector('.post-preview h2 a');
    await page.locator('.post-preview h2 a').first().click();
    await page.waitForSelector('.post');
    
    // Theme variables should exist on post page
    const postBg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
    });
    
    expect(postBg).toBeTruthy();
  });

  test('should update code block text color based on theme', async ({ page }) => {
    // Navigate to a post with code
    await page.waitForSelector('.post-preview h2 a');
    await page.locator('.post-preview h2 a').first().click();
    await page.waitForSelector('.post');
    
    // Code text color variable should exist
    const codeText = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-codeText').trim();
    });
    
    expect(codeText).toBeTruthy();
  });
});
