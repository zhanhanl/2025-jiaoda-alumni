# Your New Color Palette

## 🎨 Color Scheme Overview

Your website now uses a sophisticated navy-to-yellow gradient palette:

```
#113F67 (Primary - Deep Navy)    ████████
#34699A (Secondary - Medium Blue) ████████
#58A0C8 (Tertiary - Light Blue)  ████████
#FDF5AA (Accent - Cream Yellow)  ████████
```

---

## How to Use

### In CSS:
```css
.my-element {
    background-color: var(--primary);      /* Deep Navy #113F67 */
    color: var(--accent);                  /* Cream Yellow #FDF5AA */
    border-left: 4px solid var(--tertiary); /* Light Blue #58A0C8 */
}

.gradient-bg {
    background: var(--gradient-hero);
    /* Result: Deep Navy → Medium Blue → Light Blue */
}
```

### In HTML (utility classes):
```html
<div class="bg-primary">Deep Navy background</div>
<div class="bg-secondary">Medium Blue background</div>
<div class="bg-tertiary">Light Blue background</div>
<div class="bg-accent">Cream Yellow background</div>

<p class="text-primary">Deep Navy text</p>
<p class="text-accent">Yellow text</p>

<div class="bg-gradient-hero">Beautiful gradient!</div>
```

---

## Color Usage Guide

**Primary (#113F67 - Deep Navy)**
- Navbar background
- Headers and titles
- Primary buttons
- Footer
- Main brand areas

**Secondary (#34699A - Medium Blue)**
- Section backgrounds
- Secondary buttons
- Links
- Icons
- Mid-level emphasis

**Tertiary (#58A0C8 - Light Blue)**
- Subtle backgrounds
- Hover states
- Borders
- Light accents
- Cards

**Accent (#FDF5AA - Cream Yellow)**
- Call-to-action buttons
- Highlights
- Important notices
- Award badges
- Special emphasis

---

## All Your Variables

```css
/* Main Colors */
--primary: #113F67
--primary-dark: #0a2a45
--primary-light: #1a5280

--secondary: #34699A
--secondary-dark: #26527a
--secondary-light: #4d84b3

--tertiary: #58A0C8
--tertiary-dark: #4088b0
--tertiary-light: #7ab8d9

--accent: #FDF5AA
--accent-dark: #f5e777
--accent-light: #fffbcc

/* Gradients */
--gradient-primary: #113F67 → #34699A
--gradient-hero: #113F67 → #34699A → #58A0C8
--gradient-accent: #34699A → #58A0C8
```

---

## Examples

### Navbar
```html
<nav class="navbar bg-primary">
    <a class="text-white">Navigation</a>
</nav>
```

### Hero Section
```html
<section class="hero bg-gradient-hero">
    <h1 class="text-white">Welcome</h1>
</section>
```

### Cards
```html
<div class="card bg-tertiary-light">
    <h3 class="text-primary">Card Title</h3>
    <p class="text-dark">Content here</p>
</div>
```

### Buttons
```html
<button class="button bg-primary text-white">Primary Action</button>
<button class="button bg-accent text-dark">Highlight Action</button>
```

---

Your colors are now live! Refresh your browser to see the new theme.
