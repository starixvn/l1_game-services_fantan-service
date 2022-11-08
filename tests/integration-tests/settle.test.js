import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./init-user-session";
import gameSettings from "../../src/game-settings";

export const settleTest = () => {
    describe("when settle", () => {
        it("should return settled status data", async (done) => {
            // Arrange
            const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
            await client.handleSignedInEvent();
            client.sendInGameEvent();
            await client.handleGameEvent((data) => data.spb);

            setTimeout(async () => {
                client.emit(eventTypes.bet, { betChoice: "even", amount: 100 });

                // Act
                const data = await client.handleGameEvent((data) => data.status);

                // Assert
                expect(data.status.bet).toBeGreaterThan(0);
                client.close();
                done();
            }, 1000);
        });

        it("should return settled finish data and hashResult with rawValue", async () => {
            // Arrange
            const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
            await client.handleSignedInEvent();
            client.sendInGameEvent();

            // Act
            const data = await client.handleGameEvent((data) => data.finish && data.resultHash);

            // Assert
            expect(data.resultHash.rawValue).not.toBeEmpty();
            client.close();
        });

        it("should return resultHash at start placingBet time", async () => {
            // Arrange & Act
            const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
            await client.handleGameEvent((data) => data.snr);
            let startTime = new Date();

            // Act
            const data = await client.handleGameEvent((data) => data.resultHash);

            // Assert
            let endTime = new Date();
            expect(data.resultHash.hashValue).not.toBeEmpty();
            expect(Math.round((endTime - startTime) / 1000)).toEqual(
                gameSettings.durations.wholeRound - gameSettings.durations.placingBets - 1
            );

            client.close();
        });
    });
};
