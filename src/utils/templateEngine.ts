/**
 * Simple template engine for rendering HTML templates with placeholders and conditionals
 */

interface TemplateCache {
  [key: string]: string;
}

const templateCache: TemplateCache = {};

/**
 * Process template includes/partials
 * Handles {{>templateName}} syntax to embed other templates
 */
async function processIncludes(template: string, data: Record<string, any>): Promise<string> {
  const includeRegex = /\{\{>(\w+)\}\}/g;
  let result = template;
  const matches = [...template.matchAll(includeRegex)];
  
  // Process all includes
  for (const match of matches) {
    const templateName = match[1];
    try {
      const includedTemplate = await loadHTMLTemplate(templateName);
      // Recursively render the included template with the same data
      const rendered = await renderTemplate(includedTemplate, data);
      result = result.replace(match[0], rendered);
    } catch (error) {
      console.error(`Error loading included template ${templateName}:`, error);
      // Replace with empty string if template not found
      result = result.replace(match[0], '');
    }
  }
  
  return result;
}

/**
 * Load an HTML template from the public/templates folder
 */
export async function loadHTMLTemplate(templateName: string): Promise<string> {
  if (templateCache[templateName]) {
    return templateCache[templateName];
  }

  try {
    const response = await fetch(`/templates/${templateName}.html`);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${templateName}`);
    }
    const template = await response.text();
    templateCache[templateName] = template;
    return template;
  } catch (error) {
    console.error(`Error loading template ${templateName}:`, error);
    throw error;
  }
}

/**
 * Render a template with the provided data
 * Supports:
 * - {{variable}} for simple substitution
 * - {{#if condition}}...{{/if}} for conditionals
 * - {{>templateName}} for template includes/partials
 */
export async function renderTemplate(template: string, data: Record<string, any>): Promise<string> {
  let result = template;

  // Process template includes first: {{>templateName}}
  result = await processIncludes(result, data);

  // Process conditionals: {{#if variable}}...{{/if}}
  result = processConditionals(result, data);

  // Then process simple variable substitutions: {{variable}}
  result = processVariables(result, data);

  return result;
}

/**
 * Process conditional blocks in the template
 * Handles nested conditionals by finding matching pairs
 */
function processConditionals(template: string, data: Record<string, any>): string {
  let result = template;
  let hasConditionals = true;
  
  // Keep processing until no more conditionals are found
  while (hasConditionals) {
    // Find the first {{#if ...}}
    const ifMatch = result.match(/\{\{#if\s+(\w+)\}\}/);
    
    if (!ifMatch) {
      hasConditionals = false;
      break;
    }
    
    const condition = ifMatch[1];
    const startPos = ifMatch.index!;
    const contentStart = startPos + ifMatch[0].length;
    
    // Find the matching {{/if}} by counting nested ifs
    let depth = 1;
    let pos = contentStart;
    let endPos = -1;
    
    while (pos < result.length && depth > 0) {
      const remainingText = result.substring(pos);
      const nextIf = remainingText.match(/\{\{#if\s+\w+\}\}/);
      const nextEndIf = remainingText.match(/\{\{\/if\}\}/);
      
      if (!nextEndIf) {
        // No closing tag found - malformed template
        console.error('Malformed template: no closing {{/if}} found');
        hasConditionals = false;
        break;
      }
      
      const endIfPos = pos + nextEndIf.index!;
      const ifPos = nextIf ? pos + nextIf.index! : Infinity;
      
      if (ifPos < endIfPos) {
        // Found another opening before closing - increase depth
        depth++;
        pos = ifPos + nextIf![0].length;
      } else {
        // Found a closing
        depth--;
        if (depth === 0) {
          endPos = endIfPos;
        } else {
          pos = endIfPos + nextEndIf[0].length;
        }
      }
    }
    
    if (endPos === -1) {
      hasConditionals = false;
      break;
    }
    
    // Extract the content between the matching tags
    const content = result.substring(contentStart, endPos);
    const fullMatch = result.substring(startPos, endPos + '{{/if}}'.length);
    
    const value = condition ? data[condition] : undefined;
    
    // Check if condition is truthy (excluding empty strings)
    const shouldShow = value && value !== false && value !== 'false' && value !== 0 && value !== '';
    
    result = result.replace(fullMatch, shouldShow ? content : '');
  }
  
  return result;
}

/**await 
 * Process variable substitutions in the template
 */
function processVariables(template: string, data: Record<string, any>): string {
  const variableRegex = /\{\{(\w+)\}\}/g;
  
  return template.replace(variableRegex, (_match, variable) => {
    const value = data[variable];
    
    // Return the value if it exists, otherwise empty string
    if (value !== undefined && value !== null) {
      return String(value);
    }
    
    return '';
  });
}

/**
 * Render an HTML template with data
 * This is a convenience function that loads and renders in one call
 */
export async function renderHTMLTemplate(
  templateName: string,
  data: Record<string, any>
): Promise<string> {
  const template = await loadHTMLTemplate(templateName);
  return renderTemplate(template, data);
}

/**
 * Clear the template cache (useful for development/hot reload)
 */
export function clearTemplateCache(): void {
  Object.keys(templateCache).forEach(key => delete templateCache[key]);
}

/**
 * Preload templates to improve performance
 */
export async function preloadTemplates(templateNames: string[]): Promise<void> {
  await Promise.all(templateNames.map(name => loadHTMLTemplate(name)));
}
