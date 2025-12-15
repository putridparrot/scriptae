# Template System - Getting Started Checklist

## Quick Start (5 Minutes)

- [ ] **Step 1**: Locate the template file
  - Open `public/template.json` in your editor
  
- [ ] **Step 2**: Make a simple change
  - Change `"title": "My Blog"` to your blog's name
  - Change `"description"` to your tagline
  - Set `"siteTitle"` to customize the browser tab title
  - Update `"logoPath"` if you have a custom logo/favicon
  
- [ ] **Step 3**: Refresh browser
  - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
  
- [ ] **Step 4**: See your changes
  - Your new title should appear in the header and browser tab!

---

## Next Steps (15 Minutes)

### Colors
- [ ] Change `theme.colors.primary` to your brand color
- [ ] Update `theme.colors.accent` for links and buttons
- [ ] Try the dark theme example: `public/template-dark.json.example`

### Layout
- [ ] Set `layout.home.defaultPostsToShow` to your preference
- [ ] Try `layout.postList.showExcerpt: false` for compact view
- [ ] Toggle `layout.home.showPostCount` on/off

### Text
- [ ] Customize `text.showAllButton` and `text.showLessButton`
- [ ] Update `layout.post.backButtonText`
- [ ] Modify `layout.postList.readMoreText`

---

## Advanced (30+ Minutes)

### Create a Custom Theme
- [ ] Read [TEMPLATE.md](TEMPLATE.md) for all options
- [ ] Check [TEMPLATE-EXAMPLES.md](TEMPLATE-EXAMPLES.md) for inspiration
- [ ] Create your own color palette
- [ ] Experiment with fonts (remember to add Google Fonts link if needed)

### Localization
- [ ] Translate all values in the `"text"` section
- [ ] Update site title and description
- [ ] Change date format if needed for your locale

### Multiple Themes
- [ ] Create `template-light.json` backup
- [ ] Create `template-dark.json` alternate theme
- [ ] Switch between them by copying to `template.json`

---

## Customization Checklist

### Site Identity
- [ ] Blog title
- [ ] Description/subtitle
- [ ] Optional tagline
- [ ] Optional footer

### Visual Design
- [ ] Primary brand color
- [ ] Secondary color
- [ ] Accent color (buttons, links)
- [ ] Text colors (main and light)
- [ ] Background color
- [ ] Border color
- [ ] Draft indicator color

### Typography
- [ ] Body font
- [ ] Heading font
- [ ] Code font

### Layout Preferences
- [ ] Number of posts to show initially
- [ ] Show/hide post counter
- [ ] Show/hide post controls
- [ ] Show/hide excerpts in post list
- [ ] Show/hide author names
- [ ] Show/hide dates
- [ ] Date format (long, short, numeric)

### Text & Labels
- [ ] Loading messages
- [ ] Button text
- [ ] Empty state messages
- [ ] Error messages
- [ ] Navigation text

---

## Testing Checklist

Before finalizing your template:

### Visual Testing
- [ ] Desktop view (1920x1080)
- [ ] Tablet view (768x1024)
- [ ] Mobile view (375x667)
- [ ] Very wide screens (2560px+)

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

### Accessibility
- [ ] Check text contrast (use WebAIM checker)
- [ ] Verify readable font sizes
- [ ] Test with larger system fonts
- [ ] Check color-blind friendly (if applicable)

### Content Testing
- [ ] View with many posts (10+)
- [ ] View with few posts (1-2)
- [ ] View with draft posts
- [ ] View with long titles
- [ ] View with long excerpts

---

## Maintenance Checklist

### Backup
- [ ] Save working template as `template.backup.json`
- [ ] Keep versions of different themes
- [ ] Document custom changes

### Updates
- [ ] Test template after pulling new code
- [ ] Review new template options in updates
- [ ] Merge new features into custom template

### Sharing
- [ ] Document your custom template
- [ ] Share with team members
- [ ] Consider open-sourcing your theme

---

## Resources

📖 **Documentation**
- [TEMPLATE.md](TEMPLATE.md) - Complete guide
- [TEMPLATE-QUICKREF.md](TEMPLATE-QUICKREF.md) - Quick reference
- [TEMPLATE-EXAMPLES.md](TEMPLATE-EXAMPLES.md) - Example themes
- [MIGRATION.md](MIGRATION.md) - Migration guide

🎨 **Design Tools**
- [Coolors.co](https://coolors.co/) - Color palette generator
- [Adobe Color](https://color.adobe.com/) - Color wheel
- [Google Fonts](https://fonts.google.com/) - Font library
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Accessibility

🔧 **Development Tools**
- [JSONLint](https://jsonlint.com/) - JSON validator
- [VS Code](https://code.visualstudio.com/) - Code editor (has built-in JSON validation)

---

## Quick Tips

💡 **Start Simple**: Begin with the default template and change one thing at a time

💡 **Use Examples**: Copy from `TEMPLATE-EXAMPLES.md` and modify

💡 **Validate JSON**: Always validate before saving to avoid errors

💡 **Keep Backups**: Save working versions before experimenting

💡 **Test Incrementally**: Refresh and test after each change

💡 **Use Variables**: The template system uses CSS variables - check browser DevTools to see them

💡 **Ask for Help**: Check documentation files for answers

---

## Common First Changes

Most users start by customizing these:

1. **Blog Title & Description**
   ```json
   "site": {
     "title": "Your Blog Name",
     "description": "Your tagline"
   }
   ```

2. **Primary Colors**
   ```json
   "theme": {
     "colors": {
       "primary": "#your-color",
       "accent": "#your-accent"
     }
   }
   ```

3. **Number of Posts**
   ```json
   "layout": {
     "home": {
       "defaultPostsToShow": 10
     }
   }
   ```

---

**Ready to customize? Open `public/template.json` and start experimenting!** 🎨
