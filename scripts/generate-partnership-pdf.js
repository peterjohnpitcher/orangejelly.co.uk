const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
  console.log('Starting PDF generation...');
  
  // Read the HTML file
  const htmlPath = path.join(__dirname, '../content/greene-king-partnership-letter.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Launch browser
  const browser = await chromium.launch({
    headless: true
  });
  
  const page = await browser.newPage();
  
  // Set viewport to A4 width, but allow full height for content
  await page.setViewportSize({
    width: 794,  // A4 width in pixels at 96 DPI
    height: 3000  // Allow tall viewport for all content
  });
  
  // Load the HTML content
  await page.setContent(htmlContent, {
    waitUntil: 'networkidle'
  });
  
  // Generate PDF
  const pdfPath = path.join(__dirname, '../content/greene-king-partnership-proposal.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    },
    preferCSSPageSize: true
  });
  
  console.log(`PDF generated successfully at: ${pdfPath}`);
  
  await browser.close();
}

// Run the generator
generatePDF().catch(console.error);