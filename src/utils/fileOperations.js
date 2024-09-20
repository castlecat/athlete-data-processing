const fs = require("fs");

// Save output to file
function saveOutputToFile(output, filename) {
  try {
    fs.writeFileSync(filename, JSON.stringify(output, null, 2), "utf8");
  } catch (error) {
    throw new Error(`Failed to save output to file: ${error.message}`);
  }
}

module.exports = { saveOutputToFile };
