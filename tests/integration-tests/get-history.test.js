import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./init-user-session";

export const getHistoryTest = () => {
    describe("when get history", () => {
        it("should return history", async () => {
            // Arrange
            const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
            const expectedData = [
                {
                    odd: 0,
                    even: 100,
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
                    betwin: 0,
                    freeBet: false,
                    phien: 1190119,
                    name: "NormalUser",
                    odds: {
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
                    },
                    rate: 1,
                    betLogDetails: [],
                    roundId: 1190119,
                    totalAmount: 0,
                },
                {
                    odd: 0,
                    even: 100,
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
                    betwin: 0,
                    freeBet: false,
                    phien: 1190119,
                    name: "NormalUser",
                    odds: {
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
                    },
                    rate: 1,
                    betLogDetails: [],
                    roundId: 1190119,
                    totalAmount: 0,
                },
            ];

            await client.handleSignedInEvent();
            client.sendInGameEvent();
            await client.handleGameEvent((data) => data.remainingTime);

            // Act
            client.sendGetHistoryEvent();
            const data = await client.handleGameEvent((data) => data.history);

            // Assert
            const actualBetLogs = data.history.betLogs.map((betLog) => {
                delete betLog.result;
                delete betLog.settlementResult;
                return betLog;
            });

            expect(actualBetLogs).toEqual(expectedData);
            expect(data.history.total).toBeGreaterThan(0);
            expect(data.history.page).toBe(1);
            expect(data.history.pageSize).toBe(8);

            client.close();
        });
    });
};
