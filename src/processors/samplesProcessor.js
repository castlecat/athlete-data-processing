// Load and process Sample data while filtering heart rate data
function loadSamplesData(samples) {
  if (!Array.isArray(samples)) throw new Error("Samples data must be an array");

  let heartRateSets = []; // Array to hold grouped heart rate samples

  samples.forEach((sample, index) => {
    if (!sample["sample-type"])
      throw new Error(`Sample type missing at index ${index}`);

    if (sample["sample-type"] === "2") {
      if (typeof sample.data !== "string")
        throw new Error(`Invalid heart rate data format at index ${index}`);

      const heartRates = sample.data.split(",").map((hr) => {
        const heartRate = Number(hr);
        return isNaN(heartRate) ? null : heartRate;
      });

      // Store each set of heart rates separately
      heartRateSets.push(heartRates);
    }
  });

  return heartRateSets;
}

module.exports = { loadSamplesData };
