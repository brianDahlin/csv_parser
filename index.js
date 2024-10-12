import path from 'path';
import { parseCSV } from './src/parse.js';
import { filterData } from './src/filter.js';
import fs from 'fs';

const csvFilePath = path.resolve(process.env.HOME, 'Desktop/csv-parser/csvs/bybit_users.csv');
const parsedOutputPath = path.resolve(process.env.HOME, 'Desktop/csv-parser/jsons/parsed_emails_and_uids.json');
const filteredOutputPath = path.resolve(process.env.HOME, 'Desktop/csv-parser/filteredjsons/filtered_uids.json');

const jsonDir = path.resolve(process.env.HOME, 'Desktop/csv-parser/jsons');
const filteredJsonDir = path.resolve(process.env.HOME, 'Desktop/csv-parser/filteredjsons');
if (!fs.existsSync(jsonDir)) {
  fs.mkdirSync(jsonDir, { recursive: true });
}
if (!fs.existsSync(filteredJsonDir)) {
  fs.mkdirSync(filteredJsonDir, { recursive: true });
}

async function processFiles() {
  try {
    console.log("Parsing CSV...");
    await parseCSV(csvFilePath, parsedOutputPath);

    console.log("Filtering data...");
    filterData(parsedOutputPath, filteredOutputPath);

    console.log("All operations completed.");
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

processFiles();
