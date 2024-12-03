import express from 'express';
import fs from 'fs';
import chalk from 'chalk';

export const router = express.Router();

const routes = fs.readdirSync(import.meta.dirname, { withFileTypes: true });

for (const file of routes) {
    if (file.name === 'index.mjs') continue;
    if (file.name.includes('test')) continue;
    import(`./${file.name}`).then(module => {
        module.default(router);
        console.log('Loaded route: ' + chalk.green(file.name));
    }, err => {
        console.error('Failed to load route: ' + chalk.red(file.name));
        console.error(err);
    });
}
