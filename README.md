Athlete data processing library created in JavaScript. Not optimized for large datasets.

## Getting Started

First, make sure to install the necessary dependencies:

```bash
npm install
```

After all dependencies have been installed, run index.js using Node:

```bash
node index.js
```

This will generate a JSON file (processedActivity.json) containing the finalized data.

Lastly, you can run all Jest tests or check the test coverage with the following commands:

```bash
npm test
npm test -- --coverage
```

----------------------|---------|----------|---------|---------|-------------------  
File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s  
----------------------|---------|----------|---------|---------|-------------------
All files | 95.65 | 91.66 | 100 | 95.45 |
src | 100 | 100 | 100 | 100 |
processData.js | 100 | 100 | 100 | 100 |
src/processors | 94.82 | 91.66 | 100 | 94.54 |
lapsProcessor.js | 91.66 | 86.2 | 100 | 91.42 | 64,71,94
samplesProcessor.js | 100 | 100 | 100 | 100 |
summaryProcessor.js | 100 | 100 | 100 | 100 |
----------------------|---------|----------|---------|---------|-------------------
