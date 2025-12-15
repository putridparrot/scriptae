import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the blog title and description', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('My Blog');
    await expect(page.locator('.blog-description')).toContainText('A markdown-based blog built with React');
  });

  test('should display post list', async ({ page }) => {
    // Wait for posts to load
    await page.waitForSelector('.post-list');
    
    // Should have at least one post
    const posts = page.locator('.post-preview');
    await expect(posts).not.toHaveCount(0);
  });

  test('should display pagination controls', async ({ page }) => {
    await page.waitForSelector('.posts-controls');
    
    // Should show post count
    await expect(page.locator('.post-count')).toContainText('Showing');
    await expect(page.locator('.post-count')).toContainText('posts');
  });

  test('should show correct number of posts initially', async ({ page }) => {
    await page.waitForSelector('.post-list');
    
    // Default is 5 posts per page
    const posts = page.locator('.post-preview');
    const count = await posts.count();
    
    // Should show max 5 posts initially (or less if there are fewer posts)
    expect(count).toBeLessThanOrEqual(5);
  });

  test('should navigate to a post when clicking a post title', async ({ page }) => {
    await page.waitForSelector('.post-preview h2 a');
    
    // Get the first post title and link
    const firstPostLink = page.locator('.post-preview h2 a').first();
    const postTitle = await firstPostLink.textContent();
    
    // Click the post link
    await firstPostLink.click();
    
    // Should navigate to post page
    await expect(page).toHaveURL(/\/post\//);
    
    // Post title should be displayed
    await expect(page.locator('.post h1')).toContainText(postTitle || '');
  });

  test('should have working theme switcher', async ({ page }) => {
    // Wait for theme switcher to be available
    await page.waitForSelector('.theme-switcher');
    
    // Get initial theme
    const initialBg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-background');
    });
    
    // Click theme switcher
    await page.click('.theme-switcher');
    
    // Wait for theme to change
    await page.waitForTimeout(300);
    
    // Background color should have changed
    const newBg = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-background');
    });
    
    expect(initialBg).not.toBe(newBg);
  });
});
