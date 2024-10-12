import fs from 'fs';

export function filterData(inputFilePath, outputFilePath) {
  const data = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

  const filteredData = data.filter(user => Number(user.uid) > 320827655);

  const result = {
    totalValue: filteredData.length,
    users: filteredData,
  };

  fs.writeFileSync(outputFilePath, JSON.stringify(result, null, 2));
  console.log(`Filtered data with total count saved to ${outputFilePath}`);
}
