import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./init-user-session";

export const boostedOddsTest = () => {
    describe("boosted odds", () => {
        it("should return boosted odds", (done) => {
            // Arrange
            const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));
            const expectedOdds = {
                chun123: 1.32,
                chun124: 1.32,
                chun134: 1.32,
                chun234: 1.32,
                even: 1.96,
                fan1: 3.85,
                fan2: 3.85,
                fan3: 3.85,
                fan4: 3.85,
                kwok12: 1.96,
                kwok23: 1.96,
                kwok34: 1.96,
                kwok41: 1.96,
                odd: 1.96,
            };

            // Act
            normalUserClientDriver.handleSignedInEvent(() => {
                normalUserClientDriver.sendInGameEvent();
            });

            // Assert
            normalUserClientDriver.on(socketOptions.gameName, (data) => {
                if (data.odds) {
                    expect(data.odds.values).toEqual(expectedOdds);
                    normalUserClientDriver.close();
                    done();
                }
            });
        });

        it("should return original odds", (done) => {
            // Arrange
            const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));
            const expectedOdds = {
                chun123: 1.32,
                chun124: 1.32,
                chun134: 1.32,
                chun234: 1.32,
                even: 1.96,
                fan1: 3.85,
                fan2: 3.85,
                fan3: 3.85,
                fan4: 3.85,
                kwok12: 1.96,
                kwok23: 1.96,
                kwok34: 1.96,
                kwok41: 1.96,
                odd: 1.96,
            };

            // Act
            normalUserClientDriver.handleSignedInEvent(() => {
                normalUserClientDriver.sendInGameEvent();
            });

            // Assert
            normalUserClientDriver.on(socketOptions.gameName, (data) => {
                if (data.odds) {
                    expect(data.odds.values).toEqual(expectedOdds);
                    normalUserClientDriver.close();
                    done();
                }
            });
        });
    });
};
