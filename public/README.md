# Template Examples

This folder contains example template configurations you can use as starting points for your blog customization.

## Active Template

The active template is `template.json` - this is the file that the application reads to style your blog.

## Example Templates

### template-dark.json.example
A dark theme example with:
- Dark color scheme
- Larger spacing
- Modified text labels
- Short date format

### template-custom-branding.json.example
Demonstrates custom branding configuration:
- Custom site title for browser tab
- Custom logo/favicon path
- Example footer text
- Full site configuration

### How to Use Examples

To use an example template:

1. Copy the example file:
   ```bash
   cp template-dark.json.example template.json
   ```

2. Refresh your browser to see the changes

3. Customize further by editing `template.json`

## Creating Your Own Template

See [TEMPLATE.md](../TEMPLATE.md) in the root directory for a complete guide to customization options.

## Backup Your Template

Before experimenting with new templates, save a backup:
```bash
cp template.json template.backup.json
```
