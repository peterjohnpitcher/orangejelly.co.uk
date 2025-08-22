# Blog Formatting Fix Report

Generated on: 2025-08-15T12:54:47.891Z

## Summary

- **Total articles analyzed:** 8
- **Articles needing fixes:** 1
- **Total formatting issues found:** 6

## Issues Found

The main formatting problems are:
1. **Bold headers**: Text using `**bold**` formatting that should be proper h2/h3 headers
2. **Mixed content blocks**: Blocks containing both header and paragraph content that need to be split
3. **Excessive bold formatting**: Paragraph text with unnecessary bold formatting

## Detailed Article Reports

### Young People Won't Come to Your Pub? Here's How to Change That

- **Slug:** `young-people-wont-come-to-your-pub`
- **Article ID:** `Csdd80pLvugiOUK0y2JPBR`
- **Published:** 2025-08-11T10:00:00Z
- **Total blocks:** 49
- **Issues found:** 0

✅ **No formatting issues found**

---

### Terrible Online Reviews Ruining Your Reputation? The Damage Control Guide

- **Slug:** `terrible-online-reviews-damage-control`
- **Article ID:** `jKwgQNCsrs019jNuQ4SGP2`
- **Published:** 2025-08-18T10:00:00Z
- **Total blocks:** 83
- **Issues found:** 6

#### Issues to Fix:

**1. Block 11 (split_block)**

- **Current style:** `normal`
- **Current text:** `**Opening: Acknowledge and Appreciate**
"Hi [Name], thank you for taking the time to share your expe...`
- **Action:** Split into header + paragraph
- **Header:** `h3` - "Opening: Acknowledge and Appreciate"
- **Paragraph:** ""Hi [Name], thank you for taking the time to share your experience. I'm genuinely sorry your visit d..."

**2. Block 12 (split_block)**

- **Current style:** `normal`
- **Current text:** `**Middle: Address Specifics Without Excuses**
"You mentioned [specific issue] - this isn't the stand...`
- **Action:** Split into header + paragraph
- **Header:** `h3` - "Middle: Address Specifics Without Excuses"
- **Paragraph:** ""You mentioned [specific issue] - this isn't the standard we aim for. I've spoken with the team abou..."

**3. Block 13 (split_block)**

- **Current style:** `normal`
- **Current text:** `**Close: Open Door**
"I'd love the opportunity to make this right. Please email me directly at [emai...`
- **Action:** Split into header + paragraph
- **Header:** `h3` - "Close: Open Door"
- **Paragraph:** ""I'd love the opportunity to make this right. Please email me directly at [email] or pop in and ask ..."

**4. Block 14 (split_block)**

- **Current style:** `normal`
- **Current text:** `**Sign Off: Personal Touch**
"Peter Pitcher, Owner - The Anchor"`
- **Action:** Split into header + paragraph
- **Header:** `h3` - "Sign Off: Personal Touch"
- **Paragraph:** ""Peter Pitcher, Owner - The Anchor""

**5. Block 24 (convert_to_header)**

- **Current style:** `normal`
- **Current text:** `**The Script:** "It was lovely meeting you today. If you have 30 seconds, a quick Google review woul...`
- **Action:** Convert to `h3` header
- **Clean text:** `The Script: "It was lovely meeting you today. If you have 30 seconds, a quick Google review would me...`

**6. Block 35 (split_block)**

- **Current style:** `normal`
- **Current text:** `When you're being targeted:
1. **Don't panic** - platforms recognize patterns
2. **Document everythi...`
- **Action:** Split into header + paragraph
- **Header:** `h3` - "When you're being targeted:"
- **Paragraph:** "1. Don't panic - platforms recognize patterns
2. Document everything - screenshots, dates, usernames..."

---

### Village Pub in a Dying Village? Survival Strategies That Actually Work

- **Slug:** `village-pub-dying-village-survival`
- **Article ID:** `rtuM5GmqOByzZCRYAH5cNP`
- **Published:** 2025-08-25T10:00:00Z
- **Total blocks:** 89
- **Issues found:** 0

✅ **No formatting issues found**

---

### Nobody Books Tables Anymore? Master the Art of Walk-ins vs Reservations

- **Slug:** `nobody-books-tables-anymore`
- **Article ID:** `jKwgQNCsrs019jNuQ4SGaG`
- **Published:** 2025-09-01T10:00:00Z
- **Total blocks:** 99
- **Issues found:** 0

✅ **No formatting issues found**

---

### Brewery Tie Strangling Your Profits? Legal Ways to Improve Your Deal

- **Slug:** `brewery-tie-improve-your-deal`
- **Article ID:** `jKwgQNCsrs019jNuQ4SGlU`
- **Published:** 2025-09-08T10:00:00Z
- **Total blocks:** 104
- **Issues found:** 0

✅ **No formatting issues found**

---

### Cash Flow Crisis Every Month? Breaking the Feast-or-Famine Cycle

- **Slug:** `cash-flow-crisis-breaking-cycle`
- **Article ID:** `Csdd80pLvugiOUK0y2JPDl`
- **Published:** 2025-09-15T10:00:00Z
- **Total blocks:** 79
- **Issues found:** 0

✅ **No formatting issues found**

---

### Food Allergies and GDPR: The Compliance Nightmares That Could Close You Down

- **Slug:** `food-allergies-gdpr-compliance`
- **Article ID:** `Csdd80pLvugiOUK0y2JPFV`
- **Published:** 2025-09-22T10:00:00Z
- **Total blocks:** 90
- **Issues found:** 0

✅ **No formatting issues found**

---

### Kitchen Nightmares: When Your Chef Quits on a Saturday Night

- **Slug:** `kitchen-nightmares-chef-quits`
- **Article ID:** `jKwgQNCsrs019jNuQ4SH7w`
- **Published:** 2025-09-29T10:00:00Z
- **Total blocks:** 76
- **Issues found:** 0

✅ **No formatting issues found**

---

## Manual Fix Instructions

Since automated fixes require write permissions, here are manual instructions for implementing these changes:

### In Sanity Studio:

1. **For header conversions:**
   - Navigate to the blog post in Sanity Studio
   - Find the block with the bold formatted text
   - Change the style from "Normal" to "H2" or "H3" as indicated
   - Remove the `**` markers from the text

2. **For block splits:**
   - Find the block containing both header and paragraph content
   - Create a new block above it with the header style
   - Move the header text to the new block (without `**` markers)
   - Keep the paragraph content in the original block
   - Change the original block style to "Normal"

3. **For bold formatting removal:**
   - Find blocks with excessive `**` formatting
   - Remove the `**` markers while keeping the text content
   - Keep bold only for genuine emphasis (prices, percentages, important warnings)

### Bulk Approach:

If you have Sanity write permissions, you can use the automated script:
```bash
npx tsx scripts/fix-blog-formatting.ts
```

This will automatically apply all the fixes identified in this report.

## Next Steps

1. Review this report
2. Either apply fixes manually in Sanity Studio or run the automated script with proper permissions
3. Verify changes by checking the blog posts on the live site
4. The formatting should now be consistent with older articles (proper h2/h3 headers, minimal bold formatting)
