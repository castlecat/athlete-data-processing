const { processData } = require("../src/processData");
const { loadSummaryData } = require("../src/processors/summaryProcessor");
const {
  loadLapsData,
  attachHeartRateToLaps,
} = require("../src/processors/lapsProcessor");
const { loadSamplesData } = require("../src/processors/samplesProcessor");

jest.mock("../src/processors/summaryProcessor");
jest.mock("../src/processors/lapsProcessor");
jest.mock("../src/processors/samplesProcessor");

describe("processData", () => {
  const mockSummary = {
    userId: "1234567890",
    activityType: "INDOOR_CYCLING",
    deviceName: "Garmin",
    maxHeartRateInBeatsPerMinute: 190,
    durationInSeconds: 3600,
  };

  const mockLaps = [
    {
      startTimeInSeconds: 1600000000,
      totalDistanceInMeters: 5000,
      timerDurationInSeconds: 600,
    },
    {
      startTimeInSeconds: 1600000600,
      totalDistanceInMeters: 5000,
      timerDurationInSeconds: 600,
    },
  ];

  const mockSamples = [
    { "recording-rate": 5, "sample-type": "2", data: "120,126,122,140" },
    { "recording-rate": 5, "sample-type": "2", data: "141,147,155,160" },
  ];

  const mockProcessedLaps = [
    {
      startTime: 1600000000,
      distance: 5000,
      duration: 600,
      heartRateSamples: [],
    },
    {
      startTime: 1600000600,
      distance: 5000,
      duration: 600,
      heartRateSamples: [],
    },
  ];

  const mockHeartRateSamples = [
    [120, 126, 122, 140],
    [141, 147, 155, 160],
  ];

  beforeEach(() => {
    loadSummaryData.mockReturnValue({
      userId: mockSummary.userId,
      activityType: mockSummary.activityType,
      deviceName: mockSummary.deviceName,
      maxHeartRate: mockSummary.maxHeartRateInBeatsPerMinute,
      duration: mockSummary.durationInSeconds,
    });

    loadLapsData.mockReturnValue(mockProcessedLaps);
    loadSamplesData.mockReturnValue(mockHeartRateSamples);
    attachHeartRateToLaps.mockImplementation(() => {}); // No-op for simplicity
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should process all data correctly and return the merged output", () => {
    const result = processData(mockSummary, mockLaps, mockSamples);

    expect(loadSummaryData).toHaveBeenCalledWith(mockSummary);
    expect(loadLapsData).toHaveBeenCalledWith(mockLaps);
    expect(loadSamplesData).toHaveBeenCalledWith(mockSamples);
    expect(attachHeartRateToLaps).toHaveBeenCalledWith(
      mockProcessedLaps,
      mockHeartRateSamples,
      mockSummary.activityType
    );

    expect(result).toEqual({
      activityOverview: {
        userId: "1234567890",
        activityType: "INDOOR_CYCLING",
        deviceName: "Garmin",
        maxHeartRate: 190,
        duration: 3600,
      },
      laps: mockProcessedLaps,
    });
  });

  it("should throw an error if any processor throws an error", () => {
    loadSummaryData.mockImplementation(() => {
      throw new Error("Summary processing error");
    });

    expect(() => processData(mockSummary, mockLaps, mockSamples)).toThrow(
      "Failed to process data: Summary processing error"
    );
  });

  it("should throw an error if the laps processor fails", () => {
    loadLapsData.mockImplementation(() => {
      throw new Error("Laps data error");
    });

    expect(() => processData(mockSummary, mockLaps, mockSamples)).toThrow(
      "Failed to process data: Laps data error"
    );
  });

  it("should throw an error if the samples processor fails", () => {
    loadSamplesData.mockImplementation(() => {
      throw new Error("Samples data error");
    });

    expect(() => processData(mockSummary, mockLaps, mockSamples)).toThrow(
      "Failed to process data: Samples data error"
    );
  });
});
