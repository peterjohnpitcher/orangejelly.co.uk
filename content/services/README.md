# Services Content

This directory contains markdown files for service descriptions, packages, and offerings.

## Structure
- Individual service files should be named with service slugs
- Service package files for bundled offerings
- Pricing and feature comparison data
- Images and icons for services should be referenced from `/public/images/services/`

## File Format
Services should follow this frontmatter structure:

```markdown
---
title: "Service Name"
description: "SEO-friendly service description"
category: "Service Category"
featured: true/false
pricing:
  type: "fixed|custom|package"
  startingPrice: "£500"
features:
  - "Feature 1"
  - "Feature 2"
  - "Feature 3"
cta:
  text: "Get Started"
  link: "/contact"
image: "/images/services/filename.svg"
---

# Service description content starts here...
```

## Migration Notes
- Content will be migrated from Sanity CMS to markdown files
- Existing services are currently managed through Sanity backend
- Service pages are currently accessible through `/services/` routes