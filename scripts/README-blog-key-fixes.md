# Blog Post _key Fixes Script

## Overview

The `fix-missing-keys-blog.js` script is designed to identify and fix missing `_key` properties in Sanity blog posts. These `_key` properties are required for array items in Sanity to ensure proper editing and data integrity.

## What it fixes

The script handles the following array fields in blog posts:

1. **Content blocks**: Ensures all non-block, non-span items in the content array have `_key` properties
2. **Block children**: Adds `_key` to block children that need them (excluding spans)
3. **Mark definitions**: Cleans up and adds `_key` to markDefs in block content
4. **FAQs**: Ensures all FAQ items have `_key` properties
5. **Quick stats**: Adds `_key` to quickStats array items
6. **Nested arrays**: Recursively processes nested objects and arrays
7. **Data cleanup**: Removes null/undefined entries from arrays

## Usage

### Basic usage (fix and verify):
```bash
node scripts/fix-missing-keys-blog.js
```

### Verification only:
```bash
node scripts/fix-missing-keys-blog.js --verify
```

## Features

- **Safe processing**: Uses Sanity's patch API instead of destructive operations
- **Comprehensive detection**: Identifies both missing keys and data cleanup issues
- **Detailed logging**: Shows exactly what changes are being made
- **Automatic verification**: Runs verification after fixes to ensure success
- **Null cleanup**: Removes null/undefined entries that can cause GROQ query issues

## Key generation

The script generates unique `_key` values using this format:
```
{prefix}_{timestamp}_{index}_{randomSuffix}
```

Where:
- `prefix`: Based on the item type (e.g., 'mark' for markDefs, 'item' for generic objects)
- `timestamp`: Current timestamp for uniqueness
- `index`: Array index for context
- `randomSuffix`: Random string for additional uniqueness

## Requirements

- Node.js
- Sanity API token with write permissions
- Environment variables configured in `.env.local`:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_TOKEN`

## Error handling

The script includes comprehensive error handling:
- Validates API token presence
- Handles individual post update failures
- Provides detailed error messages and stack traces
- Continues processing other posts if one fails

## Output

The script provides detailed progress information:
- Number of posts checked
- Number of posts needing fixes
- Specific changes made to each post
- Summary of successful updates and errors
- Verification results

## Related scripts

- `check-all-array-keys.ts`: General key checking across all document types
- `fix-missing-keys.ts`: Fixes keys in specific document types (aboutContent, navigation)

## Safety notes

- Always backup your data before running migration scripts
- Test on a development dataset first
- The script is designed to be safe and non-destructive, but data backups are recommended