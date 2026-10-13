const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = path.resolve(__dirname, 'index.html');
const outputPath = path.resolve(__dirname, '..', 'public', 'musanid-aser-company-profile.pdf');
const tempProfile = path.resolve(__dirname, '..', '.chrome-pdf-temp');

if (!fs.existsSync(tempProfile)) {
  fs.mkdirSync(tempProfile, { recursive: true });
}

console.log('Rendering 6-page Corporate Profile to PDF...');
console.log('Source:', htmlPath);
console.log('Output:', outputPath);

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
  console.log('SUCCESS! PDF generated successfully.');
  console.log(`File size: ${(stats.size / 1024).toFixed(1)} KB`);
} else {
  console.error('ERROR: PDF was not generated.', result.error || result.stderr);
  process.exit(1);
}
