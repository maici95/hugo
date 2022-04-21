const fs = require('fs');
const { langs } = require('./config');

const keys = new Set();

const readFile = lang => {
    const path = `./input/default_${lang}.json`;
    const data = JSON.parse(fs.readFileSync(path, 'utf-8', data => data));
    return data;
}

langs.forEach(lang => {
    Object.keys(readFile(lang)).forEach(key => keys.add(key));
});

langs.forEach(lang => {
    const langKeys = Object.keys(readFile(lang));
    const missingKeys = [];
    const outputPath = `./output/missing_${lang}.json`;

    keys.forEach(key => {
        if (!langKeys.includes(key)) {
            missingKeys.push(key);
        }
    });

    const obj = {}
    missingKeys.forEach(key => obj[key] = 'MISSING_TRANSLATION');
    fs.writeFileSync(outputPath, JSON.stringify(obj, null, '\t'));
});
