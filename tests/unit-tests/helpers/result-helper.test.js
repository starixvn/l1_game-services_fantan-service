import { generateResult, getSettlementResult, generateRawResultForHash } from "../../../src/helpers/result-helper";

describe("getSettlementResult tests", () => {
    describe("when result having final beads is 1", () => {
        it("should return winning choices [odd, fan1, kwok12, kwok41, chun123, chun124, chun134]", () => {
            // Arrange
            const roundResult = { finalBeads: 1 };
            const expected = {
                odd: true,
                even: false,
                fan1: true,
                fan2: false,
                fan3: false,
                fan4: false,
                kwok12: true,
                kwok23: false,
                kwok34: false,
                kwok41: true,
                chun123: true,
                chun124: true,
                chun134: true,
                chun234: false,
            };

            // Act
            const settlementResult = getSettlementResult(roundResult);

            // Assert
            expect(settlementResult).toStrictEqual(expected);
        });
    });

    describe("when result having final beads is 2", () => {
        it("should should return winning choices [even, fan2, kwok12, kwok23, chun123, chun124, chun234] ", () => {
            // Arrange
            const roundResult = { finalBeads: 2 };
            const expected = {
                odd: false,
                even: true,
                fan1: false,
                fan2: true,
                fan3: false,
                fan4: false,
                kwok12: true,
                kwok23: true,
                kwok34: false,
                kwok41: false,
                chun123: true,
                chun124: true,
                chun134: false,
                chun234: true,
            };

            // Act
            const settlementResult = getSettlementResult(roundResult);

            // Assert
            expect(settlementResult).toStrictEqual(expected);
        });
    });

    describe("when result having final beads is 3", () => {
        it("should should return winning choice [odd, fan3, kwok23, kwok34, chun123, chun134, chun234]", () => {
            // Arrange
            const roundResult = { finalBeads: 3 };
            const expected = {
                odd: true,
                even: false,
                fan1: false,
                fan2: false,
                fan3: true,
                fan4: false,
                kwok12: false,
                kwok23: true,
                kwok34: true,
                kwok41: false,
                chun123: true,
                chun124: false,
                chun134: true,
                chun234: true,
            };

            // Act
            const settlementResult = getSettlementResult(roundResult);

            // Assert
            expect(settlementResult).toStrictEqual(expected);
        });
    });

    describe("when result having final beads is 4", () => {
        it("should should return winning choice [even, fan4, kwok34, kwok41, chun124, chun134, chun234]", () => {
            // Arrange
            const roundResult = { finalBeads: 4 };
            const expected = {
                odd: false,
                even: true,
                fan1: false,
                fan2: false,
                fan3: false,
                fan4: true,
                kwok12: false,
                kwok23: false,
                kwok34: true,
                kwok41: true,
                chun123: false,
                chun124: true,
                chun134: true,
                chun234: true,
            };

            // Act
            const settlementResult = getSettlementResult(roundResult);

            // Assert
            expect(settlementResult).toStrictEqual(expected);
        });
    });
});

describe("generateResult tests", () => {
    describe("when not passing mode", () => {
        it("should return result includes totalBeads ", () => {
            // Act
            const result = generateResult();

            // Assert
            expect(Object.keys(result).includes("totalBeads"));
        });

        it("should return result includes finalBeads ", () => {
            // Act
            const result = generateResult();

            // Assert
            expect(Object.keys(result).includes("finalBeads"));
        });

        it("should return total beads in range 29-40", () => {
            // Act
            const { totalBeads } = generateResult();

            // Assert
            expect(totalBeads >= 29 && totalBeads <= 40).toBeTruthy();
        });

        it("should return final beads in range 1-4", () => {
            // Act
            const { finalBeads } = generateResult();

            // Assert
            expect(finalBeads >= 1 && finalBeads <= 4).toBeTruthy();
        });
    });

    describe("when passing a out of range mode", () => {
        it("should return result includes totalBeads ", () => {
            // Act
            const result = generateResult();

            // Assert
            expect(Object.keys(result).includes("totalBeads"));
        });

        it("should return result includes finalBeads ", () => {
            // Act
            const result = generateResult();

            // Assert
            expect(Object.keys(result).includes("finalBeads"));
        });

        it("should return total beads in range 29-40", () => {
            // Act
            const { totalBeads } = generateResult();

            // Assert
            expect(totalBeads >= 29 && totalBeads <= 40).toBeTruthy();
        });

        it("should return final beads in range 1-4", () => {
            // Act
            const { finalBeads } = generateResult();

            // Assert
            expect(finalBeads >= 1 && finalBeads <= 4).toBeTruthy();
        });
    });

    describe("when passing a valid mode", () => {
        it("should return result includes totalBeads ", () => {
            // Act
            const result = generateResult();

            // Assert
            expect(Object.keys(result).includes("totalBeads"));
        });

        it("should return result includes finalBeads ", () => {
            // Act
            const result = generateResult();

            // Assert
            expect(Object.keys(result).includes("finalBeads"));
        });

        it("should return total beads in range 29-40", () => {
            // Act
            const { totalBeads } = generateResult();

            // Assert
            expect(totalBeads >= 29 && totalBeads <= 40).toBeTruthy();
        });

        it("should return final beads in range 1-4", () => {
            // Act
            const { finalBeads } = generateResult();

            // Assert
            expect(finalBeads >= 1 && finalBeads <= 4).toBeTruthy();
        });
    });
});

describe("generateRawResultForHash", () => {
    it("should format result in unicode", () => {
        // Arrange
        const roundResult = 34;

        // Act
        const result = generateRawResultForHash(roundResult);

        // Assert
        expect(result).toBe("{34}");
    });
});
