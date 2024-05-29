const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch(
    {headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']}
  );

  console.log('Opening new page...');
  const page = await browser.newPage();
  const htmlFilePath = path.join(__dirname, 'index.html');
  await page.goto(`file://${htmlFilePath}`, {
    waitUntil: 'networkidle0',
  });

  const executeFunction = async (page, functionName, ...args) => {
    return await page.evaluate((functionName, ...args) => {
      return window[functionName](...args);
    }, functionName, ...args);
  };
  const data =[
    { id: 'computer', percentage: 70 },
    { id: 'analytical', percentage: 80 },
    { id: 'spatial', percentage: 20 },
    { id: 'logical', percentage: 100 },
    { id: 'hard-questions', percentage: 30 },
    { id: 'medium-questions', percentage: 77 },
    { id: 'easy-questions', percentage: 90 },
  ];
  await executeFunction(page, 'updateDetails','Tirth Gaurangkumar Prajapati', 'New English School', 'Nadiad', 'Gujarat', 'A+', 91.5);
  await executeFunction(page, 'updateGraph', data);
  console.log('Generating PDF...');
  await page.setViewport({ width: 1080, height: 1024 });
  await  page.screenshot({
    path: 'result.webp',
    quality: 100,
    type: "webp",
  });
  await page.emulateMediaType('screen');  // Force screen media type for PDF
  await page.pdf({ path: 'result.pdf', format: 'A4' });

  console.log('PDF generated successfully!');

  console.log('Closing browser...');
  await browser.close();
})();
