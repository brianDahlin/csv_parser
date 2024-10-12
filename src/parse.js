import csv from 'csv-parser';
import fs from 'fs';

export function parseCSV(inputFilePath, outputFilePath) {
  return new Promise((resolve, reject) => {
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
        resolve(); 
      })
      .on('error', (err) => {
        console.error('Error reading the CSV file:', err.message);
        reject(err); 
      });
  });
}
