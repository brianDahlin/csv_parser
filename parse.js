const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputFilePath = path.resolve(process.env.HOME,'Desktop/csv-parser/csvs/bybit_users.csv');
const outputFilePath = path.resolve(process.env.HOME, 'Desktop/csv-parser/jsons/emails_and_uids.json');

const extractedData = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    if (row.email && row.uid) {
      extractedData.push({ email: row.email, uid: row.uid });
    }
  })
  .on('end', () => {
    fs.writeFileSync(outputFilePath, JSON.stringify(extractedData, null, 2));
    console.log(`Data extracted and saved to ${outputFilePath}`);
  })
  .on('error', (err) => {
    console.error('Error reading the CSV file:', err.message);
  });
