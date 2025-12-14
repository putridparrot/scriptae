# Migration Guide: Adding Template System to Existing Blog

If you're updating from an earlier version of this blog without the template system, here's what changed and what you need to know.

## What Changed

### New Files Added
- ✅ `public/template.json` - Main template configuration
- ✅ `src/utils/template.ts` - Template utilities and types
- ✅ `TEMPLATE.md` - Complete documentation
- ✅ `TEMPLATE-QUICKREF.md` - Quick reference
- ✅ `TEMPLATE-EXAMPLES.md` - Example templates

### Files Modified
- 📝 `src/pages/Home.tsx` - Now loads and uses template
- 📝 `src/components/PostList.tsx` - Accepts template prop
- 📝 `src/components/Post.tsx` - Loads template
- 📝 All CSS files - Use CSS custom properties
- 📝 `README.md` - Documents template feature

## Breaking Changes

### ⚠️ Component Props
**PostList component now requires `template` prop:**

**Before:**
```tsx
<PostList posts={posts} />
```

**After:**
```tsx
<PostList posts={posts} template={template} />
```

If you have custom code using PostList, update it to pass the template.

## Backward Compatibility

### Default Behavior
If you don't create a `template.json` file, the application will:
- ✅ Use built-in default values
- ✅ Continue to work normally
- ✅ Look the same as before

### Gradual Adoption
You can adopt the template system gradually:
1. Start with default `template.json`
2. Customize one section at a time
3. Test changes as you go

## Migration Steps

### Step 1: Pull Latest Changes
```bash
git pull origin main
```

### Step 2: Install Dependencies (if needed)
```bash
npm install
```

### Step 3: Create Template File
The default template file should be automatically available in `public/template.json`.

If missing, copy from `public/template.json` in the repository.

### Step 4: Test Your Blog
```bash
npm run dev
```

Visit http://localhost:5173 and verify everything looks correct.

### Step 5: Customize (Optional)
Edit `public/template.json` to customize your blog's appearance.

See [TEMPLATE.md](TEMPLATE.md) for all options.

## Common Issues & Solutions

### Issue: Template not loading
**Symptom**: Blog looks the same, no customization taking effect

**Solution**:
1. Verify `public/template.json` exists
2. Check browser console for errors (F12)
3. Ensure JSON is valid (use https://jsonlint.com/)
4. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Issue: TypeScript errors
**Symptom**: Build fails with type errors

**Solution**:
```bash
# Ensure all dependencies are installed
npm install

# Check for errors
npm run build
```

### Issue: Styles not applying
**Symptom**: Colors/fonts don't change

**Solution**:
1. Verify CSS custom properties in browser DevTools
2. Check that template is loaded (console.log in browser)
3. Try clearing browser cache

### Issue: PostList errors
**Symptom**: Error about missing `template` prop

**Solution**:
If you have custom code using PostList:
```tsx
// Import the template hook or load template
const [template, setTemplate] = useState<TemplateConfig | null>(null);

useEffect(() => {
  loadTemplate().then(setTemplate);
}, []);

// Pass it to PostList
<PostList posts={posts} template={template} />
```

## Rollback Instructions

If you need to rollback to the previous version:

### Option 1: Git Revert
```bash
git revert HEAD
```

### Option 2: Remove Template Files
1. Delete `public/template.json`
2. Revert component changes via git
3. Revert CSS changes via git

### Option 3: Use Previous Commit
```bash
git checkout <previous-commit-hash>
```

## Getting Help

1. Check [TEMPLATE.md](TEMPLATE.md) for complete documentation
2. Review [TEMPLATE-EXAMPLES.md](TEMPLATE-EXAMPLES.md) for examples
3. Check browser console for error messages
4. Validate JSON syntax in your template file

## Benefits of Upgrading

✅ Customize without code changes
✅ Create multiple themes easily
✅ Support internationalization
✅ Better separation of concerns
✅ Type-safe configuration
✅ Easy to maintain and update

## Performance Impact

The template system has minimal performance impact:
- Template loaded once and cached
- CSS variables applied at startup
- No runtime overhead
- Same bundle size as before (approximately)

---

Need more help? See the main [README.md](README.md) or [TEMPLATE.md](TEMPLATE.md) documentation.
