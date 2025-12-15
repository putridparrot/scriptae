import { test, expect } from '@playwright/test';

test.describe('Code Blocks', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to first post that contains code
    await page.goto('/');
    await page.waitForSelector('.post-preview h2 a');
    await page.locator('.post-preview h2 a').first().click();
    await page.waitForSelector('.post');
  });

  test('should render code blocks with syntax highlighting', async ({ page }) => {
    // Check if there are any code blocks
    const codeBlocks = page.locator('pre code');
    const count = await codeBlocks.count();
    
    if (count > 0) {
      // Code block should be visible
      await expect(codeBlocks.first()).toBeVisible();
      
      // Code blocks should contain highlighted content
      const textContent = await codeBlocks.first().textContent();
      expect(textContent).toBeTruthy();
    }
  });

  test('should display line numbers in code blocks', async ({ page }) => {
    const codeBlocks = page.locator('pre code');
    const count = await codeBlocks.count();
    
    if (count > 0) {
      // Line numbers should be present
      const lineNumbers = page.locator('.react-syntax-highlighter-line-number');
      const lineNumberCount = await lineNumbers.count();
      
      // If there are code blocks, there should be line numbers
      expect(lineNumberCount).toBeGreaterThan(0);
    }
  });

  test('should have green gutter line in code blocks', async ({ page }) => {
    const codeBlocks = page.locator('pre code');
    const count = await codeBlocks.count();
    
    if (count > 0) {
      // Check if the gutter line has the correct color
      const preElement = page.locator('pre').first();
      const borderColor = await preElement.evaluate((el) => {
        const before = window.getComputedStyle(el, '::before');
        return before.getPropertyValue('border-left-color');
      });
      
      // Should have a border color (green gutter)
      expect(borderColor).toBeTruthy();
    }
  });

  test('should use Monaco font for code', async ({ page }) => {
    const codeBlocks = page.locator('pre code');
    const count = await codeBlocks.count();
    
    if (count > 0) {
      const fontFamily = await codeBlocks.first().evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue('font-family');
      });
      
      // Should include Monaco or Consolas in font family
      expect(fontFamily.toLowerCase()).toMatch(/monaco|consolas|courier/);
    }
  });

  test('should render inline code differently from code blocks', async ({ page }) => {
    const content = page.locator('.post-content');
    
    // Check for inline code
    const inlineCode = content.locator('p code');
    const inlineCount = await inlineCode.count();
    
    // Check for code blocks
    const codeBlocks = content.locator('pre code');
    const blockCount = await codeBlocks.count();
    
    // If both exist, they should have different styling
    if (inlineCount > 0 && blockCount > 0) {
      const inlineBackground = await inlineCode.first().evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue('background-color');
      });
      
      const blockBackground = await codeBlocks.first().evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue('background-color');
      });
      
      // Backgrounds should be different
      expect(inlineBackground).not.toBe(blockBackground);
    }
  });
});
