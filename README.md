# 2025 交大校友会 Website

A modular, mobile-first static website for the 2025 Alumni Association Annual Event.

## Tech Stack

- **HTML5** - Semantic markup
- **Bulma CSS** - Responsive CSS framework
- **Vanilla JavaScript** - Component injection and page interactions
- **Font Awesome** - Icons
- **No build process** - Works directly on S3/GitHub Pages

## Key Features

- **Modular Architecture** - Navigation, footer, and banner defined once
- **Easy to Extend** - Add/reorder pages by editing one config file
- **Mobile-First Design** - Optimized for mobile viewing
- **Royal Blue Theme** - Consistent color scheme
- **Separate Pages** - Each section has its own dedicated page
- **Component-Based** - Shared components injected via JavaScript

## File Structure

```
web/
├── index.html                  # Home page with quick links
├── pages/                      # All content pages
│   ├── president.html          # President's message
│   ├── program.html            # Event schedule
│   ├── performers.html         # Featured performers
│   ├── gallery.html            # Photo gallery
│   ├── articles.html           # Alumni articles
│   ├── sponsors.html           # Sponsor recognition
│   ├── letters.html            # Congratulation letters
│   ├── team.html               # Organizing team
│   └── awards.html             # 2025 Awards
├── assets/
│   ├── css/
│   │   └── styles.css          # Custom royal blue theme
│   ├── js/
│   │   ├── config.js           # ⭐ EDIT THIS to update navigation/banner
│   │   ├── components.js       # Injects nav/footer/banner
│   │   └── main.js             # Page interactions (scroll-to-top, etc.)
│   └── images/                 # Your images go here
│       └── .gitkeep
└── README.md                   # This file
```

## How It Works

### Modular Components

Instead of copying navigation and footer HTML to every page, we use JavaScript to inject them:

1. **config.js** - Contains all site-wide settings (navigation items, footer, banner)
2. **components.js** - Reads config.js and injects HTML into pages
3. Each page has empty containers: `<div id="navbar-container">` and `<div id="footer-container">`

### Benefits

- **Single Source of Truth** - Update navigation in one place
- **Easy to Add Pages** - Just add one entry to config.js
- **Easy to Reorder** - Rearrange the array in config.js
- **Banner Control** - Toggle site-wide banner on/off in config.js
- **No Build Process** - Still plain HTML files for S3

## How to Add a New Page

### Step 1: Create the HTML file

Create a new file in `pages/` directory (e.g., `pages/newpage.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Page - 2025 交大校友会</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>
    <!-- Navigation (injected) -->
    <div id="navbar-container"></div>

    <!-- Page Header -->
    <section class="hero is-royal-blue is-small">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title is-2 has-text-white">Your Page Title</h1>
            </div>
        </div>
    </section>

    <!-- Your Content -->
    <section class="section">
        <div class="container">
            <!-- Add your content here -->
        </div>
    </section>

    <!-- Footer (injected) -->
    <div id="footer-container"></div>

    <!-- Scripts -->
    <script src="../assets/js/config.js"></script>
    <script src="../assets/js/components.js"></script>
    <script src="../assets/js/main.js"></script>
</body>
</html>
```

### Step 2: Add to Navigation

Edit `assets/js/config.js` and add your page to the `navigation` array:

```javascript
navigation: [
  // ... existing items ...
  {
    name: "New Page",
    href: "newpage.html",
    icon: "fa-star"  // Optional Font Awesome icon
  }
]
```

**That's it!** Your page now appears in the navigation on all pages.

## How to Enable Banner

Edit `assets/js/config.js`:

```javascript
banner: {
  enabled: true,  // Change to true
  text: "Register now for the 2025 event!",
  link: "pages/program.html",
  backgroundColor: "#4169E1",
  textColor: "#ffffff"
}
```

## How to Update Navigation Order

Just rearrange the objects in the `navigation` array in `assets/js/config.js`. The navigation will automatically update on all pages.

## Customizing Content

### Replace Placeholder Images

1. Add your images to `assets/images/`
2. Update image paths in HTML files:
   - From: `https://via.placeholder.com/...`
   - To: `../assets/images/your-image.jpg`

### Update Text Content

Edit the HTML files in `pages/` directory:
- Replace `[President Name]` with actual names
- Replace `[Year]` with class years
- Update all placeholder text

### Change Colors

Edit `assets/css/styles.css`:

```css
:root {
    --royal-blue: #4169E1;        /* Main color */
    --royal-blue-dark: #2952CC;   /* Hover/active state */
    --royal-blue-light: #6495ED;  /* Light variant */
}
```

Also update `assets/js/config.js`:

```javascript
theme: {
  primaryColor: "#4169E1",
  primaryColorDark: "#2952CC",
  primaryColorLight: "#6495ED"
}
```

## Local Development

1. Open `index.html` in your browser
2. No server required for basic testing
3. For full testing, use a simple HTTP server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (with http-server)
npx http-server

# Then open http://localhost:8000
```

## Deploying to AWS S3

### Prerequisites

- AWS account
- AWS CLI installed: `aws configure`
- S3 bucket created

### Quick Deploy

```bash
# 1. Create bucket (one time)
aws s3 mb s3://YOUR-BUCKET-NAME --region us-east-1

# 2. Enable static website hosting (one time)
aws s3 website s3://YOUR-BUCKET-NAME \
  --index-document index.html \
  --error-document index.html

# 3. Upload files
aws s3 sync . s3://YOUR-BUCKET-NAME \
  --exclude ".git/*" \
  --exclude ".DS_Store" \
  --exclude "README.md" \
  --delete

# 4. Make public (one time - or use bucket policy)
aws s3api put-bucket-policy \
  --bucket YOUR-BUCKET-NAME \
  --policy '{
    "Version": "2012-10-17",
    "Statement": [{
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }]
  }'
```

### Your Website URL

```
http://YOUR-BUCKET-NAME.s3-website-us-east-1.amazonaws.com
```

### Deploy Script

Create `deploy.sh` for easy updates:

```bash
#!/bin/bash

BUCKET_NAME="YOUR-BUCKET-NAME"

echo "🚀 Deploying to S3..."

# Sync files
aws s3 sync . s3://$BUCKET_NAME \
  --exclude ".git/*" \
  --exclude ".DS_Store" \
  --exclude "README.md" \
  --exclude "deploy.sh" \
  --delete \
  --cache-control "max-age=300"

echo "✅ Deployment complete!"
echo "🌐 Website: http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
```

Make executable and run:

```bash
chmod +x deploy.sh
./deploy.sh
```

## Optional: CloudFront + Custom Domain

### Add CloudFront CDN

Benefits:
- HTTPS support
- Better performance
- Custom domain support

```bash
# Create distribution
aws cloudfront create-distribution \
  --origin-domain-name YOUR-BUCKET-NAME.s3-website-us-east-1.amazonaws.com \
  --default-root-object index.html
```

### Add Custom Domain

1. Register domain in Route 53
2. Request SSL certificate in AWS Certificate Manager
3. Add certificate to CloudFront distribution
4. Update DNS records

## Cost Estimate

### S3 Static Hosting

For a small website with moderate traffic:
- **Storage**: ~$0.023/GB/month
- **Requests**: $0.0004 per 1,000 GET requests
- **Data Transfer**: First 1 GB free, then $0.09/GB

**Estimated monthly cost: $1-5**

### With CloudFront (Optional)

- CloudFront: ~$0.085/GB data transfer
- SSL Certificate: Free with AWS Certificate Manager

**Estimated monthly cost: $5-15** (depending on traffic)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Mobile Optimization

The website is optimized for mobile:
- Hamburger menu on small screens
- Touch-friendly navigation
- Responsive images and layouts
- Fast loading times
- Mobile-first CSS

## Troubleshooting

### Navigation not showing?

Check that all three scripts are loaded in order:
1. `config.js`
2. `components.js`
3. `main.js`

### Images not loading?

Check image paths:
- Home page: `assets/images/photo.jpg`
- Other pages: `../assets/images/photo.jpg`

### Styles not working?

Verify CSS path:
- Home page: `assets/css/styles.css`
- Other pages: `../assets/css/styles.css`

## Maintenance Guide

### Regular Updates

1. **Add content** - Edit HTML files in `pages/`
2. **Add images** - Upload to `assets/images/`
3. **Update navigation** - Edit `assets/js/config.js`
4. **Deploy** - Run `./deploy.sh`

### Best Practices

- Keep config.js as single source of truth
- Use consistent naming for pages
- Optimize images before uploading
- Test locally before deploying
- Use version control (git)

## Support

For questions about:
- **Bulma CSS**: https://bulma.io/documentation/
- **Font Awesome**: https://fontawesome.com/icons
- **AWS S3**: https://docs.aws.amazon.com/s3/

## License

© 2025 交大校友会. All rights reserved.
