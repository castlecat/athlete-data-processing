const { loadSummaryData } = require("../src/processors/summaryProcessor");

describe("loadSummaryData", () => {
  it("should correctly load and process valid summary data", () => {
    const summary = {
      userId: "1234567890",
      activityType: "INDOOR_CYCLING",
      deviceName: "instinct2",
      maxHeartRateInBeatsPerMinute: 190,
      durationInSeconds: 3667,
    };

    const result = loadSummaryData(summary);

    expect(result).toEqual({
      userId: "1234567890",
      activityType: "INDOOR_CYCLING",
      deviceName: "instinct2",
      maxHeartRate: 190,
      duration: 3667,
    });
  });

  it("should throw an error if summary data is missing", () => {
    expect(() => loadSummaryData(null)).toThrow("Summary data is missing");
  });

  it("should throw an error if userId is not a string", () => {
    const summary = {
      userId: 1234567890, // Not a string
      activityType: "INDOOR_CYCLING",
      deviceName: "instinct2",
      maxHeartRateInBeatsPerMinute: 190,
      durationInSeconds: 3667,
    };

    expect(() => loadSummaryData(summary)).toThrow(
      "Invalid summary data format"
    );
  });

  it("should throw an error if activityType is not a string", () => {
    const summary = {
      userId: "1234567890",
      activityType: 123, // Not a string
      deviceName: "instinct2",
      maxHeartRateInBeatsPerMinute: 190,
      durationInSeconds: 3667,
    };

    expect(() => loadSummaryData(summary)).toThrow(
      "Invalid summary data format"
    );
  });

  it("should throw an error if deviceName is not a string", () => {
    const summary = {
      userId: "1234567890",
      activityType: "INDOOR_CYCLING",
      deviceName: 123, // Not a string
      maxHeartRateInBeatsPerMinute: 190,
      durationInSeconds: 3667,
    };

    expect(() => loadSummaryData(summary)).toThrow(
      "Invalid summary data format"
    );
  });

  it("should throw an error if maxHeartRateInBeatsPerMinute is not a number", () => {
    const summary = {
      userId: "1234567890",
      activityType: "INDOOR_CYCLING",
      deviceName: "instinct2",
      maxHeartRateInBeatsPerMinute: "190", // Not a number
      durationInSeconds: 3667,
    };

    expect(() => loadSummaryData(summary)).toThrow(
      "Invalid summary data format"
    );
  });

  it("should throw an error if durationInSeconds is not a number", () => {
    const summary = {
      userId: "1234567890",
      activityType: "INDOOR_CYCLING",
      deviceName: "instinct2",
      maxHeartRateInBeatsPerMinute: 190,
      durationInSeconds: "3667", // Not a number
    };

    expect(() => loadSummaryData(summary)).toThrow(
      "Invalid summary data format"
    );
  });
});
