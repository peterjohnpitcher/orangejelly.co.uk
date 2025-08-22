# Case Studies Content

This directory contains markdown files for client case studies and success stories.

## Structure
- Individual case study files should be named with client or project slugs
- Each file should include frontmatter with metadata like client name, industry, results, and testimonials
- Images and assets for case studies should be referenced from `/public/images/case-studies/`

## File Format
Case studies should follow this frontmatter structure:

```markdown
---
title: "Case Study Title"
client: "Client Name"
industry: "Industry Type"
description: "Brief description of the project"
publishedAt: "2024-01-01"
featured: true/false
results:
  - metric: "Increase in sales"
    value: "25%"
  - metric: "Customer satisfaction"
    value: "95%"
testimonial:
  quote: "Client testimonial quote"
  author: "Client Name"
  position: "Job Title"
image: "/images/case-studies/filename.jpg"
---

# Case study content starts here...
```

## Migration Notes
- Content will be migrated from Sanity CMS to markdown files
- Existing case studies are currently managed through Sanity backend