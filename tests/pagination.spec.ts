import { test, expect } from '@playwright/test';

test.describe('Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.post-list');
  });

  test('should show "Show All" button when not showing all posts', async ({ page }) => {
    // Check if "Show All" button is visible (only if there are more than 5 posts)
    const postCount = await page.locator('.post-preview').count();
    const showAllBtn = page.locator('[data-action="show-all"]');
    
    if (postCount >= 5) {
      await expect(showAllBtn).toBeVisible();
    }
  });

  test('should display all posts when clicking "Show All"', async ({ page }) => {
    const showAllBtn = page.locator('[data-action="show-all"]');
    
    // Only test if button is visible
    if (await showAllBtn.isVisible()) {
      const initialCount = await page.locator('.post-preview').count();
      
      // Click Show All
      await showAllBtn.click();
      
      // Wait for re-render
      await page.waitForTimeout(300);
      
      // Should show more posts (or same if already showing all)
      const newCount = await page.locator('.post-preview').count();
      expect(newCount).toBeGreaterThanOrEqual(initialCount);
      
      // "Show Less" button should now be visible
      await expect(page.locator('[data-action="show-less"]')).toBeVisible();
    }
  });

  test('should change posts limit when updating input', async ({ page }) => {
    const limitInput = page.locator('[data-action="change-posts-limit"]');
    
    // Change limit to 2
    await limitInput.fill('2');
    
    // Wait for re-render
    await page.waitForTimeout(300);
    
    // Should show max 2 posts
    const postCount = await page.locator('.post-preview').count();
    expect(postCount).toBeLessThanOrEqual(2);
  });

  test('should navigate to older posts', async ({ page }) => {
    // Check if "Older Posts" link is visible
    const olderPostsLink = page.locator('[data-action="older-posts"]');
    
    if (await olderPostsLink.isVisible()) {
      // Get the first post title on page 1
      const firstPostTitle = await page.locator('.post-preview h2 a').first().textContent();
      
      // Click Older Posts
      await olderPostsLink.click();
      
      // Wait for re-render
      await page.waitForTimeout(300);
      
      // The first post should be different now
      const newFirstPostTitle = await page.locator('.post-preview h2 a').first().textContent();
      expect(newFirstPostTitle).not.toBe(firstPostTitle);
      
      // "Newer Posts" link should now be visible
      await expect(page.locator('[data-action="newer-posts"]')).toBeVisible();
    }
  });

  test('should navigate back to newer posts', async ({ page }) => {
    const olderPostsLink = page.locator('[data-action="older-posts"]');
    
    if (await olderPostsLink.isVisible()) {
      // Go to older posts first
      await olderPostsLink.click();
      await page.waitForTimeout(300);
      
      // Now click Newer Posts
      const newerPostsLink = page.locator('[data-action="newer-posts"]');
      await newerPostsLink.click();
      
      // Wait for re-render
      await page.waitForTimeout(300);
      
      // Should be back on first page - Newer Posts link should be hidden
      await expect(newerPostsLink).not.toBeVisible();
    }
  });

  test('should hide pagination when showing all posts', async ({ page }) => {
    const showAllBtn = page.locator('[data-action="show-all"]');
    
    if (await showAllBtn.isVisible()) {
      await showAllBtn.click();
      await page.waitForTimeout(300);
      
      // Pagination links should be hidden
      await expect(page.locator('.pagination')).not.toBeVisible();
    }
  });
});
