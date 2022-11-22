import { randomModes, generateResult, getSettlementResult } from "../../../src/helpers/result-helper";

describe("Result statistic: 100000 times", () => {
    Object.keys(randomModes).forEach((mode) => {
        it(`should generate results statistically correct with mode ${mode}`, () => {
            // Arrange
            let statisticResult = {
                even: 0,
                odd: 0,
                fan1: 0,
                fan2: 0,
                fan3: 0,
                fan4: 0,
                kwok12: 0,
                kwok23: 0,
                kwok34: 0,
                kwok41: 0,
                chun123: 0,
                chun124: 0,
                chun134: 0,
                chun234: 0,
            };

            const totalRounds = 100000;
            const dragonTails = {};
            let winningChoice = "even";
            let continuity = 0;

            // Act
            for (let i = 0; i < totalRounds; i++) {
                const result = generateResult(mode);
                const settlementResult = getSettlementResult(result);

                Object.keys(statisticResult).forEach((choice) => (statisticResult[choice] += settlementResult[choice] >> 0));

                if (settlementResult[winningChoice]) {
                    continuity++;
                } else {
                    if (continuity >= 4) {
                        dragonTails[continuity] = dragonTails[continuity] ?? 0;
                        dragonTails[continuity] += 1;
                    }
                    continuity = 0;
                }
                winningChoice = settlementResult.even ? "even" : "odd";
            }

            // Assert
            const resultPercentage = Object.keys(statisticResult).reduce((percentage, key) => {
                percentage[key] = +parseFloat((statisticResult[key] / totalRounds) * 100).toFixed(2);

                return percentage;
            }, {});
            console.log(
                `Mode:${mode}, countResult: ${JSON.stringify(statisticResult)}, percentageResult: ${JSON.stringify(resultPercentage)}`
            );
            console.log(`dragon tails: ${JSON.stringify(dragonTails)}`);

            expect(resultPercentage.odd).toBeGreaterThanOrEqual(49.5);
            expect(resultPercentage.even).toBeGreaterThanOrEqual(49.5);
            expect(resultPercentage.fan1).toBeGreaterThanOrEqual(24.5);
            expect(resultPercentage.fan2).toBeGreaterThanOrEqual(24.5);
            expect(resultPercentage.fan3).toBeGreaterThanOrEqual(24.5);
            expect(resultPercentage.fan4).toBeGreaterThanOrEqual(24.5);
            expect(dragonTails[4]).toBeLessThan(1700);
            expect(dragonTails[5]).toBeLessThan(850);
            expect(dragonTails[6]).toBeLessThan(450);
            expect(dragonTails[7]).toBeLessThan(250);
            expect(dragonTails[8]).toBeLessThan(130);
            expect(dragonTails[9]).toBeLessThan(70);
            expect(dragonTails[10]).toBeLessThan(40);
        });
    });
});
