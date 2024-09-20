const { processData } = require("./src/processData");
const { saveOutputToFile } = require("./src/utils/fileOperations");

const summaryData = {
  userId: "1234567890",
  activityId: 9480958402,
  activityName: "Indoor Cycling",
  durationInSeconds: 3667,
  startTimeInSeconds: 1661158927,
  startTimeOffsetInSeconds: 7200,
  activityType: "INDOOR_CYCLING",
  averageHeartRateInBeatsPerMinute: 150,
  activeKilocalories: 561,
  deviceName: "instinct2",
  maxHeartRateInBeatsPerMinute: 190,
};

const lapsData = [
  {
    startTimeInSeconds: 1661158927,
    airTemperatureCelsius: 28,
    heartRate: 109,
    totalDistanceInMeters: 15,
    timerDurationInSeconds: 600,
  },
  {
    startTimeInSeconds: 1661158929,
    airTemperatureCelsius: 28,
    heartRate: 107,
    totalDistanceInMeters: 30,
    timerDurationInSeconds: 900,
  },
];

const samplesData = [
  {
    "recording-rate": 5,
    "sample-type": "0",
    data: "86,87,88,88,88,90,91",
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "120,126,122,140,142,155,145",
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "141,147,155,160,180,152,120",
  },
  {
    "recording-rate": 5,
    "sample-type": "0",
    data: "86,87,88,88,88,90,91",
  },
  {
    "recording-rate": 5,
    "sample-type": "1",
    data: "143,87,88,88,88,90,91",
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "143,151,164,null,173,181,180",
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    data: "182,170,188,181,174,172,158",
  },
  {
    "recording-rate": 5,
    "sample-type": "3",
    data: "143,87,88,88,88,90,91",
  },
];

// Process the data and create output JSON
try {
  const processedData = processData(summaryData, lapsData, samplesData);
  saveOutputToFile(processedData, "processedActivity.json");
  console.log("Data processed and saved to processedActivity.json");
} catch (error) {
  console.error(`Error: ${error.message}`);
}
