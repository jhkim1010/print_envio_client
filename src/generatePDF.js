const React = require('react');
const ReactDOMServer = require('react-dom/server');
const puppeteer = require('puppeteer');
const fs = require('fs');
const printer = require('printer');
const config = require('./config').default; // Import the configuration

require('@babel/register')({
  presets: ['@babel/preset-react']
});

// Import the table component
const TableComponent = require('./TableComponent').default;

// Create a function that generates and prints the PDF with client information
async function generatePDF(clientInfo) {
  // Create a component that includes the company and client information
  const CompanyTableComponent = () => (
    <TableComponent
      companyName={config.company.name}
      companyAddress={config.company.address}
      companyPhone={config.company.phone}
      clientInfo={clientInfo}
    />
  );

  // Render the component to HTML
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(CompanyTableComponent));

  // Path to save the generated PDF
  const pdfPath = 'output.pdf';

  // Generate the PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({
    path: pdfPath,
    format: 'A5',
    printBackground: true
  });

  await browser.close();
  console.log('PDF Generated');

  return pdfPath;
}

// Define a function to print the PDF
function printPDF(pdfPath) {
  const file = fs.readFileSync(pdfPath);

  printer.printDirect({
    data: file,
    type: 'PDF',
    printer: config.printer.name, // Use printer name from config
    success: function (jobID) {
      console.log('Print job sent with ID: ' + jobID);
    },
    error: function (err) {
      console.error('Error printing: ' + err);
    }
  });
}

// Export the functions
module.exports = { generatePDF, printPDF };
