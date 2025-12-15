import { test, expect } from '@playwright/test';

test.describe('Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.theme-switcher');
  });

  test('should toggle between light and dark themes', async ({ page }) => {
    // Get initial background color
    const initialBg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
    });
    
    // Click theme switcher
    await page.click('.theme-switcher');
    await page.waitForTimeout(300);
    
    // Get new background color
    const newBg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
    });
    
    // Colors should be different
    expect(initialBg).not.toBe(newBg);
    
    // Toggle back
    await page.click('.theme-switcher');
    await page.waitForTimeout(300);
    
    // Should return to original color
    const finalBg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
    });
    
    expect(finalBg).toBe(initialBg);
  });

  test('should change text color when switching themes', async ({ page }) => {
    // Get initial text color
    const initialText = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
    });
    
    // Switch theme
    await page.click('.theme-switcher');
    await page.waitForTimeout(300);
    
    // Text color should change
    const newText = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
    });
    
    expect(initialText).not.toBe(newText);
  });

  test('should change accent color when switching themes', async ({ page }) => {
    const initialAccent = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
    });
    
    await page.click('.theme-switcher');
    await page.waitForTimeout(300);
    
    const newAccent = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
    });
    
    expect(initialAccent).not.toBe(newAccent);
  });

  test('should persist theme preference on page reload', async ({ page }) => {
    // Switch to dark theme
    await page.click('.theme-switcher');
    await page.waitForTimeout(300);
    
    const darkBg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
    });
    
    // Reload page
    await page.reload();
    await page.waitForSelector('.theme-switcher');
    await page.waitForTimeout(300);
    
    // Should still be in dark theme
    const reloadedBg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
    });
    
    expect(reloadedBg).toBe(darkBg);
  });

  test('should apply theme to all pages', async ({ page }) => {
    // Switch theme on home page
    await page.click('.theme-switcher');
    await page.waitForTimeout(300);
    
    const homeBg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
    });
    
    // Navigate to a post
    await page.waitForSelector('.post-preview h2 a');
    await page.locator('.post-preview h2 a').first().click();
    await page.waitForSelector('.post');
    
    // Theme should be the same on post page
    const postBg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
    });
    
    expect(postBg).toBe(homeBg);
  });

  test('should update code block text color based on theme', async ({ page }) => {
    // Navigate to a post with code
    await page.waitForSelector('.post-preview h2 a');
    await page.locator('.post-preview h2 a').first().click();
    await page.waitForSelector('.post');
    
    // Get initial code text color (light theme)
    const lightCodeText = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-codeText').trim();
    });
    
    // Switch to dark theme
    await page.click('.theme-switcher');
    await page.waitForTimeout(300);
    
    // Code text color should change
    const darkCodeText = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-codeText').trim();
    });
    
    expect(lightCodeText).not.toBe(darkCodeText);
  });
});
