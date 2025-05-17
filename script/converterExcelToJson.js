import fs from 'node:fs';
import path from 'node:path';
import xlsx from 'xlsx';
import { fileURLToPath } from 'node:url';

// Emular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resto do script
const filePath = path.join(__dirname, 'dados.xlsx');
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const jsonData = xlsx.utils.sheet_to_json(sheet);

fs.writeFileSync('dados.json', JSON.stringify(jsonData, null, 2), 'utf8');
console.log('Arquivo JSON gerado com sucesso.');
