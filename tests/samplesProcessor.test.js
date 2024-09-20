const { loadSamplesData } = require("../src/processors/samplesProcessor");

describe("loadSamplesData", () => {
  it("should load and filter heart rate data correctly", () => {
    const samples = [
      {
        "sample-type": "2",
        data: "120,126,122",
      },
      {
        "sample-type": "2",
        data: "140,142,155",
      },
    ];

    const result = loadSamplesData(samples);

    expect(result).toEqual([
      [120, 126, 122],
      [140, 142, 155],
    ]);
  });

  it('should return an empty array if no heart rate samples of type "2" exist', () => {
    const samples = [
      {
        "sample-type": "0",
        data: "86,87,88",
      },
      {
        "sample-type": "1",
        data: "100,105,110",
      },
    ];

    const result = loadSamplesData(samples);

    expect(result).toEqual([]);
  });

  it("should handle null values in heart rate data", () => {
    const samples = [
      {
        "sample-type": "2",
        data: "120,null,140",
      },
    ];

    const result = loadSamplesData(samples);

    expect(result).toEqual([[120, null, 140]]);
  });

  it("should throw an error if samples is not an array", () => {
    expect(() => loadSamplesData(null)).toThrow(
      "Samples data must be an array"
    );
  });

  it("should throw an error if sample-type is missing", () => {
    const samples = [
      {
        data: "120,126,122",
      },
    ];

    expect(() => loadSamplesData(samples)).toThrow(
      "Sample type missing at index 0"
    );
  });

  it("should throw an error if heart rate data format is invalid", () => {
    const samples = [
      {
        "sample-type": "2",
        data: { not: "a string" },
      },
    ];

    expect(() => loadSamplesData(samples)).toThrow(
      "Invalid heart rate data format at index 0"
    );
  });

  it("should handle invalid numbers in heart rate data", () => {
    const samples = [
      {
        "sample-type": "2",
        data: "120,invalid,140",
      },
    ];

    const result = loadSamplesData(samples);

    expect(result).toEqual([[120, null, 140]]);
  });
});
