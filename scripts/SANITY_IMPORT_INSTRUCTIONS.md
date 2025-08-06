# Instructions to Import Case Studies into Sanity

## Option 1: Using Sanity CLI (Recommended)

1. **First, backup your current data** (optional but recommended):
   ```bash
   cd /Users/peterpitcher/Documents/Cursor/orangejelly.co.uk/website/sanity-studio
   sanity dataset export production ./backup-$(date +%Y%m%d-%H%M%S).tar.gz
   ```

2. **Delete existing case studies**:
   ```bash
   # This will delete ALL case studies - be careful!
   sanity documents delete \
     --dataset production \
     --query "*[_type == 'caseStudy']"
   ```

3. **Import the new case studies**:
   ```bash
   sanity dataset import ../scripts/case-studies-import.ndjson production \
     --replace-documents
   ```

## Option 2: Manual Entry in Sanity Studio

1. **Open Sanity Studio**:
   ```bash
   cd /Users/peterpitcher/Documents/Cursor/orangejelly.co.uk/website/sanity-studio
   npm run dev
   ```

2. **Delete existing case studies**:
   - Go to the Case Study section
   - Select and delete each existing case study

3. **Create new case studies**:
   - Use the content from `/scripts/case-studies-for-sanity.md`
   - Create each case study manually with the provided content

## Option 3: Using Sanity's Vision Tool

1. **Open Vision in Sanity Studio**:
   - Navigate to Vision plugin in your Studio
   - Or go to: https://www.sanity.io/manage/project/9brdfanc/datasets/production/vision

2. **Run delete query**:
   ```groq
   *[_type == "caseStudy"]
   ```
   Then manually delete each result

3. **Import using the API**:
   - Use the Sanity HTTP API with proper authentication
   - POST the NDJSON content to the import endpoint

## Important Notes:

- All case studies are based on REAL data from The Anchor
- No claims about helping other pubs (first client September 2025)
- All metrics are accurate from the interview questions
- Customer database is 300 contacts (not 850)
- Pricing is always £62.50/hour plus VAT

## Verification:

After import, verify the case studies by running:
```bash
sanity documents query "*[_type == 'caseStudy']{title, slug}"
```

You should see:
1. Tuesday Quiz Night Transformation
2. Sunday Lunch Waste Elimination
3. Social Media Reach Explosion
4. Food GP Transformation
5. Tasting Nights Success Formula