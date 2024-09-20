// Load Summary data
function loadSummaryData(summary) {
  if (!summary) throw new Error("Summary data is missing");

  const {
    userId,
    activityType,
    deviceName,
    maxHeartRateInBeatsPerMinute,
    durationInSeconds,
  } = summary;

  if (
    typeof userId !== "string" ||
    typeof activityType !== "string" ||
    typeof deviceName !== "string" ||
    typeof maxHeartRateInBeatsPerMinute !== "number" ||
    typeof durationInSeconds !== "number"
  ) {
    throw new Error("Invalid summary data format");
  }

  return {
    userId,
    activityType,
    deviceName,
    maxHeartRate: maxHeartRateInBeatsPerMinute,
    duration: durationInSeconds,
  };
}

module.exports = { loadSummaryData };
