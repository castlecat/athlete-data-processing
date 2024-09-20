const { loadSummaryData } = require("./processors/summaryProcessor");
const {
  loadLapsData,
  attachHeartRateToLaps,
} = require("./processors/lapsProcessor");
const { loadSamplesData } = require("./processors/samplesProcessor");

// Main function to process all data with error handling
function processData(summary, laps, samples) {
  try {
    const activityOverview = loadSummaryData(summary);
    const lapsData = loadLapsData(laps);
    const heartRateSamples = loadSamplesData(samples);

    attachHeartRateToLaps(lapsData, heartRateSamples, summary.activityType);

    return {
      activityOverview,
      laps: lapsData,
    };
  } catch (error) {
    throw new Error(`Failed to process data: ${error.message}`);
  }
}

module.exports = { processData };
