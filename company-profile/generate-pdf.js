const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempProfile = path.resolve(__dirname, '..', '.chrome-pdf-temp');

if (!fs.existsSync(tempProfile)) {
  fs.mkdirSync(tempProfile, { recursive: true });
}

function renderProfile(htmlFilename, pdfFilename, title) {
  const htmlPath = path.resolve(__dirname, htmlFilename);
  const outputPath = path.resolve(__dirname, '..', 'public', pdfFilename);

  console.log(`\n========================================`);
  console.log(`Rendering: ${title}`);
  console.log(`Source:    ${htmlPath}`);
  console.log(`Output:    ${outputPath}`);
  console.log(`========================================`);

  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    '--allow-file-access-from-files',
    `--user-data-dir=${tempProfile}`,
    `--print-to-pdf=${outputPath}`,
    fileUrl
  ];

  const result = spawnSync(chromePath, args, { stdio: 'inherit' });

  if (fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    console.log(`SUCCESS: ${pdfFilename} generated successfully.`);
    console.log(`File size: ${(stats.size / 1024).toFixed(1)} KB`);
  } else {
    console.error(`ERROR: ${pdfFilename} was not generated.`, result.error || result.stderr);
  }
}

// Check arguments or default to generating both
const target = process.argv[2] ? process.argv[2].toLowerCase() : 'all';

if (target === 'ar' || target === 'all') {
  renderProfile('index.html', 'musanid-aser-company-profile.pdf', 'Arabic Corporate Profile (الملف التعريفي العربي)');
}

if (target === 'en' || target === 'all') {
  renderProfile('index-en.html', 'musanid-aser-company-profile-en.pdf', 'English Corporate Profile (الملف التعريفي الإنجليزي)');
}

