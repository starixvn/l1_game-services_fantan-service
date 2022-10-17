import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./init-user-session";
import gameSettings from "../../src/game-settings";

export const ingameTest = () => {
    describe("when user joins game", () => {
        const getTimeOutToPlacingBetTime = (remainingTime, durations) => {
            let timeout = 0;
            if (remainingTime <= durations.lockingBet) {
                timeout = durations.wholeRound - durations.placingBets + remainingTime + 4;
            } else if (remainingTime > durations.placingBets) {
                timeout = durations.wholeRound - durations.placingBets + 4;
            }

            return timeout;
        };

        const getTimeOutToSettleTime = (remainingTime, durations) => {
            let timeout = 0;
            if (remainingTime <= durations.placingBets) {
                timeout = remainingTime + 2;
            }

            return timeout;
        };

        it("should return game configs", (done) => {
            // Arrange
            const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

            // Act
            normalUserClientDriver.handleSignedInEvent(() => {
                normalUserClientDriver.sendInGameEvent();
            });

            // Assert
            normalUserClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.gameConfigs) {
                    expect(inGameData.gameConfigs.minBet).toEqual(1);
                    expect(inGameData.gameConfigs.maxBet).toEqual(2000);
                    expect(inGameData.gameConfigs.maxBetPerChoices).toStrictEqual({
                        even: 2000,
                        odd: 2000,
                        fan1: 1000,
                        fan2: 1000,
                        fan3: 1000,
                        fan4: 1000,
                        kwok12: 2000,
                        kwok23: 2000,
                        kwok34: 2000,
                        kwok41: 2000,
                        chun123: 2000,
                        chun124: 2000,
                        chun134: 2000,
                        chun234: 2000,
                    });
                    expect(inGameData.gameConfigs.odds).toStrictEqual({
                        even: 1.96,
                        odd: 1.96,
                        fan1: 3.85,
                        fan2: 3.85,
                        fan3: 3.85,
                        fan4: 3.85,
                        kwok12: 1.96,
                        kwok23: 1.96,
                        kwok34: 1.96,
                        kwok41: 1.96,
                        chun123: 1.32,
                        chun124: 1.32,
                        chun134: 1.32,
                        chun234: 1.32,
                    });

                    normalUserClientDriver.close();
                    done();
                }
            });
        });

        it("should return user info", (done) => {
            // Arrange
            const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

            // Act
            normalUserClientDriver.handleSignedInEvent(() => {
                normalUserClientDriver.sendInGameEvent();
            });

            // Assert
            normalUserClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.user?.UID) {
                    expect(inGameData.user).toStrictEqual({
                        UID: 1,
                        avatarId: 1,
                        currency: "$US",
                        name: "NormalUser",
                        rate: 1,
                        red: 25000,
                        type: false,
                    });

                    normalUserClientDriver.close();
                    done();
                }
            });
        });

        it("should return round history", (done) => {
            // Arrange
            const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

            // Act
            normalUserClientDriver.handleSignedInEvent(() => {
                normalUserClientDriver.sendInGameEvent();
            });

            // Assert
            normalUserClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.roundHistory) {
                    expect(inGameData.roundHistory.length).toBeGreaterThan(0);

                    normalUserClientDriver.close();
                    done();
                }
            });
        });

        describe("when join game in placing bet time", () => {
            it("should return resultHash with hashValue", (done) => {
                // Arrange
                const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

                // Act
                normalUserClientDriver.handleInGameEvent((inGameData) => {
                    if (inGameData.remainingTime) {
                        const timeout = getTimeOutToPlacingBetTime(inGameData.remainingTime, gameSettings.durations) * 1000;
                        setTimeout(() => {
                            normalUserClientDriver.sendInGameEvent();
                        }, timeout);
                    }
                });

                // Assert
                normalUserClientDriver.handleInGameEvent((inGameData) => {
                    if (inGameData.gameConfigs && inGameData.resultHash) {
                        expect(inGameData.resultHash.hashValue).not.toBeEmpty();

                        normalUserClientDriver.close();
                        done();
                    }
                });
            });
        });

        describe("when join game in settle time", () => {
            it("should return resultHash with rawValue", (done) => {
                // Arrange
                const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

                // Act
                normalUserClientDriver.handleInGameEvent((inGameData) => {
                    if (inGameData.remainingTime) {
                        const timeout = getTimeOutToSettleTime(inGameData.remainingTime, gameSettings.durations) * 1000;
                        setTimeout(() => {
                            normalUserClientDriver.sendInGameEvent();
                        }, timeout);
                    }
                });

                // Assert
                normalUserClientDriver.handleInGameEvent((inGameData) => {
                    if (inGameData.gameConfigs && inGameData.resultHash) {
                        expect(inGameData.resultHash.rawValue).not.toBeEmpty();

                        normalUserClientDriver.close();
                        done();
                    }
                });
            });
        });
    });
};
