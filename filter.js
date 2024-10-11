const fs = require('fs');
const path = require('path');

// File paths
const inputFilePath = path.resolve(process.env.HOME, 'Desktop/csv-parser/jsons/emails_and_uids.json');
const outputFilePath = path.resolve(process.env.HOME, 'Desktop/csv-parser/filteredjsons/filtered.json');


const data = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));


const filteredData = data.filter(user => {
  return Number(user.uid) > 320827655;
});

const result = {
    totalValue: filteredData.length,
    users: filteredData
  };
  
  fs.writeFileSync(outputFilePath, JSON.stringify(result, null, 2));
  console.log(`Filtered data with total count saved to ${outputFilePath}`);
