const {
  loadLapsData,
  attachHeartRateToLaps,
} = require("../src/processors/lapsProcessor");

// Test for loadLapsData
describe("loadLapsData", () => {
  it("should load and map lap data correctly", () => {
    const laps = [
      {
        startTimeInSeconds: 1609459200,
        totalDistanceInMeters: 5000,
        timerDurationInSeconds: 1200,
      },
    ];

    const result = loadLapsData(laps);

    expect(result).toEqual([
      {
        startTime: 1609459200,
        distance: 5000,
        duration: 1200,
        heartRateSamples: [],
      },
    ]);
  });

  it("should throw an error if laps is not an array", () => {
    expect(() => loadLapsData(null)).toThrow("Laps data must be an array");
  });

  it("should throw an error if lap data is invalid", () => {
    const invalidLaps = [
      {
        startTimeInSeconds: "not a number",
        totalDistanceInMeters: 5000,
        timerDurationInSeconds: 1200,
      },
    ];

    expect(() => loadLapsData(invalidLaps)).toThrow(
      "Invalid lap data at index 0"
    );
  });
});

// Test for attachHeartRateToLaps
describe("attachHeartRateToLaps", () => {
  const laps = [
    {
      startTime: 1609459200,
      distance: 5000,
      duration: 1200,
      heartRateSamples: [],
    },
    {
      startTime: 1609459260,
      distance: 10000,
      duration: 2400,
      heartRateSamples: [],
    },
  ];

  const heartRateSets = [
    [120, 130, 140],
    [145, 150],
    [155, 160],
    [165, 170, 175],
  ];

  it("should attach heart rate samples to laps for INDOOR_CYCLING", () => {
    attachHeartRateToLaps(laps, heartRateSets, "INDOOR_CYCLING");

    expect(laps[0].heartRateSamples).toEqual([
      { sampleIndex: 0, heartRate: 120 },
      { sampleIndex: 1, heartRate: 130 },
      { sampleIndex: 2, heartRate: 140 },
      { sampleIndex: 3, heartRate: 145 },
      { sampleIndex: 4, heartRate: 150 },
    ]);

    expect(laps[1].heartRateSamples).toEqual([
      { sampleIndex: 5, heartRate: 155 },
      { sampleIndex: 6, heartRate: 160 },
      { sampleIndex: 7, heartRate: 165 },
      { sampleIndex: 8, heartRate: 170 },
      { sampleIndex: 9, heartRate: 175 },
    ]);
  });

  it("should handle non-INDOOR_CYCLING activity without adding heart rate samples", () => {
    attachHeartRateToLaps(laps, heartRateSets, "RUNNING");

    expect(laps[0].heartRateSamples).toEqual([]);
    expect(laps[1].heartRateSamples).toEqual([]);
  });

  it("should throw an error if laps is not an array", () => {
    expect(() =>
      attachHeartRateToLaps(null, heartRateSets, "INDOOR_CYCLING")
    ).toThrow("Laps data must be an array.");
  });

  it("should throw an error if heartRateSets is not an array", () => {
    expect(() => attachHeartRateToLaps(laps, null, "INDOOR_CYCLING")).toThrow(
      "Heart rate sets must be an array."
    );
  });

  it("should throw an error for invalid lap data", () => {
    const invalidLaps = [null];

    expect(() =>
      attachHeartRateToLaps(invalidLaps, heartRateSets, "INDOOR_CYCLING")
    ).toThrow("Invalid lap data at index 0");
  });
});
