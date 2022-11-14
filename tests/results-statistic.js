import { getSettlementResult, generateResult } from "../src/helpers/result-helper";
import constants from "../src/constants";

const streakNumber = 4;

const getNumOfBeadStatistic = () => {
    const result = {};

    for (let i = constants.numberOfBeads.min; i <= constants.numberOfBeads.max; i++) {
        result[i] = 0;
    }

    return result;
};

function calculateStreaks(occurrences, settlementResult, streaks) {
    Object.keys(constants.resetTotalBets).forEach((choice) => {
        if (settlementResult[choice]) {
            occurrences[choice]++;
        } else {
            if (occurrences[choice] >= streakNumber) {
                streaks[choice].total++;
                streaks[choice].streaks[occurrences[choice]] = streaks[choice].streaks[occurrences[choice]]
                    ? streaks[choice].streaks[occurrences[choice]] + 1
                    : 1;
            }
            occurrences[choice] = 0;
        }
    });
}

function run(randomMode) {
    const statisticResult = { ...constants.resetTotalBets };

    const occurrences = { ...constants.resetTotalBets };

    const streaks = Object.keys(constants.resetTotalBets).reduce((result, key) => {
        result[key] = {
            total: 0,
            streaks: {},
        };
        return result;
    }, {});

    const totalBeads = getNumOfBeadStatistic();

    const totalRounds = 100000;

    for (let i = 0; i < totalRounds; i++) {
        const result = generateResult(randomMode);
        const settlementResult = getSettlementResult(result);

        calculateStreaks(occurrences, settlementResult, streaks);

        totalBeads[result.totalBeads]++;
        Object.keys(statisticResult).forEach((choice) => (statisticResult[choice] += settlementResult[choice] >> 0));
    }

    const resultPercentage = Object.keys(statisticResult).reduce((percentage, key) => {
        percentage[key] = +parseFloat((statisticResult[key] / totalRounds) * 100).toFixed(2);

        return percentage;
    }, {});

    const beadPercentage = Object.keys(totalBeads).reduce((percentage, key) => {
        percentage[key] = +parseFloat((totalBeads[key] / totalRounds) * 100).toFixed(2);

        return percentage;
    }, {});

    console.log(
        `Mode:${randomMode}, countResult: ${JSON.stringify(statisticResult)}, percentageResult: ${JSON.stringify(
            resultPercentage
        )}, bead: ${JSON.stringify(beadPercentage)}`
    );
    console.log(`dragon tails: ${JSON.stringify(streaks)}`);
}

const randomModes = [1, 2, 3];
const runNo = 3;

for (let randomMode of randomModes) {
    for (let i = 0; i < runNo; i++) {
        run(randomMode);
    }
}
