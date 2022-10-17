import { generateResult, getSettlementResult, generateRawResultForHash } from "../../../src/helpers/result-helper";

describe("getSettlementResult tests", () => {
    describe("when result is 29", () => {
        it("should return winning choices [odd, fan1, kwok12, kwok41, chun123, chun124, chun134]", () => {
            // Arrange
            const roundResult = 29;
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

    describe("when result is 30", () => {
        it("should should return winning choices [even, fan2, kwok12, kwok23, chun123, chun124, chun234] ", () => {
            // Arrange
            const roundResult = 30;
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

    describe("when result is 31", () => {
        it("should should return winning choice [odd, fan3, kwok23, kwok34, chun123, chun134, chun234]", () => {
            // Arrange
            const roundResult = 31;
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

    describe("when result is 32", () => {
        it("should return even and red4", () => {
            // Arrange
            const roundResult = 32;
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
        it("should return result in range 29-40", () => {
            // Act
            const result = generateResult();

            // Assert
            expect(result >= 29 && result <= 40).toBeTruthy();
        });
    });

    describe("when passing a out of range mode", () => {
        it("should return enough results", () => {
            // Act
            const result = generateResult(10);

            // Assert
            expect(result >= 29 && result <= 40).toBeTruthy();
        });
    });

    describe("when passing a valid mode", () => {
        it("should return enough results", () => {
            // Act
            const result = generateResult(2);

            // Assert
            expect(result >= 29 && result <= 40).toBeTruthy();
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
