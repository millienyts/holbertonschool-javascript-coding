import fs from 'fs';

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const groupedByField = data
        .split('\n')
        .filter(Boolean)
        .slice(1)
        .reduce((acc, line) => {
          const [firstname, , , field] = line.split(',');
          acc[field] = [...(acc[field] || []), firstname];
          return acc;
        }, {});
      resolve(groupedByField);
    });
  });
}

module.exports = readDatabase;
