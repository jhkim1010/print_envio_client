import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read and parse the config.json file
const configPath = resolve(__dirname, '/config.json');
console.log(configPath);
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

// Export the configuration
export default config;
