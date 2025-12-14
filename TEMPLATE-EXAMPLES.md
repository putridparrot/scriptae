# Template Examples Gallery

## Example 1: Default Theme (Light)

### Configuration
```json
{
  "site": {
    "title": "My Blog",
    "description": "A markdown-based blog built with React"
  },
  "theme": {
    "colors": {
      "primary": "#667eea",
      "accent": "#3498db",
      "background": "#ffffff",
      "text": "#2c3e50"
    }
  }
}
```

### Result
- Light, clean appearance
- Purple gradient header
- Blue accent colors for links and buttons
- Professional and readable

---

## Example 2: Dark Mode

### Configuration
```json
{
  "site": {
    "title": "Dark Mode Blog",
    "description": "A sleek dark-themed blog"
  },
  "theme": {
    "colors": {
      "primary": "#1a1a2e",
      "accent": "#0f3460",
      "background": "#0f0f0f",
      "text": "#eaeaea"
    },
    "headerGradient": "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
  }
}
```

### Result
- Dark background (#0f0f0f)
- Light text (#eaeaea)
- Reduced eye strain in low light
- Modern, sleek appearance

---

## Example 3: Colorful & Creative

### Configuration
```json
{
  "site": {
    "title": "Creative Corner ✨",
    "description": "Where imagination meets code",
    "tagline": "Building beautiful things"
  },
  "theme": {
    "colors": {
      "primary": "#ff6b6b",
      "secondary": "#4ecdc4",
      "accent": "#ffe66d",
      "background": "#f7f9fb",
      "text": "#2d3561"
    },
    "headerGradient": "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
    "borderRadius": "12px"
  }
}
```

### Result
- Vibrant coral and teal gradient
- Yellow accents
- Rounded corners (12px)
- Playful, creative vibe

---

## Example 4: Minimal Black & White

### Configuration
```json
{
  "site": {
    "title": "Minimalist",
    "description": "Less is more"
  },
  "theme": {
    "colors": {
      "primary": "#000000",
      "accent": "#666666",
      "background": "#ffffff",
      "text": "#000000",
      "border": "#e0e0e0"
    },
    "headerGradient": "#000000"
  },
  "layout": {
    "postList": {
      "showExcerpt": false,
      "readMoreText": "→"
    }
  }
}
```

### Result
- Pure black and white
- No gradients
- Minimalist aesthetic
- Maximum readability

---

## Example 5: Professional Corporate

### Configuration
```json
{
  "site": {
    "title": "Enterprise Insights",
    "description": "Industry analysis and thought leadership",
    "footer": "© 2025 Enterprise Insights. All rights reserved."
  },
  "theme": {
    "colors": {
      "primary": "#1e3a8a",
      "accent": "#3b82f6",
      "text": "#1e293b"
    },
    "fonts": {
      "primary": "'Inter', sans-serif",
      "headings": "'Montserrat', sans-serif"
    },
    "spacing": {
      "contentMaxWidth": "900px"
    }
  }
}
```

### Result
- Corporate blue color scheme
- Professional fonts (Inter, Montserrat)
- Wider content area
- Footer with copyright

---

## Example 6: Warm & Welcoming

### Configuration
```json
{
  "site": {
    "title": "Cozy Corner ☕",
    "description": "Thoughts over coffee"
  },
  "theme": {
    "colors": {
      "primary": "#d4a574",
      "secondary": "#8b6f47",
      "accent": "#c17c3e",
      "background": "#faf8f5",
      "text": "#3e2723"
    },
    "headerGradient": "linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)"
  }
}
```

### Result
- Warm brown and tan colors
- Coffee-inspired palette
- Comfortable, inviting feel
- Off-white background

---

## Example 7: Nature & Green

### Configuration
```json
{
  "site": {
    "title": "Green Thoughts 🌿",
    "description": "Sustainability and technology"
  },
  "theme": {
    "colors": {
      "primary": "#2d6a4f",
      "secondary": "#40916c",
      "accent": "#52b788",
      "background": "#f8fff8",
      "text": "#1b4332"
    },
    "headerGradient": "linear-gradient(135deg, #2d6a4f 0%, #52b788 100%)"
  }
}
```

### Result
- Natural green palette
- Forest-inspired colors
- Eco-friendly aesthetic
- Fresh, clean look

---

## Example 8: Multilingual (Spanish)

### Configuration
```json
{
  "site": {
    "title": "Mi Blog",
    "description": "Un blog en español"
  },
  "text": {
    "loading": "Cargando publicaciones...",
    "noPostsFound": "No se encontraron publicaciones.",
    "showingPosts": "Mostrando {current} de {total} publicaciones",
    "showAllButton": "Mostrar Todo",
    "showLessButton": "Mostrar Menos"
  },
  "layout": {
    "post": {
      "backButtonText": "← Volver al inicio"
    },
    "postList": {
      "readMoreText": "Leer más →"
    }
  }
}
```

### Result
- Complete Spanish translation
- All UI text in Spanish
- Same visual theme
- Localized experience

---

## Mixing and Matching

You can combine aspects from different examples:

```json
{
  "site": {
    "title": "My Custom Blog",
    "description": "Combining the best features"
  },
  "theme": {
    "colors": {
      "primary": "#667eea",        // From Default
      "background": "#0f0f0f"      // From Dark Mode
    },
    "borderRadius": "12px"          // From Creative
  },
  "layout": {
    "postList": {
      "showExcerpt": false          // From Minimal
    }
  }
}
```

---

## How to Apply These Examples

1. Copy the configuration you like
2. Paste into `public/template.json`
3. Refresh your browser
4. Tweak values to your preference

For complete reference, see [TEMPLATE.md](TEMPLATE.md)
