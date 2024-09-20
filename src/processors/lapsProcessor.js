// Load Laps data
function loadLapsData(laps) {
  if (!Array.isArray(laps)) throw new Error("Laps data must be an array");

  return laps.map((lap, index) => {
    const {
      startTimeInSeconds,
      totalDistanceInMeters,
      timerDurationInSeconds,
    } = lap;

    if (
      typeof startTimeInSeconds !== "number" ||
      typeof totalDistanceInMeters !== "number" ||
      typeof timerDurationInSeconds !== "number"
    ) {
      throw new Error(`Invalid lap data at index ${index}`);
    }

    return {
      startTime: startTimeInSeconds,
      distance: totalDistanceInMeters,
      duration: timerDurationInSeconds,
      heartRateSamples: [],
    };
  });
}

// Function to merge laps data with heart rate samples
function attachHeartRateToLaps(laps, heartRateSets, activityType) {
  if (!Array.isArray(laps)) {
    throw new Error("Laps data must be an array.");
  }

  if (!Array.isArray(heartRateSets)) {
    throw new Error("Heart rate sets must be an array.");
  }

  let setIndex = 0; // This tracks where we are in the heart rate sets array
  let globalSampleIndex = 0; // Global index across all heart rate samples

  laps.forEach((lap, lapIndex) => {
    if (!lap || typeof lap !== "object") {
      throw new Error(`Invalid lap data at index ${lapIndex}`);
    }

    let lapSamples = [];

    try {
      if (
        activityType === "INDOOR_CYCLING" &&
        setIndex < heartRateSets.length
      ) {
        // Ensure we get two consecutive heart rate sets for this lap
        const firstSet = heartRateSets[setIndex] || [];
        setIndex += 1;
        const secondSet = heartRateSets[setIndex] || [];
        setIndex += 1;

        // Combine the two sets into one array for this lap
        const combinedSet = [...firstSet, ...secondSet];

        if (!Array.isArray(combinedSet)) {
          throw new Error(`Invalid heart rate data for lap ${lapIndex}`);
        }

        // Add sample index and heart rate for each sample
        combinedSet.forEach((heartRate) => {
          // I'm not sure if you'd prefer to keep null values or skip them so I added a warning
          if (heartRate === null || typeof heartRate !== "number") {
            console.warn(
              `Invalid heart rate at global sample index ${globalSampleIndex}`
            );
          }

          lapSamples.push({
            sampleIndex: globalSampleIndex,
            heartRate: heartRate,
          });
          globalSampleIndex += 1;
        });

        console.log(
          `Lap ${lapIndex}: Combined ${lapSamples.length} heart rate samples from two consecutive sets.`
        );
      } else {
        // Non-indoor-cycling lap or no more heart rate data
        lapSamples = [];
      }

      // Attach the heart rate samples to the current lap
      lap.heartRateSamples = lapSamples;
    } catch (error) {
      throw new Error(`Error processing lap ${lapIndex}: ${error.message}`);
    }
  });
}

module.exports = { loadLapsData, attachHeartRateToLaps };
