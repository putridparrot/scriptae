import { test, expect } from '@playwright/test';

test.describe('Post Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage first
    await page.goto('/');
    await page.waitForSelector('.post-preview h2 a');
    
    // Click on the first post
    await page.locator('.post-preview h2 a').first().click();
    
    // Wait for post page to load
    await page.waitForSelector('.post');
  });

  test('should display post title', async ({ page }) => {
    const title = page.locator('.post h1');
    await expect(title).toBeVisible();
    await expect(title).not.toHaveText('');
  });

  test('should display post content', async ({ page }) => {
    const content = page.locator('.post-content');
    await expect(content).toBeVisible();
  });

  test('should display back button', async ({ page }) => {
    const backButton = page.locator('.back-link');
    await expect(backButton).toBeVisible();
    await expect(backButton).toContainText('Back');
  });

  test('should navigate back to home when clicking back button', async ({ page }) => {
    const backButton = page.locator('.back-link');
    await backButton.click();
    
    // Should be back on homepage
    await expect(page).toHaveURL('/');
    await expect(page.locator('.post-list')).toBeVisible();
  });

  test('should render markdown headings', async ({ page }) => {
    const content = page.locator('.post-content');
    
    // Check if there are any headings in the content
    const headings = content.locator('h1, h2, h3, h4, h5, h6');
    const count = await headings.count();
    
    // At least one heading should exist in the markdown content
    expect(count).toBeGreaterThan(0);
  });

  test('should render markdown paragraphs', async ({ page }) => {
    const content = page.locator('.post-content');
    const paragraphs = content.locator('p');
    
    await expect(paragraphs.first()).toBeVisible();
  });

  test('should render markdown links', async ({ page }) => {
    const content = page.locator('.post-content');
    const links = content.locator('a');
    
    // If there are links, they should have href attributes
    const count = await links.count();
    if (count > 0) {
      await expect(links.first()).toHaveAttribute('href');
    }
  });
});
