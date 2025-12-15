/**
 * Development utilities for template reloading
 * In dev mode, templates are automatically fetched fresh (no caching)
 */

if (import.meta.env.DEV) {
  console.log('💡 Template dev mode active - templates reload automatically when you navigate/refresh!');
  console.log('   Just edit template files, save, and refresh the page to see changes.');
}
